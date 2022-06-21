export const getImages = () => {
    return fetch("http://localhost:8000/images", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getCurrentImage = (id) => {
    return fetch(`http://localhost:8000/images/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

export const createImage = (img) => {
    return fetch("http://localhost:8000/images", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(img)
    })
        .then(getImages)
}

export const getMarkerImage = (markerId) => {
    return fetch(`http://localhost:8000/images/${markerId}/images_by_marker`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}