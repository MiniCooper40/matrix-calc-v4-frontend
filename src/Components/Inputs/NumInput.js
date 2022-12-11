import "./NumInput.css"
import IconButton from "../Buttons/IconButton"
import {ReactComponent as Minus} from "./minus.svg"
import {ReactComponent as Plus} from "./plus.svg"

export default function NumInput({increment, decrement, value}) {

    return (
        <div className="num-input-holder">
            <IconButton onClick={decrement} icon={<Minus width="12" fill="var(--black)" />} />
            <h4>{value}</h4>
            <IconButton onClick={increment} icon={<Plus width="12" fill="var(--black)" />} />
        </div>
    )
}