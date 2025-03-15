import React, {useEffect, useState} from 'react';
import useExtensionState from "@pages/hooks/useExtensionState";
import {updateState} from "@pages/state/extensionState";

export default function Popup() {

    const extensionState = useExtensionState();

    const [color, setColor] = useState(extensionState.color)

    const updateColor = async () => {
        updateState({
            color,
        })

        let [tab] = await chrome.tabs.query({active: true})
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            args: [color],
            func: (color) => {
                console.log(`Новый цвет: ${color}`)
            }
        })
    }

    useEffect(() => {
        setColor(extensionState.color)
    }, [extensionState.color]);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3">
            <input type="text" value={color} onChange={(e) => setColor(e.currentTarget.value)}/>
            <button onClick={updateColor}>Сохранить</button>
            <span>Текущий цвет: {extensionState.color}</span>
        </div>
    );
}
