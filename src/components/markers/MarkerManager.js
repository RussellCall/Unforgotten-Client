
export const getMarkers = () => {
    return fetch("http://localhost:8000/markers", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getCurrentMarker = (id) => {
    return fetch(`http://localhost:8000/markers/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(res => res.json())
}

export const updateTag = (marker, tag) => {
    return fetch(`http://localhost:8000/markers/${marker}/add_tag`, {
        method: "PUT",
        headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json"
    },
        body: JSON.stringify(tag)
    })
  };

  export const userMarkerTag = () => {
        return fetch(`http://localhost:8000/marker_tags`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`

            }
        })
        .then(res => res.json())
  }