import "./Matrix.css"
import React, { useRef } from "react"
import NumInput from "../Inputs/NumInput"
import Clipboard from "./Clipboard"
import ClipboardContext from "../../Context/ClipboardContext"

// import {ReactComponent as Trash} from "./trash.svg"


export default function Matrix({ matrix, setMatrix, id }) {
    const MAX_ROWS = 10
    const MAX_COLS = 10

    const { copied, setCopied } = React.useContext(ClipboardContext)

    const { dim, data } = matrix
    const ref = useRef()

    console.log('copied', copied)

    const matrixStyle = {
        gridTemplateRows: `repeat(${dim.rows}, minmax(20px, 1fr))`,
        gridTemplateColumns: `repeat(${dim.cols}, minmax(20px, 1fr))`,
        width: `${Math.min(500, dim.cols / MAX_COLS * 900)}px`,
        height: `${Math.min(500, dim.rows / MAX_ROWS * 900)}px`
    }

    const updateCell = (e, row, col) => {
        e.preventDefault()
        console.log('e in updateCell', e)

        let val = e.target.value

        setMatrix((state) => {
            console.log('last state: ', state)
            let updated = { ...state }
            if (id) updated[id].data[col * MAX_ROWS + row] = val
            else updated.data[col * MAX_ROWS + row] = val
            return updated
        })
    }

    const updateDim = ({ type, inc }) => {
        setMatrix((state) => {
            let updated = { ...state }
            if (!id) {
                updated.dim[type] += inc
                if (updated.dim.rows < 1 || updated.dim.rows > MAX_ROWS || updated.dim.cols < 1 || updated.dim.cols > MAX_COLS) return state
            } else {
                updated[id].dim[type] += inc
                if (updated[id].dim.rows < 1 || updated[id].dim.rows > MAX_ROWS || updated[id].dim.cols < 1 || updated[id].dim.cols > MAX_COLS) return state
            }
            return updated
        })
    }

    const generateInputs = () => {
        let inputs = []
        for (let i = 0; i < dim.rows; i++) {
            for (let j = 0; j < dim.cols; j++) {
                let input = <input className="cell" onChange={e => updateCell(e, i, j)} value={data[j * MAX_ROWS + i]} key={`${i} ${j}`} placeholder={`${i}, ${j}`} />
                inputs.push(input)
            }
        }
        return inputs
    }

    const copy = (e) => {
        e.preventDefault()
        setCopied(JSON.parse(JSON.stringify(matrix)))
    }

    const paste = (e) => {
        e.preventDefault()
        if (copied === undefined) return
        let toPaste = JSON.parse(JSON.stringify(copied))
        setMatrix((state) => {
            let result = { ...state }
            if (id) result[id] = toPaste
            else result = toPaste
            return result
        })
    }

    function reset(e) {
        e.preventDefault()
        setMatrix((state) => {
            let result = {...state}
            let resetMatrix = {
                dim: {
                    rows:2,
                    cols:2
                },
                data: new Array(100).fill('')
            }
            if(id) {
                result[id] = resetMatrix
            }
            else result = resetMatrix
            return result
        })
    }

    return (
        <div className="matrix-holder">
            <div className="dim-holder">
                <NumInput value={dim.rows} increment={() => updateDim({ type: 'rows', inc: 1 })} decrement={() => updateDim({ type: 'rows', inc: -1 })} />
                <NumInput value={dim.cols} increment={() => updateDim({ type: 'cols', inc: 1 })} decrement={() => updateDim({ type: 'cols', inc: -1 })} />
            </div>
            <form ref={ref} id="matrix-form" >
                <div className="matrix" style={matrixStyle}>
                    {generateInputs()}
                    <Clipboard onPaste={paste} onCopy={copy} onReset={reset} />
                </div>
            </form>
        </div>
    )
}