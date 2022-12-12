import { useState } from "react"
import "./Dropdown.css"
import { OPERATIONS } from "../Calculator/Calculator"
import DropdownItem from "./DropdownItem"
import { ReactComponent as Down } from "./down.svg"

export default function Dropdown({ operation, setOperation, type }) {

    const [isDown, setIsDown] = useState(false)

    //console.log('OPERATIONS', OPERATIONS)

    console.log('operation', operation)

    function toggleDown(e) {
        e.preventDefault()
        setIsDown((state) => !state)
    }

    function getOperations(opType) {
        if (!opType) return

        function getOnClick(op) {
            return (e) => {
                e.preventDefault()
                setOperation(op)
                setIsDown(false)
            }
        }

        console.log('opType is', opType)

        return OPERATIONS[opType].map((op) => {
            return <DropdownItem key={Math.random()} setOperation={getOnClick(op)} operation={op} />
        })
    }

    return (
        <div className="dropdown-holder">
            <button className="dropdown-button" onClick={toggleDown}>
                <h4 className="operation-text">
                    {operation ? operation.fullName : "Select Operation"}
                </h4>
                <div className="operation-toggle-holder">
                    {!isDown && <Down width="14" />}
                    {isDown && <Down width="14" style={{ transform: "scale(-1, -1)" }} />}
                </div>
            </button>
            <div className="dropdown-options">
                {(isDown && type) && getOperations(type)}
            </div>
        </div>
    )
}