function toRad(value: number): number {
  return (value * Math.PI) / 180;
}

function calculateDistance(from: LatLng, to: LatLng): number {
	const R = 6371; // km


	const dLat = toRad(to.lat - from.lat);
	const dLon = toRad(to.lon - from.lon);


	const lat1 = toRad(from.lat);
	const lat2 = toRad(to.lat);


	const a =
	Math.sin(dLat / 2) ** 2 +
	Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);


	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

export function sortPlacesByDistance(
  places: Place[],
  userLocation: LatLng
): Place[] {
  return [...places].sort((a, b) => {
    const distanceA = calculateDistance(userLocation, {
      lat: a.lat,
      lon: a.lon,
    });
    const distanceB = calculateDistance(userLocation, {
      lat: b.lat,
      lon: b.lon,
    });

    return distanceA - distanceB;
  });
}


interface LatLng {
	lat: number;
	lon: number;
}