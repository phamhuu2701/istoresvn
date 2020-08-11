export function zoomSizeOfMap(distance) {
	let zoom;
	switch (distance/1000) {
		case 1:
			zoom = 15;
			break;
		case 2:
			zoom = 14;
			break;
		case 5:
			zoom = 13;
			break;
		case 10:
			zoom = 12;
			break;
		case 15:
			zoom = 11;
			break;
		case 20:
			zoom = 11;
			break;
		default:
			zoom = 10;
			break;
	}
	return zoom;
}