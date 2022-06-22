import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { deleteComment, getComments, getCurrentComment } from "./CommentsManager";

export const CommentList = (props) => {
    const [ comments, setComment ] = useState([])
    const history = useHistory()

    const loadComment = () => {
        getComments()
            .then(
                (data) => {setComment(data)}
                )}

    useEffect(() => {
        loadComment()
    }, [])

    return (
        <><article className="comments">
            {comments.map(comment => {
                return <section key={`comment--${comment.id}`} className="comment">
                    <div className="comment__text">{comment.marker_id} Comments:</div>
                        <button onClick={() => {
                        deleteComment(comment.id)
                        history.push("/comments")
                        } }>Delete</button>
                    <div className="comment__text">{comment.text}</div>
                </section>;
            })}
        </article></>
        
    )

}