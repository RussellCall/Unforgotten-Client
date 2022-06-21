import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getMarkers } from "../markers/MarkerManager"
import { createComment } from "./CommentsManager"


export const CommentForm = () => {
    const history = useHistory()
    const {markerId} = useParams()
    const [comment, setMarker] = useState([])

    /*
    TODO - Add a useEffect to get the marker data from the database when the component mounts.
    TODO - Add a useEffect to get the marker data from the database when the markerId changes.
    TODO - Make Form Data populate and post per individual marker.
    */
    const [currentComment, setCurrentComment] = useState({
        text: "",
        marker_id: 0,
        user_id: 0
    })

    useEffect(() => {
        getMarkers()
        .then((commentFromAPI) => {
            setMarker(commentFromAPI);
            })
    }, []);


    const changeCommentState = (event) => {
        event.preventDefault()
        const NewComment = {...comment}
        NewComment[event.target.name] = event.target.value
        setCurrentComment(NewComment)
        
    }
    return (
        <form className="commentForm">
            <h2 className="commentForm__title">New Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="text">Comment: </label>
                    <input type="text" name="text" require autoFocus className="form-control"
                        value={currentComment.text}
                        onChange={changeCommentState}
                    />
                </div>
            </fieldset>

            <button type="create"
                onClick={event => {
                    // Prevent form from being submitted
                    event.preventDefault()

                    const comment = {
                        marker_id: markerId,
                        text: currentComment.text,
                        user_id: localStorage.getItem("lu_token")
                    }

                    // Send POST request to your API
                    createComment(comment)
                        .then(() => history.push("/comments"))
                }}
                className="btn btn-primary">Submit</button>
        </form>
    )
}