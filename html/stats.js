
/***************************************************************************
 phpTrafficA @soft.ZoneO.net
 Copyright (C) 2004-2005 ZoneO-soft, S. Merkel (dude@zoneo.net)

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 More Info About The Licence At http://www.gnu.org/copyleft/gpl.html
****************************************************************************/

var END_OF_INPUT = -1;

var base64Chars = new Array(
	'A','B','C','D','E','F','G','H',
	'I','J','K','L','M','N','O','P',
	'Q','R','S','T','U','V','W','X',
	'Y','Z','a','b','c','d','e','f',
	'g','h','i','j','k','l','m','n',
	'o','p','q','r','s','t','u','v',
	'w','x','y','z','0','1','2','3',
	'4','5','6','7','8','9','+','/'
);

var base64Str;
var base64Count;

function setBase64Str(str){
	base64Str = str;
	base64Count = 0;
}

function readBase64(){    
	if (!base64Str) return END_OF_INPUT;
	if (base64Count >= base64Str.length) return END_OF_INPUT;
	var c = base64Str.charCodeAt(base64Count) & 0xff;
	base64Count++;
	return c;
}

function encodeBase64(str){
	setBase64Str(str);
	var result = '';
	var inBuffer = new Array(3);
	var lineCount = 0;
	var done = false;
	while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT){
		inBuffer[1] = readBase64();
		inBuffer[2] = readBase64();
		result += (base64Chars[ inBuffer[0] >> 2 ]);
		if (inBuffer[1] != END_OF_INPUT){
			result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
			if (inBuffer[2] != END_OF_INPUT){
				result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
				result += (base64Chars [inBuffer[2] & 0x3F]);
			} else {
				result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
				result += ('=');
				done = true;
			}
		} else {
			result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
			result += ('=');
			result += ('=');
			done = true;
		}
		lineCount += 4;
		if (lineCount >= 76){
			result += ('\n');
			lineCount = 0;
		}
	}
	return result;
}

function stats(sid) {
	var referer = encodeBase64(document.referrer);
	var thispage = encodeBase64(window.location.pathname+location.search); 
	var date = new Date()
	var time = date.getTime();
	document.writeln("<img src=\"http://www.yangonmetro.com/dpstraffic/count.php?sid="+sid+"&amp;p="+thispage+"&amp;r="+referer+"&amp;t="+time+"\" alt=\"\">\n");
}
