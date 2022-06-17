import React, { useEffect, useState } from "react";
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

    // useEffect(
    //     () => {
    //         getCurrentGame(parseInt(gameId)).then((gameData) => {
    //             editGame(gameData)
    //         })
    //     }, [])

    return (
        <><article className="images">
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/new"})
                    }}>Upload Image</button>
            {images.map(image => {
                return <section key={`image--${image.id}`} className="image">
                    <div className="image_url">{image.image}</div>
                    <div className="image_link"><Link to={`/images/${image.id}`}>{image.image}</Link></div>
                </section>;
            })}
        </article></>
        
    )

}