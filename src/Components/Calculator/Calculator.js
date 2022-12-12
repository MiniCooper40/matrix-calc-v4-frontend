import "./Calculator.css"
import ClipboardContext from "../../Context/ClipboardContext"

import Button from "../Buttons/Button"
import Single from "../Matrices/Single"
import Double from "../Matrices/Double"
import SavedPanel from "../Saved/SavedPanel"

import { useState, useEffect } from "react"
import Dropdown from "../Dropdown/Dropdown"

import BinaryCall from "../../API/BinaryCall"
import UnaryCall from "../../API/UnaryCall"

export default function Calculator() {

    const [type, setType] = useState('unary')
    const [operation, setOperation] = useState(undefined)
    const [answer, setAnswer] = useState(undefined)

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

    useEffect(
        () => {
            setOperation(undefined)
            setAnswer(undefined)
        },
        [type]
    )

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

    function formatAnswer({numRows, numCols, data}) {

        let formated = new Array(100).fill('')

        for(let i = 0; i < numRows; i++) {
            for(let j = 0; j < numCols; j++) {
                formated[j*10 + i] = data[i][j]
            }
        }

        return {
            dim: {
                rows: numRows,
                cols: numCols
            },
            name: 'A Matrix',
            data: formated
        }
    }

    async function handleForm() {
        if (type === 'unary') {
            let matrixA = {...matrix, data: parseMatrix(matrix)}
            console.log('matrix', matrixA)
            try {
                let result = UnaryCall(operation.url, matrixA)
                console.log('result', result)
                result.then(data => setAnswer(formatAnswer(data)))
                console.log('answer', answer)
            } catch (error) {
                console.log('error', error)
            }
        }
        else {
            let matrixA = {...matrices.A, data: parseMatrix(matrices.A)}
            let matrixB = {...matrices.B, data: parseMatrix(matrices.B)}
            console.log('A', matrixA)
            console.log('B', matrixB)
            try {
                let result = BinaryCall(operation.url, matrixA, matrixB)
                console.log('result', result)
                result.then(data => setAnswer(formatAnswer(data)))
                console.log('answer', answer)
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    return (
        <ClipboardContext.Provider value={{copied: copied, setCopied: (matrix) => setCopied(matrix)}}>
            <div className="calculator-holder">
                <Dropdown setOperation={setOperation} operation={operation} type={type} />
                <SavedPanel />
                <div className="settings-holder">
                    <Button size="big" title="Single" onClick={() => setType('unary')} />
                    <Button size="big" title="Double" onClick={() => setType('binary')} />
                </div>
                {type === 'unary' && <Single setMatrix={setMatrix} matrix={matrix} />}
                {type === 'binary' && <Double setMatrices={setMatrices} matrices={matrices} />}
                {operation && <Button size="medium" title="Solve" onClick={handleForm} />}
                {answer && <Single matrix={answer} setMatrix={undefined} />}
            </div>
        </ClipboardContext.Provider>
    )
}

const OPERATIONS = {
    unary: [
        {
            fullName: 'Reduced Row Echelon',
            shortName: "RREF",
            id: 0,
            url: 'http://localhost:8080/api/rref'
        },
    ],

    binary: [
        {
            fullName: 'Addition',
            shortName: 'Add',
            id: 100,
            url: 'http://localhost:8080/api/addition'
        },
        {
            fullName: 'Subtraction',
            shortName: 'Sub',
            id: 101,
            url: 'http://localhost:8080/api/subtraction'
        },
        {
            fullName: 'Multiplication',
            shortName: 'Multiply',
            id: 102,
            url: 'http://localhost:8080/api/multiplication'
        },
    ]
}

export {OPERATIONS}