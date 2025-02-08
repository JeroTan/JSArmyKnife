import { ceil } from "../math/basic";

export function binarySearchIndex<T>(list:T[], callback:(MiddleElement:T, FirstElement:T, LastElement:T)=>-1|0|1|number, indexPoint = 0): (number|-1){//For the callback you must use x <= y where x is the thing you need to search and y is reference
	const halfPoint = ceil(list.length/2)-1;
	const direction = callback( list[halfPoint], list[0], list[list.length-1] );//Returns -1 means direction; 0 means found; 1 means goRight;
	if(direction === 0)
		return indexPoint+halfPoint;
	else if(direction !==0 && list.length <= 1)
		return -1;

	if(direction < 0)
		return binarySearchIndex( list.slice(0, (halfPoint+1)), callback, indexPoint+0);
	else
		return binarySearchIndex( list.slice((halfPoint+1)), callback, indexPoint+(halfPoint+1));
};