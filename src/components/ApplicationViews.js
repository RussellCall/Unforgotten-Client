import React from "react"
import { Route } from "react-router-dom"
import { MapDisplay } from "./map/MapDisplay"
import { MarkerDetails } from "./markers/MarkerDetails"
import { CommentList } from "./comments/CommentsList"
import { ImageList } from "./images/imageList"
import { CommentForm } from "./comments/CommentForm"
import { CurrentMarkerDetails } from "./markers/CurrentMarkerDetails"
import { ImageForm } from "./images/ImageForm"

export const ApplicationViews = () => {
    return <>
        <Route path="/">
            <MapDisplay />
        </Route>
        <Route path="/markers/:markerId(\d+)">
                <CurrentMarkerDetails />
        </Route>
        <Route path="/comments">
            <CommentList />
        </Route>
        <Route path="/images">
            <ImageList />
        </Route>
        <Route exact path="/markers/:markerId(\d+)/image">
                <ImageForm />
            </Route>
        <Route exact path="/markers/:markerId(\d+)/comment">
                <CommentForm />
        </Route>
    </>
}


