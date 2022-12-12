import "./NewCard.css"
import {ReactComponent as Plus} from "../Inputs/plus.svg"

export default function NewCard({onSave}) {

    return (
        <div className="new-card-holder">
            <button onClick={onSave} className="new-card-button">
                <Plus width="20" />
            </button>
        </div>
    )
}