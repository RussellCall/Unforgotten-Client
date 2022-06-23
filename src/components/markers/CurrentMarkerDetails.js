import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { getTags, removeTag } from "../comments/tags/TagManager.js"
import { getCurrentMarker, updateTag, userMarkerTag } from "./MarkerManager.js"
import { deleteComment, getMarkerComment } from "../comments/CommentsManager.js"
import { deleteImage, getMarkerImage } from "../images/imageManger.js"
import { Button, IconButton, Checkbox } from '@mui/material'
import { Delete } from "@mui/icons-material"
import Stack from '@mui/material/Stack';


export const CurrentMarkerDetails = () => {
    const [ marker, setDetails ] = useState({}) // marker is the marker object
    const [markerTags, setMarkerTags] = useState([]) 
    const {markerId} = useParams()
    const [tags, setTags] = useState([]) // tags is the array of tag objects
    const {tagId} = useParams() 
    const [comments, setComments] = useState([]) // comments is the array of comments
    const [images, setImages] = useState([])
    const history = useHistory()
    const [toggle, setToggle] = useState(false) // boolean to toggle the comment form
    const [tagToggle, setTagToggle] = useState(false) // boolean to toggle the tag form
    const [commentToggle, setCommentToggle] = useState(false)


    const currentMarkerState = () => {
        getCurrentMarker(parseInt(markerId)) // calls getCurrentMarker passing in markerId as parameter.
            .then(
                (data) => {
                    setDetails(data) // sets marker state to data returned from API.
                }
            )
            
    }

    const tagState = () => {
        getTags(parseInt(tagId)) // calls getTags passing tagId as parameter.
            .then(
                (data) => { // sets tags state to data returned from API.
                    setTags(data)
                }
            )
    }

    useEffect(() => { // calls the currentMarkerState when the component is mounted.
        tagState() // calls the tagState function.
    }, [toggle]) // runs the tagState when the toggle state changes.

    useEffect(
        () => {
            userMarkerTag()
                .then((data) => { // sets the markerTags state to the data returned from API.
                    setMarkerTags(data)  // sets markerTags state to data returned from API.
                })
        }, [marker, tagToggle] // runs userMarkerTag when tagToggle state changes.
    )

    useEffect(() => { // calls currentMarkerState when the component is mounted.
        currentMarkerState()
    }, [markerId]) // runs currentMarkerState when markerId state changes.

    useEffect(
        () => { 
            getMarkerComment(markerId) // calls getMarkerComment passing in markerId as parameter.
            .then((comment) => setComments(comment)) // sets comments state to data returned from API.
    }, [markerId, commentToggle])  // runs getMarkerComment when commentToggle state changes.

    useEffect(
        () => {
            getMarkerImage(markerId).then((img)=> setImages(img))
    }, [markerId])


    return (
        <article className="details">
                <section key={`detail--${marker.id}`} className="detail">
                        <Stack direction="row" spacing={2}>
                        <Button className="comment_button" variant="outlined" color="success"
                        onClick={() => { //
                            history.push({ pathname: `/markers/${marker.id}/comment`}) // pushes to comment form.
                        }}>Make Your Mark</Button>
                        <Button className="comment_button" variant="outlined" color="secondary"
                        onClick={() => {
                            history.push({ pathname: `/markers/${marker.id}/image`})  // pushes to image form.
                        }}>Upload Images</Button>
                        </Stack>
                        <div className="marker_details">
                            <div className="marker_detail_year">Marker Erected On: {marker.year_erected}</div>
                            <div className="marker_name">{marker.marker_name}</div>
                            <div className="marker_text">Marker Text: {marker.marker_text}</div>
                            <div className="marker_location">Marker Location: {marker.location}</div>
                        </div>
                            <div className="comments_body">
                            <div className="commentBody">{comments.map(
                                    (comment) => {
                                        return <><div>Comments:</div>
                                                    <IconButton className="comment_delete" aria-label="delete" size="small" color="primary">       
                                                    <Delete onClick={() => {
                                                    deleteComment(comment.id) 
                                                    .then(setCommentToggle(!commentToggle))
                                                    }} />{comment.text}</IconButton></>
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
                                const tag = {tag: mt.tag.id}
                                removeTag(markerId, tag)
                                .then(setToggle(!toggle))
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
                                    .then(setTagToggle(!tagToggle))
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
