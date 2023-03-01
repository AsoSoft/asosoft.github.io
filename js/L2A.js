// Kurdish Script Converter (Latin to Arabic) 
// Developed by Aso Mahmudi (aso.mehmudi@gmail.com)
const latinLetters = "a-zêîûçşéúıŕřĺɫƚḧẍḍṿʔ";
const LaDi2Ar = [
    "gh", "ẍ",
    "hh", "ḧ",
    "ll", "ɫ",
    "rr", "ř"
];
const La2Ar = [
    "\u201C", "«",
    "\u201D", "»",
    "([0-9])([\'’-])([aeiouêîûéú])", "$1$3",     // (e.g. 1990'an 5'ê)
    "ʔ", "",    // glottal stop
    `(^|[^${latinLetters}0-9\"’])([aeiouêîûéú])`, "$1ئ$2", //insert initial hamza
    "([aeouêîûéú])([aeiouêîûéú])", "$1ئ$2",     //insert hamza between adjacent vowels
    `(ئ)([uû])([^${latinLetters}0-9])`, "و$3",     //omit the inserted hamza for "û" (=and)
    "a", "ا",
    "b", "ب",
    "ç", "چ",
    "c", "ج",
    "d", "د",
    "ḍ", "د", // ڎ a Horami consonant
    "ê|é", "ێ",
    "e", "ە",
    "f", "ف",
    "g", "گ",
    "h", "ه",
    "ḧ", "ح",
    "i|ı", "",
    "î|y|í", "ی",
    "j", "ژ",
    "k", "ک",
    "l", "ل",
    "ɫ|ł|ƚ|Ɨ|ĺ", "ڵ",
    "m", "م",
    "n", "ن",
    "ŋ", "نگ",
    "o", "ۆ",
    "ö", "وێ",
    "p", "پ",
    "q", "ق",
    "r", "ر",
    "ř|ŕ", "ڕ",
    "s", "س",
    "ş|š|ș|s̩", "ش",
    "ṣ", "س", //ص
    "t", "ت",
    "ṭ", "ت", //ط
    "û|ú", "وو",
    "u|w", "و",
    "ü", "وو", //ۊ
    "v", "ڤ",
    "x", "خ",
    "ẍ", "غ",
    "z", "ز",
    "ه" + "($|[^ابپتجچحخدرڕزژسشصعغفڤقکگلڵمنوۆهەیێ])", "هـ" + "$1",  // word-final h
    "\'|’", "ئ", // need checking, not sure "ع" or "ئ"
    "\\u003F", "؟", //question mark
    ",", "،",  //comma
    ";", "؛"   //semicolon
];

// Transliterating the Latin script into Arabic script of Kurdish (e.g. çak→چاک)
function transilterateLa2Ar(text)
{
    text = replaceByArray(text.toLowerCase(), La2Ar);
    return text;
}

// Transliterating the Latin script with digraphs into Arabic script of Kurdish (e.g. chall→چاڵ)
function transilterateLaDigraph2Ar(text)
{
    text = text.toLowerCase();
    text = replaceByArray(text, LaDi2Ar);
    text = replaceByArray(text, La2Ar);
    return text;
}

function replaceByArray(text, array) {
	if (text) {
		for (let i = 0; i < array.length; i += 2)
			text = text.replace(new RegExp(array[i], 'gim'), array[i + 1]);
	}
	return text;
}