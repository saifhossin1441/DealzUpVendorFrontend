import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api'

const containerStyle = {
    width: '100vw',
    height: '100vh',
}

const center = {
    lat: 56.1304,  // Latitude of Canada
    lng: -106.3468 // Longitude of Canada
}

const Maps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDsc0jaxFvFYsc1b3Tblah0n1LV3RfZZDQ",
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    const worldBounds = {
        north: 85,   // Maximum latitude (prevents scrolling into blank space)
        south: -85,  // Minimum latitude
        west: -180,  // Westernmost longitude
        east: 180    // Easternmost longitude
    };

    const options = {
        restriction: {
            latLngBounds: worldBounds,  // Prevents excessive panning
            strictBounds: true,          // Enforces map within bounds
        },
        gestureHandling: "greedy", // Improves zooming experience
        minZoom: 3,  // Prevents zooming out too much
        maxZoom: 12, // Adjust for user experience
        // mapTypeControl: false, // Hide map type controls if needed
        // disableDefaultUI: false, // Keep other controls
        fullscreenControl: true, // Keep fullscreen option
        draggable: true, // Allow dragging, but within limits
    };
    const circleOptions = {
        strokeColor: "red",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "0x220000FF",
        fillOpacity: 0.35,
        radius: 500000, // Radius in meters (500km)
    };
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={options}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <Marker position={center} />
            <Circle center={center} options={circleOptions} />
        </GoogleMap>
    ) : (
        <></>
    )
}

export default Maps