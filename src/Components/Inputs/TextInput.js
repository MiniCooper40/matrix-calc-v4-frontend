import "./TextInput.css"

export default function TextInput({name, onChange}) {

    function handleText(e) {
        e.preventDefault()
        onChange(e.target.value)
    }

    return (
        <input className="text-input" value={name} type={"text"} onChange={handleText} />
    )
}