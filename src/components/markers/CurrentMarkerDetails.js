import React, { useEffect, useState } from "react"
import "./Details.css"
import { Link, useHistory, useParams } from "react-router-dom"
import { getTags, removeTag } from "../comments/tags/TagManager.js"
import { getCurrentMarker, updateTag, userMarkerTag } from "./MarkerManager.js"
import { deleteComment, getMarkerComment } from "../comments/CommentsManager.js"
import { deleteImage, getMarkerImage } from "../images/imageManger.js"
import { Button, IconButton, Checkbox } from '@mui/material'
import { Delete } from "@mui/icons-material"
import Stack from '@mui/material/Stack';
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";
import { DialogTitle, Typography } from "@material-ui/core"


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
        <Dialog open={true} maxWidth="lg">
                <DialogTitle>
                <Grid container justify="space-between" alignItems="center">
                    <Typography variant="div">{marker.marker_name}</Typography>
                    <IconButton onClick={() => 
                            history.push(`/`)}>
                    <CloseIcon />
                    </IconButton>
                </Grid>
                </DialogTitle>
        <div className="details">
                <section key={`detail--${marker.id}`} className="detail">

                        <div className="marker_details">
                            <div className="marker_detail_year">Marker Erected On: {marker.year_erected}</div>
                            {/* <div className="marker_name">{marker.marker_name}</div> */}
                            <div className="marker_text">Marker Text: {marker.marker_text}</div>
                            <div className="marker_location">Marker Location: {marker.location}</div>
                                <Stack direction="row" spacing={2}>
                                <Button className="comment_button" variant="contained" color="success"
                                onClick={() => { //
                                    history.push({ pathname: `/markers/${marker.id}/comment`}) // pushes to comment form.
                                }}>Make Your Mark</Button>
                                <Button className="comment_button" variant="contained" color="secondary"
                                onClick={() => {
                                    history.push({ pathname: `/markers/${marker.id}/image`})  // pushes to image form.
                                }}>Upload Images</Button>
                                </Stack>

                                {tags.map((t, index) => {
                            return <div className="tags">
                            <li key={index}>
                            <div className="tag_options">
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
                        </div>

                        {markerTags.map((mt) => {
                            return <><div className="marker_tag">Tags: {mt.tag?.label}</div>
                            <Button className="remove_tag_btn" variant="outlined" color="error" size="small"
                                onClick={() => {
                                const tag = {tag: mt.tag.id}
                                removeTag(markerId, tag)
                                .then(setToggle(!toggle))
                                }}>Clear Tags</Button></>

                            
                        })}

                    </section>
                    <section>
                    <div className="comments_body">
                            <div className="header">My Experience</div>
                            <div className="commentBody">{comments.map(
                                    (comment) => {
                                        return <>  <div className="comment_text">{comment.text}</div>
                                                    <Button variant="outlined" size="small" color="error"       
                                                    onClick={() => {
                                                    deleteComment(comment.id) 
                                                    .then(setCommentToggle(!commentToggle))
                                                    }}>delete</Button></>
                                    }
                                )}</div>

                        <div className="images">
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
                    </section>
        </div>
        </Dialog>)
}
