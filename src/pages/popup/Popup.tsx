import React, {useState} from 'react';

export default function Popup() {

    const [color, setColor] = useState()

    const onClick = async () => {
        let [tab] = await chrome.tabs.query({active: true})
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: () => {
                alert("asdfasdf")
                console.log("asdfasdfasd")
            }
        })
    }

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3">
            <input type="text" onChange={(e) => setColor(e.currentTarget.value)}/>
            <button onClick={onClick} type="submit">Сохранить</button>
        </div>
    );
}
