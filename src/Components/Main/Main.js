import "./Main.css"
import {ReactComponent as MatrixIcon} from "./matrix.svg"
import Header from "../Typography/Header/Header"
import Calculator from "../Calculator/Calculator"

export default function Main() {

    return (
        <div className="main-holder">
            <Header text="Matrix Buddy" logo={<MatrixIcon width="60"/>} tagline="Simple linear algebra calculator." />
            <Calculator />
        </div>
    )
}