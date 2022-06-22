import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getMarkers } from "../markers/MarkerManager.js"
import { createImage } from "./imageManger.js"

export const ImageForm = () => {
    const history = useHistory()
    const {markerId} = useParams()
    const [image, setMarker] = useState([])


    const [currentImage, setCurrentImage] = useState({
        image: "",
        marker_id: 0,
        user_id: 0
    })

    useEffect(() => {
        getMarkers()
        .then((imgFromAPI) => {
            setMarker(imgFromAPI);
            })
    }, []);


    const changeImgState = (evt) => {
        evt.preventDefault()
        const NewImage = {...image}
        NewImage[evt.target.name] = evt.target.value
        setCurrentImage(NewImage)
        
    }
    return (
        <form className="imageForm">
            <h2 className="imageForm__title">Image URL Input</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="text">Image URL: </label>
                    <input type="text" name="text" require autoFocus className="form-control"
                        value={currentImage.text}
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
    )
}