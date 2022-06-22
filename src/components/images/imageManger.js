export const getImages = () => {
    return fetch("http://localhost:8000/images", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getCurrentImage = (imgId) => {
    return fetch(`http://localhost:8000/images/${imgId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const createImage = (img) => {
    return fetch("http://localhost:8000/images", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(img)
    })
        .then(getImages)
}

export const getMarkerImage = (markerId) => {
    return fetch(`http://localhost:8000/images/${markerId}/images_by_marker`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const deleteImage = (imgId) => {
    return fetch(`http://localhost:8000/images/${imgId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
    })
    .then(getImages)
  };