import useExtensionState from "@pages/hooks/useExtensionState";
import {useEffect} from "react";
import hotkeys from "hotkeys-js";
import ReactDOMServer from "react-dom/server"
import TextNode from "@pages/content/TextNode";
import axios from "axios";

const ContentScript = () => {
	const {color} = useExtensionState();

	console.log("ContentScript")
	console.log("color", color)

	function switchText() {
		// Gets the selection range
		// This is from Tim Down, linked below
		let range, sel = window.getSelection();
		if (sel.rangeCount && sel.getRangeAt) {
			range = sel.getRangeAt(0);
		}

		// Creates a new node range
		document.designMode = "on";
		if (range) {
			sel.removeAllRanges();
			sel.addRange(range);
		}

		// You can use either a variable or a string
		const someNewText = "-- You can make this whatever you want --";

		// This is from user YeppThatsMe, also linked below
		// document.execCommand("insertHTML", false, `<span id='${uuid}' style="background: blue">`+ document.getSelection()+"</span>");
		document.execCommand("insertHTML", false, ReactDOMServer.renderToStaticMarkup(<TextNode text={someNewText}></TextNode>));

		document.designMode = "off";
	};

	useEffect(() => {
		hotkeys('g', (e) => {
			e.preventDefault()

			axios('https://jsonplaceholder.typicode.com/todos/1')
				.then(resp => console.log(resp.data))

			switchText()
		});
	}, []);

	return (
		<div>
			AAASDFASDFASDFASDFASFDASDF
			<div>{color}</div>
		</div>
	)
}

export default ContentScript