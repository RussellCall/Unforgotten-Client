import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getTags } from "../comments/tags/TagManager.js"
import { getCurrentMarker, updateTag } from "./MarkerManager.js"

export const CurrentMarkerDetails = () => {
    const [ marker, setDetails ] = useState({})
    const {markerId} = useParams()
    const [tags, setTags] = useState([])
    const {tagId} = useParams()
    const history = useHistory()

    const currentMarkerState = () => {
        getCurrentMarker(parseInt(markerId))
            .then(
                (data) => {
                    setDetails(data)
                }
            )
    }

    const editMarkerState = (event) => {
        const EditedMarker = Object.assign({}, marker)
        EditedMarker[event.target.name] = event.target.value
        setDetails(EditedMarker)
    }

    const tagState = () => {
        getTags(parseInt(tagId))
            .then(
                (data) => {
                    setTags(data)
                }
            )
    }

    useEffect(() => {
        tagState()
    }, [])


    useEffect(() => {
        currentMarkerState()
    }, [markerId])

    return (
        <article className="details">
                <section key={`detail--${marker.id}`} className="detail">
                        

                        <div className="marker_detail_year">Marker Erected On: {marker.year_erected}</div>
                        <div className="marker_name">{marker.marker_name}</div>
                        <div className="marker_text">Marker Text: {marker.marker_text}</div>
                        {marker.tags?.map((mt) => {
                            return <div className="marker_tag">Tags: {mt.label}</div>
                        })}
                        {tags.map((t, index) => {
                            return <div className="marker_tag">
                            <li key={index}>
                            <div className="tag_options"> Tag Option:
                                <input
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                label={t.label}
                                value={t.id}
                                onChange={event => {
                                    event.preventDefault()

                                    const updateMarkerTag = {
                                        tag: parseInt(t.id)
                                    }
                                    updateTag(parseInt(markerId), updateMarkerTag)
                                        .then(() => history.push(`/markers/${markerId}`))
                                }}
                                />
                                <label htmlFor={`custom-checkbox-${index}`}>{t.label}</label>
                            </div>
                        </li>
                            </div>

                        })}

                    </section>
        </article>)
}
