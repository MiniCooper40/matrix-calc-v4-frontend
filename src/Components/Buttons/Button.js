import "./Button.css"

export default function Button({title, size, onClick}) {

    return (
        <button className={`button ${size}`} onClick={onClick}>{title}</button>
    )
}