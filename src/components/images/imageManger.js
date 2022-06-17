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