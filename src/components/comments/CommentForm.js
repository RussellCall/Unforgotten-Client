import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { getMarkers } from "../markers/MarkerManager"
import { createComment } from "./CommentsManager"
import { getMarkerComment } from "./CommentsManager"


export const CommentForm = () => {
    const [comments, setComment] = useState({})
    const {markerId} = useParams() // markerId is the id of the marker comment is associated with.
    const [comment, setMarker] = useState([]) // comment is the comment object.
    const [commentToggle, setCommentToggle] = useState(false)
    const history = useHistory()

    const [currentComment, setCurrentComment] = useState({ //currentComment created as state variable to store props below.
        text: "", 
        marker_id: 0,
        user_id: 0
    }) // setCurrentComment takes comment id as a parameter
            // uses comment id to find comment in the comments array.
                // sets currentComment to the comment object. 

    useEffect(() => {
        getMarkerComment(markerId) 
            .then(
                (data) => {
                    setComment(data)
                })
                }, [commentToggle])


    useEffect(() => { 
        getMarkers()
        .then((commentFromAPI) => {
            setMarker(commentFromAPI);
            })
    }, []);


    const changeCommentState = (event) => {
        event.preventDefault()
        const NewComment = {...comment}  // using the spread operator to copy the comment object
        NewComment[event.target.name] = event.target.value // sets comment object to value of input field.
        setCurrentComment(NewComment) // sets currentComment to new comment object.
        
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
                        user_id: localStorage.getItem("auth_token")
                    }

                    // Send POST request to API
                    createComment(comment) // calls createComment passing in comment as parameter.
                        .then(setCommentToggle(!commentToggle))
                }}
                className="btn btn-primary">Submit</button>
        </form>
    )
}