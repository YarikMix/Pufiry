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
		console.log("switchText")
		console.log(window.getSelection().toString())

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

		const data = [
			{
				"text": "Привет, ",
				"state": 0
			},
			{
				"text": "вы все говно. ",
				"state": 1
			},
			{
				"text": "Пушкин плохо писал стихи.",
				"state": 2
			}
		]


		console.log(window.getSelection().toString())

		// You can use either a variable or a string
		const someNewText = window.getSelection().toString();

		// This is from user YeppThatsMe, also linked below
		// document.execCommand("insertHTML", false, `<span id='${uuid}' style="background: blue">`+ document.getSelection()+"</span>");
		document.execCommand("insertHTML", false, ReactDOMServer.renderToStaticMarkup(
			data.map(node => <TextNode text={node.text} state={node.state} ></TextNode>)));

		document.designMode = "off";
	};

	useEffect(() => {
		hotkeys('g', (e) => {
			e.preventDefault()

			// axios('https://jsonplaceholder.typicode.com/todos/1')
			// 	.then(resp => console.log(resp.data))

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