export const getMarkers = () => {
    return fetch("http://localhost:8000/markers", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}