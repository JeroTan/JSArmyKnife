
/**
 * @description - Open a link in a new tab.
 */
export function openLink(link:string){
	window.open(link, '_blank');
}

/**
 * @description - same with openLink but return a function that sends a link. Usually use in html element.
 */
export function openLinkHigh(link:string){
	return ()=>openLink(link);
}