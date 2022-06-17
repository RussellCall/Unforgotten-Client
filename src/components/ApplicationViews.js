import React from "react"
import { Route } from "react-router-dom"
import { MapDisplay } from "./map/MapDisplay"

export const ApplicationViews = () => {
    return <>
        <main>
            <MapDisplay />
        </main>
    </>
}


