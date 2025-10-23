export function getCurrentLocation(): Promise<{
	error: false | GeolocationPositionError;
	data: GeolocationPosition | null;
}> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve({ error: false, data: position });
			},
			(error) => {
				resolve({ error: error, data: null });
			},
		);
	});
}
