import "./ErrorMessage.css"

export default function ErrorMessage({reason, suggestion}) {

    return (
        <div className="error-holder">
            <div className="error-reason">
                {reason}
            </div>
            <div className="error-suggestion">
                {suggestion}
            </div>
        </div>
    )
}