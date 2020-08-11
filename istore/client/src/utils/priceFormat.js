export default function priceFormatUtil(price) {
	return (price/1000).toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.')
}