import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getMarkers } from "./MarkerManager.js"

export const MarkerDetails = () => {
    const [ markers, setDetails ] = useState([])
    const history = useHistory()
    

    const markerState = () => {
        getMarkers()
            .then(
                (data) => {
                    setDetails(data)
                }
            )
    }

    useEffect(() => {
        markerState()
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
                    </section>
            })}
        </article>)
}