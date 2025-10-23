export function geocodeCheckIfInside(geocode: { lat: number; lng: number }, polygon: { lat: number; lng: number }[]) {
	// 1. Initialize variables
	let isInside = false;
	let minX = polygon[0].lng,
		maxX = polygon[0].lng;
	let minY = polygon[0].lat,
		maxY = polygon[0].lat;

	// 2. Determine the bounding box of the polygon
	for (let i = 1; i < polygon.length; i++) {
		const vertex = polygon[i];
		minX = Math.min(vertex.lng, minX);
		maxX = Math.max(vertex.lng, maxX);
		minY = Math.min(vertex.lat, minY);
		maxY = Math.max(vertex.lat, maxY);
	}

	// 3. Check if the point is outside the bounding box
	if (geocode.lng < minX || geocode.lng > maxX || geocode.lat < minY || geocode.lat > maxY) {
		return false;
	}

	// 4. Ray-casting algorithm to check if the geocode is inside the polygon
	// Remember the Physics CROSS product? This is where it is used. SUBARASHIII!!!
	let j = polygon.length - 1;
	for (let i = 0; i < polygon.length; i++) {
		if (
			polygon[i].lat > geocode.lat !== polygon[j].lat > geocode.lat &&
			geocode.lng <
				((polygon[j].lng - polygon[i].lng) * (geocode.lat - polygon[i].lat)) / (polygon[j].lat - polygon[i].lat) +
					polygon[i].lng
		) {
			isInside = !isInside;
		}
		j = i;
	}

	// 5. Return the result
	return isInside;
}

export function convertBoundTo2DPolygon(bound: { west: number; north: number; east: number; south: number }) {
	return [
		{ lat: bound.north, lng: bound.west },
		{ lat: bound.north, lng: bound.east },
		{ lat: bound.south, lng: bound.east },
		{ lat: bound.south, lng: bound.west },
	];
}
