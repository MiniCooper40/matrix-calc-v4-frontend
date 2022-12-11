import "./Calculator.css"
import ClipboardContext from "../../Context/ClipboardContext"

import Button from "../Buttons/Button"
import Single from "../Matrices/Single"
import Double from "../Matrices/Double"
import SavedPanel from "../Saved/SavedPanel"

import { useEffect, useState } from "react"

export default function Calculator() {

    const [type, setType] = useState('single')

    function newBlankMatrix() {
        return {
            dim: {
                rows:2,
                cols:2
            },
            data: new Array(100).fill(''),
            name: "A Matrix"
        }
    }

    const [matrix, setMatrix] = useState(newBlankMatrix())
    const [matrices, setMatrices] = useState({A: newBlankMatrix(), B: newBlankMatrix()})

    const [copied, setCopied] = useState(undefined)

    // useEffect(() => setCopied(undefined), [])

    function parseMatrix(matrix) {
        let {rows, cols} = matrix.dim
        let parsed = new Array(rows).fill(0).map(entry => entry = new Array(cols).fill(0))
        let data = matrix.data
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                let val = data[j*10 + i]
                if(val === '') parsed[i][j] = '0'
                else parsed[i][j] = val
            }
        }
        return parsed
    }

    function handleForm() {
        if (type === 'single') console.log('matrix', parseMatrix(matrix))
        else {
            console.log('A', parseMatrix(matrices.A))
            console.log('B', parseMatrix(matrices.B))
        }
    }

    return (
        <ClipboardContext.Provider value={{copied: copied, setCopied: (matrix) => setCopied(matrix)}}>
            <div className="calculator-holder">
                <SavedPanel />
                <div className="settings-holder">
                    <Button size="big" title="Single" onClick={() => setType('single')} />
                    <Button size="big" title="Double" onClick={() => setType('double')} />
                </div>
                {type === 'single' && <Single setMatrix={setMatrix} matrix={matrix} />}
                {type === 'double' && <Double setMatrices={setMatrices} matrices={matrices} />}
                <Button size="medium" title="Solve" onClick={handleForm} />
            </div>
        </ClipboardContext.Provider>
    )
}