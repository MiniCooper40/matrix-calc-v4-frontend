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

import ErrorMessage from "../Typography/ErrorMessage"

export default function Calculator() {

    const [type, setType] = useState('unary')
    const [operation, setOperation] = useState(undefined)
    const [answer, setAnswer] = useState(undefined)
    const [error, setError] = useState(undefined)

    function newBlankMatrix() {
        return {
            dim: {
                rows: 2,
                cols: 2
            },
            data: new Array(100).fill(''),
            name: "A Matrix"
        }
    }

    useEffect(
        () => {
            setAnswer(undefined)
            setError(undefined)
            setOperation(undefined)
        },
        [type]
    )

    useEffect(
        () => {
            setError(undefined)
        },
        [answer, operation]
    )

    const [matrix, setMatrix] = useState(newBlankMatrix())
    const [matrices, setMatrices] = useState({ A: newBlankMatrix(), B: newBlankMatrix() })

    const [copied, setCopied] = useState(undefined)

    // useEffect(() => setCopied(undefined), [])

    function parseMatrix(matrix) {
        let { rows, cols } = matrix.dim
        let parsed = new Array(rows).fill(0).map(entry => entry = new Array(cols).fill(0))
        let data = matrix.data
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let val = data[j * 10 + i]
                if (val === '') parsed[i][j] = '0'
                else parsed[i][j] = val
            }
        }
        return parsed
    }

    function formatAnswer({ rows, cols, data }) {

        let formated = new Array(100).fill('')

        console.log("recieved rows", rows)
        console.log("recieved cols", cols)

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                formated[j * 10 + i] = data[i][j]
            }
        }

        return {
            dim: {
                rows: rows,
                cols: cols
            },
            name: 'A Matrix',
            data: formated
        }
    }

    async function handleForm() {
        setAnswer(undefined)
        if (type === 'unary') {
            let matrixA = { ...matrix, data: parseMatrix(matrix) }
            console.log('matrix', matrixA)

            let result = UnaryCall(operation.url, matrixA)
            console.log('result', result)
            try {
                result.then((response) => {
                    console.log('reponse is ok? ', response.ok)
                    console.log('response status: ', response.status)
                    // console.log('response.json() ', response.json())
                    if (response.ok) response.json().then((m) => setAnswer(formatAnswer(m)))
                    else response.json().then((e) => setError(e))
                })
            } catch (error) {
                console.log('error', error)
            }
            // console.log('answer', answer)
            // console.log('error', error)

        }
        else {
            let matrixA = { ...matrices.A, data: parseMatrix(matrices.A) }
            let matrixB = { ...matrices.B, data: parseMatrix(matrices.B) }
            // console.log('A', matrixA)
            // console.log('B', matrixB)

            let result = BinaryCall(operation.url, matrixA, matrixB)
            result.then((response) => {
                // console.log('reponse is ok? ', response.ok)
                // console.log('response status: ', response.status)
                if (response.ok) response.json().then((m) => setAnswer(formatAnswer(m)))
                else response.json().then((e) => setError(e))
            })
            // console.log('answer', answer)
            // console.log('error', error)
        }
    }

    return (
        <ClipboardContext.Provider value={{ copied: copied, setCopied: (matrix) => setCopied(matrix) }}>
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
                {error && <ErrorMessage reason={error.reason} suggestion={error.suggestion} />}
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
            url: 'https://matrix-calc-v4-backend.herokuapp.com/api/rref'
        },
    ],

    binary: [
        {
            fullName: 'Addition',
            shortName: 'Add',
            id: 100,
            url: 'https://matrix-calc-v4-backend.herokuapp.com/api/addition'
        },
        {
            fullName: 'Subtraction',
            shortName: 'Sub',
            id: 101,
            url: 'https://matrix-calc-v4-backend.herokuapp.com/api/subtraction'
        },
        {
            fullName: 'Multiplication',
            shortName: 'Multiply',
            id: 102,
            url: 'https://matrix-calc-v4-backend.herokuapp.com/api/multiplication'
        },
    ]
}

export { OPERATIONS }