import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getTags, removeTag } from "../comments/tags/TagManager.js"
import { getCurrentMarker, updateTag } from "./MarkerManager.js"
import { getMarkerComment } from "../comments/CommentsManager.js"
import { getMarkerImage } from "../images/imageManger.js"


export const CurrentMarkerDetails = () => {
    const [ marker, setDetails ] = useState({})
    const {markerId} = useParams()
    const [tags, setTags] = useState([])
    const {tagId} = useParams()
    const [comments, setComments] = useState([])
    const [images, setImages] = useState([])
    const {imageId} = useParams()
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

    useEffect(
        () => {
            getMarkerComment(markerId).then((comment)=> setComments(comment))
    }, [markerId])

    useEffect(
        () => {
            getMarkerImage(markerId).then((img)=> setImages(img))
    }, [markerId])

    return (
        <article className="details">
                <section key={`detail--${marker.id}`} className="detail">
                        
                        <button className="comment_button"
                        onClick={() => {
                            history.push({ pathname: `/markers/${marker.id}/comment`})
                        }}>Make Your Mark</button>
                        <button className="comment_button"
                        onClick={() => {
                            history.push({ pathname: `/markers/${marker.id}/image`})
                        }}>Upload Images</button>
                        <div className="marker_detail_year">Marker Erected On: {marker.year_erected}</div>
                        <div className="marker_name">{marker.marker_name}</div>
                        <div className="marker_text">Marker Text: {marker.marker_text}</div>
                        <div className="comments_body">
                        <div className="commentBody">{comments.map(
                                (comment) => {
                                    return <div>Comments: {comment.text}</div>
                                }
                            )}</div>
                        <div className="images"> Pictures:
                            {images.map(image => {
                                            return <div key={`image--${image.id}`} className="image">
                                                <img className="image_url" src={image.image} alt={image.image}/>
                                                <div className="image_link"><Link to={`/images/${image.id}`}>{image.image}</Link></div>
                                            </div>;
                                        })}
                        </div>
                        </div>
                        {marker.tags?.map((mt) => {
                            return <><div className="marker_tag">Tags: {mt.label}</div>
                            <button onClick={() => {
                                removeTag(mt.id)
                                history.push(`/markers/${marker.id}`)
                            } }>Clear Tags</button></>

                            
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
