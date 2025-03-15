const TextNode = ({text, state}) => {

	const getColor = () => {
		if (state == 1) {
			return "text-red-700"
		} else if (state == 2) {
			return "text-blue-700"
		}
	}

	return (
		<span className={getColor()}>{text}</span>
	)
}

export default TextNode