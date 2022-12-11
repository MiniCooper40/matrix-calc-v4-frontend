import "./Matrix.css"
import Matrix from "./Matrix"

export default function Double({matrices, setMatrices}) {

    return (
        <div className="double-holder">
            <Matrix id="A" matrix={matrices['A']} setMatrix={setMatrices} />
            <Matrix id="B" matrix={matrices['B']} setMatrix={setMatrices} />
        </div>
    )
}