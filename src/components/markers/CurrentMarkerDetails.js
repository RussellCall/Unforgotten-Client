import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getTags, removeTag } from "../comments/tags/TagManager.js"
import { getCurrentMarker, updateTag, userMarkerTag } from "./MarkerManager.js"
import { deleteComment, getMarkerComment } from "../comments/CommentsManager.js"
import { deleteImage, getMarkerImage } from "../images/imageManger.js"
import { Button, IconButton, Checkbox } from '@mui/material'
import { Delete } from "@mui/icons-material"


export const CurrentMarkerDetails = () => {
    const [ marker, setDetails ] = useState({})
    const [markerTags, setMarkerTags] = useState([])
    const {markerId} = useParams()
    const [tags, setTags] = useState([])
    const {tagId} = useParams()
    const [comments, setComments] = useState([])
    const [images, setImages] = useState([])
    const history = useHistory()

    const currentMarkerState = () => {
        getCurrentMarker(parseInt(markerId))
            .then(
                (data) => {
                    setDetails(data)
                }
            )
            
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

    useEffect(
        () => {
            userMarkerTag()
                .then((data) => {
                    setMarkerTags(data)  // ... makes a copy of state
                })
        }, [marker]
    )

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
                        
                        <Button className="comment_button" variant="outlined" color="success"
                        onClick={() => {
                            history.push({ pathname: `/markers/${marker.id}/comment`})
                        }}>Make Your Mark</Button>
                        <Button className="comment_button" variant="outlined" color="secondary"
                        onClick={() => {
                            history.push({ pathname: `/markers/${marker.id}/image`})
                        }}>Upload Images</Button>
                        <div className="marker_detail_year">Marker Erected On: {marker.year_erected}</div>
                        <div className="marker_name">{marker.marker_name}</div>
                        <div className="marker_text">Marker Text: {marker.marker_text}</div>
                        <div className="comments_body">
                        <div className="commentBody">{comments.map(
                                (comment) => {
                                    return <><div>Comments: {comment.text}</div>
                                                <IconButton className="comment_delete" aria-label="delete"> 
                                                <Delete onClick={() => {
                                                deleteComment(comment.id)
                                                history.push("/comments")
                                                }} /></IconButton></>
                                }
                            )}</div>
                        <div className="images"> Pictures:
                            {images.map(image => {
                                            return <div key={`image--${image.id}`} className="image">
                                                <img className="image_url" src={image.image} alt={image.image}/>
                                                <IconButton className="image_delete" aria-label="delete">
                                                <Delete
                                                onClick={() => {
                                                deleteImage(image.id)
                                                history.push("/images")
                                                }} /></IconButton>
                                                <div className="image_link"><Link to={`/images/${image.id}`}>{image.image}</Link></div>
                                            </div>;
                                        })}
                        </div>
                        </div>
                        {markerTags.map((mt) => {
                            return <><div className="marker_tag">Tags: {mt.tag?.label}</div>
                            <Button className="remove_tag_btn" variant="outlined" color="info"
                                onClick={() => {
                                removeTag(mt.tag?.id)
                                history.push(`/markers/${marker.id}`)
                                }}>Clear Tags</Button></>

                            
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
