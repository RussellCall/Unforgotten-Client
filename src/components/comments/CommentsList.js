import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { getComments, getCurrentComment } from "./CommentsManager";

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
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/new"})
                    }}>Leave A Comment</button>
            {comments.map(comment => {
                return <section key={`comment--${comment.id}`} className="comment">
                    <div className="comment__text">{comment.marker_id.marker_name} Comments:</div>
                    <div className="comment__text">{comment.text}</div>
                </section>;
            })}
        </article></>
        
    )

}