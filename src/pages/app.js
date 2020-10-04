
import React from "react"
import { RandomPerson } from "../modules/RandomPerson"
import { Router } from "@reach/router"

const App = () => {
    return (
        <Router>
            <RandomPerson path="/app/random-person/:results" />
        </Router>
    )
}

export default App