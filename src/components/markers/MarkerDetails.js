import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getComments } from "../comments/CommentsManager.js"
import { getMarkers, getCurrentMarker } from "./MarkerManager.js"


export const MarkerDetails = () => {
    const [ markers, setDetails ] = useState([])
    const [comments, setComments] = useState([])
    const {markerId} = useParams()
    const {commentId} = useParams()
    const history = useHistory()
    

    const markerState = () => {
        getMarkers()
            .then(
                (data) => {
                    setDetails(data)
                }
            )
    }

    const currentMarkerState = () => {
        getCurrentMarker(parseInt(markerId))
            .then(
                (data) => {
                    setDetails(data)
                }
            )
    }

    useEffect(() => {
        markerState()
    }, [])


    useEffect(() => {
        currentMarkerState()
    }, [])

    useEffect(
        () => {
        getComments().then((comment)=> setComments(comment))
    }, [])

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