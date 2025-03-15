import useExtensionState from "@pages/hooks/useExtensionState";
import {useEffect} from "react";
import ReactDOMServer from "react-dom/server"
import TextNode from "@pages/content/TextNode";
import {Mode} from "@pages/state/extensionState";
import hotkeys from "hotkeys-js";
import axios from "axios";


const ContentScript = () => {
	const {mode} = useExtensionState();

	console.log("ContentScript")
	console.log("mode", mode)

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
	}

	const test = async (message) => {
		console.log("message", message)
		const response = await axios.post('http://127.0.0.1:8080/api/v1/analyze_text', {
			"text": message
		})
		console.log(response.data)
	}

	useEffect(() => {
		if (mode == Mode.fullPage) {
			console.log("ASDFSDAFASDSAADFSFDSFSSFAD")
			hotkeys.unbind('g');
		} else {
			hotkeys('g', (e) => {
				e.preventDefault()

				test(window.getSelection().toString())
			});
		}
	}, [mode]);

	return (
		<div>
			AAASDFASDFASDFASDFASFDASDF
			<div>{mode === Mode.fullPage ? "Меняем текст на всей странице" : "Меняем текст по хоткею"}</div>
		</div>
	)
}

export default ContentScript