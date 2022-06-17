import React from "react"
import { Route } from "react-router-dom"
import { MapDisplay } from "./map/MapDisplay"
import { MarkerDetails } from "./markers/MarkerDetails"
import { CommentList } from "./comments/CommentsList"
import { ImageList } from "./images/imageList"

export const ApplicationViews = () => {
    return <>
        <Route path="/">
            <MapDisplay />
        </Route>
        <Route path="/markers">
                <MarkerDetails />
        </Route>
        <Route path="/comments">
            <CommentList />
        </Route>
        <Route path="/images">
            <ImageList />
        </Route>
    </>
}


