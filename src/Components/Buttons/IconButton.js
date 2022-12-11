import "./Button.css"

export default function IconButton({icon, onClick}) {
    return (
        <button onClick={onClick} className="icon-button">
            {icon}
        </button>
    )
}