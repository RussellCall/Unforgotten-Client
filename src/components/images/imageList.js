import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import { deleteImage, getImages } from "./imageManger";


export const ImageList = (props) => {
    const [ images, setImage ] = useState([])
    const history = useHistory()
    const loadImage = () => {
        getImages()
            .then(
                (data) => {setImage(data)}
                )}

    useEffect(() => {
        loadImage()
    }, [])


    return (
        <><article className="images">
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/new"})
                    }}>Upload Image</button>
            {images.map(image => {
                return <div key={`image--${image.id}`} className="image">
                    <img className="image_url" src={image.image} alt={image.image}/>
                        <button onClick={() => {
                        deleteImage(image.id)
                        history.push("/image")
                        } }>Delete</button>
                    <div className="image_link"><Link to={`/images/${image.id}`}>{image.image}</Link></div>
                </div>;
            })}
        </article></>
        
    )

}