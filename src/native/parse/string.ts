/**
 * @description Remove any non-alphabet character
 */
export function onlyAlpha(text: string):string{
	return text.replace(/[^a-zA-Z]+/g, "");
}

/**
 * @description Remove Space from string
 */
export function removeSpace(text: string):string{
	return text.replace(/ */g, "");
}

/**
 * @description Capital The First Letter of the string
 */
export function capitalFirst(text: string){
	return  text.length ? (text[0].toUpperCase() + (text.length > 1 ? text.slice(1): "") ) : "";
}

/**
 * @description Capital The First Letter of the string but the rest will be lowercase
 */
export function capitalFirstOnly(text:string){
	return capitalFirst(text.toLowerCase());
}

/**
 * 
 * @param text - The string you want to capitalize the first letter of each word
 * @description Capitalize each word in the string but the prepositions will be lowercase. This can be used for title case.
 * @example capitalEachWord("the quick brown fox jumps over the lazy dog") => "The Quick Brown Fox Jumps Over the Lazy Dog"
 * 
 * @returns 
 */
export function capitalEachWord(text:string){
	// List of Prepositions
	const prepositions = ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "by", "with"];
	// Articles
	const articles = ["a", "an", "the"];

	return text.split(" ").map((word, i) =>{
		if (prepositions.includes(word.toLowerCase())) {
			return word.toLowerCase();
		} else if(word.toLocaleLowerCase() === "i"){
			return word.toUpperCase();
		} else if(articles.includes(word.toLowerCase())){
			if(i === 0){
				return word.toUpperCase();
			}
			return word.toLowerCase();
		} else {
			return capitalFirst(word);
		}
	}).join(" ");
}

/**
 * @description remove the underscore from the string or replace it with space
 * @param text
 * @param swapToSpace If you want to replace the underscore with space
 */
export function noUnderscore(text:string, swapToSpace = false){
	if(swapToSpace)
		return text.replace(/_/g, " ");
	return text.replace(/_/g, "");
}

/**
 * @description convert a string into a fixed number randomly to shorten the string. Good for hashing or mapping something.
 * @param string 
 * @returns 
 */
export function stron(string:string) {
	if (string.length == 0) return 0;

	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash;
	}
	return hash;
}

/**
 * @description add ellipsis to the string if it's too long or based on your preferred limit
 * @param string
 * @param limit If you want to have a specific limit
 */
export function stringTrail(string:string, limit=20){
	return string.length > limit ? string.substring(0,limit)+"..." : string
}

/**
 * @description convert a string into list of asterisk
 * @param string - the string you want to convert
 */
export function toAsterisk(string:string){
	return "*".repeat(string.length);
}