/*jshint node:true*/
"use strict";

require("unorm");

// Function to display Unicode codepoints of a string.
function codepoints(string) {
	return string.split("").map(function(chr) {
		var codepoint = chr.charCodeAt(0);
		return (codepoint >= 33 && codepoint <= 126) ?
			JSON.stringify(chr) :
			"U+" + codepoint.toString(16).toUpperCase();
	}).join(" ");
}

// Scientific Ångström symbol is converted to Scandinavian letter Å.
var angstrom = "\u212B";
console.log("- Example 1 -");
console.log(codepoints(angstrom));
console.log(codepoints(angstrom.normalize("NFC")));

// German ä and ü decomposed into a and u with Combining Diaeresis character.
var letters = "\u00E4\u00FC";
console.log("- Example 2 -");
console.log(codepoints(letters));
console.log(codepoints(letters.normalize("NFD")));

// String optimized for compatibility, ie. CO₂ becomes CO2.
var scientific = "CO\u2082 and E=mc\u00B2";
console.log("- Example 3 -");
console.log(scientific);
console.log(scientific.normalize("NFKC"));

// NOTE: Rest of the example requires XRegExp: npm install xregexp

// Remove combining characters / marks from Swedish name, ie. ö becomes o.
// This is useful for indexing and searching internationalized text.
try {
	var xregexp = require("xregexp").XRegExp;
	var name = "\u00C5ngstr\u00F6m";
	console.log("- Example 4 -");
	console.log(name.normalize("NFKD"));
	console.log(name.normalize("NFKD").replace(xregexp("\\p{M}", "g"), ""));
} catch (ex) {}
