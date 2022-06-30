# Getting Started

Utilize the associated Django database with this application: <https://github.com/RussellCall/Unforgotten-API.git>

## Remembering Nashville Application

This application Provides users with an interactive map, displaying historic sites across Nashville, dating back to the city's earliest days.  The database includes over one hundred historical markers maintained by the Metropolitan Historical Commission of Nashville.  Users will have access to long forgotten moments and significant figures rooted in the history of Nashville.

### Utility

After registering and logging in, users will see a map of Nashville. This map will have pinned locations correlating to historic markers derived from the Metropolitan Historical Commission of Nashville database. Users will be able to tag locations as sites they wish to visit in the future, or as locations they have already visited.  Users will be able to write personal notes and reviews of each individual historic marker as well as upload personal photos.

### Interactive Map

The map functionality utilizes the Mapbox graphic mapping API.  More specifically, as this is a REACT application, this app utilizes the react-map-gl wrapper for Mapbox GL JS. https://visgl.github.io/react-map-gl/

### Map Markers

The map markers are the core of the application's practical use.  Each marker is a static point, correlating with a the officially documented location of individual historic markers.  Mouse clicking each marker generates a popup, featuring the label of the historic marker as well as a button titled 'marker details'.  Mouse clicking this button generates a dialogue window featuring a detailed summary of the historic site, a section referred to as "my Experience", as well as a set of buttons titled "Make Your Mark", "Upload Images", "Must See", "Seen", and "See Again".  There is an additional section called ""My Experience" in this same dialogue window featuring user comments and images uploaded by the user.

### Buttons Contained in "Marker Details"

"Make Your Mark": Mouse clicking this button generates an additional dialogue window with a fillable form-field. Users may use this form to create comments that will publish to the "My Experience" section.

"Upload Images": Mouse clicking this button generates functions identically to "Make Your Mark", except the user make enter URLs tied to images the user wishes to upload.

"Must See", "Seen", and "See Again": These are tag buttons that will associate each individual marker with said tag, if the user mouse clicks either.

![Marker Demo](/demos/MarkerDemo.gif)

### Resources

React, Javascript, CSS, Material UI, Mapbox GL JS in React.

### Installed Dependencies

npm install --save react-map-gl mapbox-gl

npm install @material-ui/core

npm install @mui/material @mui/styled-engine-sc styled-components

npm install @mui/icons-material

npm install @mui/material @emotion/react @emotion/styled