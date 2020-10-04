
import React, { useState, useEffect } from "react"

export const RandomPerson = (props) => {
    const [person, setPerson] = useState()
    useEffect(() => {
        fetch(`https://randomuser.me/api?results=${props.results}`)
            .then(x => x.json())
            .then(x => setPerson(x))
    }, [props.results])

    return (
        <div>
            <pre>{JSON.stringify(person, null, 2)}</pre>
        </div>
    )
}

