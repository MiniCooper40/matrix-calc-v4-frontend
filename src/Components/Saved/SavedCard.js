import "./SavedCard.css"
import React from "react"

import TextInput from "../Inputs/TextInput"
import Clipboard from "../Matrices/Clipboard"
import ClipboardContext from "../../Context/ClipboardContext"

export default function SavedCard({matrix, setMatrix, remove, id}) {

    const { setCopied } = React.useContext(ClipboardContext)


    function updateName(name) {
        setMatrix((state) => {
            let result = [...state]
            result[id].name = name
            localStorage.setItem('matrices', JSON.stringify(result))
            return result
        })
    }

    function onCopy() {
        setCopied(JSON.parse(JSON.stringify(matrix)))
    }

    return (
        <div className="saved-card-holder">
            <div className="saved-details-holder">
                <TextInput onChange={updateName} name={matrix ? matrix.name: undefined}  />
                {matrix && <h4>{`${matrix.dim.rows} x ${matrix.dim.cols}`}</h4>}
            </div>
            <div className="saved-usage-holder">
                <Clipboard vertical={false} absolute={false} onCopy={onCopy} onDelete={() => remove(id)} />
            </div>
        </div>
    )
}