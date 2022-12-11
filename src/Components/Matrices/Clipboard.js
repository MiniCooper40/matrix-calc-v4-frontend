import "./Clipboard.css"
import {ReactComponent as Copy} from "./copy.svg"
import {ReactComponent as Paste} from "./paste.svg"
import {ReactComponent as Reset} from "./reset.svg"
import {ReactComponent as Trash} from "./trash.svg"

import IconButton from "../Buttons/IconButton"

export default function Clipboard({onPaste, onCopy, onReset, onDelete, absolute=true, vertical=true}) {

    function getStyle() {
        return `clipboard-holder ${absolute ? 'absolute' : ''} ${vertical ? 'vertical' : 'horizontal'}`
    }

    return (
        <div className={getStyle()}>
            {onCopy && <IconButton onClick={onCopy} icon={<Copy width="20px" />} />}
            {onPaste && <IconButton onClick={onPaste} icon={<Paste width="20px" height="20px" />} />}
            {onReset && <IconButton onClick={onReset} icon={<Reset width="20px" height="20px" />} />}
            {onDelete && <IconButton onClick={onDelete} icon={<Trash width="20px" height="20px" />} />}
        </div>
    )
}