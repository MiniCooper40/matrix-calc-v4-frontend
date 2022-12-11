import "./Matrix.css"
import Matrix from "./Matrix"
import React from "react"

export default function Single({setMatrix, matrix}) {

    return (
        <Matrix setMatrix={setMatrix} matrix={matrix} />
    )
}