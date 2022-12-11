import "./Header.css"

export default function Header({text, logo, tagline}) {
    return (
        <div className="header-holder">
            <div className="title-holder">
                <h1>{text}</h1>
                {logo}
            </div>
            <h3>{tagline}</h3>
        </div>
    )
}