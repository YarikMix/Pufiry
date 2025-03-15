import useExtensionState from "@pages/hooks/useExtensionState";
import {useEffect} from "react";

const ContentScript = () => {
	const {color} = useExtensionState();

	console.log("ContentScript")
	console.log("color", color)

	useEffect(() => {
		document.body.style.background = color
	}, [color]);

	return (
		<div>
			AAASDFASDFASDFASDFASFDASDF
			<div>{color}</div>
		</div>
	)
}

export default ContentScript