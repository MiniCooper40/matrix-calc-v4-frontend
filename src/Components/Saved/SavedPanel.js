import "./Saved.css"

import React from "react"
import ClipboardContext from "../../Context/ClipboardContext"
import { useState, useEffect } from "react"
import SavedCard from "./SavedCard"
import NewCard from "./NewCard"

export default function SavedPanel() {

    const [isIn, setIsIn] = useState(false)
    const [storage, setStorage] = useState(localStorage.getItem('matrices') ? JSON.parse(localStorage.getItem('matrices')) : undefined)
    const { copied } = React.useContext(ClipboardContext)

    const MAX_CARDS = 8

    //useEffect(() => localStorage.clear(), [])

    console.log('isIn', isIn)

    function getPanelClasses() {
        return `saved-panel ${isIn ? 'saved-in' : ''}`
    }

    function toggleIn() {
        console.log('clicked')
        setIsIn(!isIn)
    }

    function numCards() {
        if(storage) return storage.length
        return 0
    }

    function deleteMatrix(id) {
        setStorage((state) => {
            let result = [...state]
            result.splice(id, 1)
            localStorage.setItem('matrices', JSON.stringify(result))
            return result
        })
    }

    function getCards() {
        if(!storage || storage === null) {
            return []
        }
        console.log('storage', storage)
        return storage.map((saved, index) => {
            return <SavedCard key={index} setMatrix={setStorage} remove={deleteMatrix} id={index} matrix={saved} />
        })
    }

    function saveMatrix() {  //Need to access matrix from context
        if(!copied) return
        setStorage((state) => {
            let result = !state ? [] : [...state]
            let newMatrix = JSON.parse(JSON.stringify(copied))
            newMatrix.name = "Matrix"
            result.push(newMatrix)
            localStorage.setItem('matrices', JSON.stringify(result))
            return result
        })
    }

    return (
        <div className={getPanelClasses()}>
            <button className="toggle-button" onClick={toggleIn}>
                {isIn ? '<' : '>'}
            </button>
            <div className="saved">
                {getCards()}
                {numCards() < MAX_CARDS && <NewCard onSave={saveMatrix} />}
            </div>
        </div>
    )
}