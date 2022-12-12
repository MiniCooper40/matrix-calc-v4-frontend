import "./Dropdown.css"

export default function DropdownItem({operation, setOperation}) {

    return (
        <button onClick={setOperation} className="dropdown-item">
            {operation.fullName}
        </button>
    )
}