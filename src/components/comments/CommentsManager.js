export const getMarkers = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentComments = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}