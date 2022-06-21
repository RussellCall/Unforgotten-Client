import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"
import { getImages } from "./imageManger";


export const ImageList = (props) => {
    const [ images, setImage ] = useState([])
    const history = useHistory()
//TODO - get the images from the database, and display them in a list as a Image.
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
                    <div className="image_link"><Link to={`/images/${image.id}`}>{image.image}</Link></div>
                </div>;
            })}
        </article></>
        
    )

}