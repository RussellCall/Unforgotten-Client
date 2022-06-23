import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getComments } from "../comments/CommentsManager.js"
import { getMarkers, getCurrentMarker } from "./MarkerManager.js"


export const MarkerDetails = () => {
    const [ markers, setDetails ] = useState([]) // markers-array of marker objects, setDetails-sets markers state.
    const [comments, setComments] = useState([]) // comments-array of comment objects, setComments-sets comments state.
    const {markerId} = useParams() // markerId-id of marker being viewed.
    

    const markerState = () => {  // calls getMarkers passing markerId as parameter.
        getMarkers() 
            .then(
                (data) => {
                    setDetails(data)
                }
            )
    }

    const currentMarkerState = () => { // calls getCurrentMarker passing markerId as parameter.
        getCurrentMarker(parseInt(markerId))
            .then(
                (data) => {
                    setDetails(data) // sets marker state to data returned from API.
                }
            )
    }   

    useEffect(() => { //
        markerState()
    }, []) // runs markerState when markerId state changes.


    useEffect(() => {
        currentMarkerState()
    }, []) // runs currentMarkerState when markerId state changes.

    useEffect(
        () => {
        getComments().then((comment)=> setComments(comment)) // calls getComments and sets comments state to data returned from API.
    }, [])  // runs getComments when markerId state changes.

    return (
        <article className="details">
            {markers.map((m) => { 
                return <section key={`detail--${m.id}`} className="detail"> 
                        
                        {m.tags.map((mt) => {
                            return <div className="marker_tag">Tags: {mt.label}</div>
                        })}
                        <div className="marker_detail_year">Marker Erected On: {m.year_erected}</div>
                        <div className="marker_name">{m.marker_name}</div>
                        <div className="marker_text">Marker Text: {m.marker_text}</div>
                        <div className="comments_body">
                        <div className="commentBody">{comments.map(
                                (comment) => {
                                    return <div>Comments: {comment.text}</div>
                                }
                            )}</div>
                        </div>
                    </section>
            })}
        </article>)
}