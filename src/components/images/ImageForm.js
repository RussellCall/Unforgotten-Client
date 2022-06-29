import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getMarkers } from "../markers/MarkerManager.js"
import { createImage } from "./imageManger.js"
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";
import { DialogTitle, Typography } from "@material-ui/core"
import { IconButton } from '@mui/material'

export const ImageForm = () => {
    const history = useHistory()
    const {markerId} = useParams()
    const [image, setMarker] = useState([])


    const [currentImage, setCurrentImage] = useState({ //currentImage created as state variable to store props below.
        image: "",
        marker_id: 0,
        user_id: 0
    }) // setCurrentImage takes image id as a parameter uses image id to find image in the images array.
            // sets currentImage to the image object.
            // currentImage is used to set the value of the input field.

    useEffect(() => {
        getMarkers()
        .then((imgFromAPI) => {
            setMarker(imgFromAPI);
            })
    }, []); // empty array only runs once on page load.


    const changeImgState = (evt) => {
        evt.preventDefault()
        const NewImage = {...image}
        NewImage[evt.target.name] = evt.target.value
        setCurrentImage(NewImage)
        
    }
    return (
        <Dialog open={true}>
        <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
            <Typography variant="div">Upload Your Images</Typography>
            <IconButton onClick={() => 
                    history.push(`/markers/${markerId}`)}>
            <CloseIcon />
            </IconButton>
        </Grid>
        </DialogTitle>
        <form className="imageForm">
            <h2 className="imageForm__title">Image URL Input</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="text">Image URL: </label>
                    <input type="text" name="text" require autoFocus className="form-control"
                        value={currentImage.text}
                        style={{ width: "500px" }}
                        onChange={changeImgState}
                    />
                </div>
            </fieldset>

            <button type="create"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const image = {
                        marker_id: markerId,
                        image: currentImage.text,
                        user_id: localStorage.getItem("auth_token")
                    }

                    // Send POST request to your API
                    createImage(image)
                        .then(() => history.push("/images"))
                }}
                className="btn btn-primary">Submit</button>
        </form>
        </Dialog>
    )
}