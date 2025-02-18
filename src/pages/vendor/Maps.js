import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle, Autocomplete } from '@react-google-maps/api'

const containerStyle = {
    width: '100vw',
    height: '100vh',
}

const center = {
    lat: 56.1304,  // Latitude of Canada
    lng: -106.3468 // Longitude of Canada
}

const Maps = (props) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDsc0jaxFvFYsc1b3Tblah0n1LV3RfZZDQ",
    })
    const [map, setMap] = useState(null)


    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center)
        setMap(map)
        map.fitBounds(bounds)


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
        maxZoom: 18, // Adjust for user experience
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
    useEffect(() => {

        if (props?.searchQuery?.lat) {
            getPlaceName(props?.searchQuery?.lat, props?.searchQuery?.lng);
        }

    }, [])

    const [markerPosition, setMarkerPosition] = useState(null);
    const [placeName, setPlaceName] = useState("");
    // console.log(markerPosition, "this is marker position")
    // Handle map click to set marker
    const handleMapClick = (event) => {
        const clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarkerPosition(clickedLatLng); // Update marker position
        getPlaceName(clickedLatLng.lat, clickedLatLng.lng);
    };

    const getPlaceName = async (lat, lng) => {
        console.log(lat, lng, "this is get")
        if (!lat || !lng) return;

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
                const addressComponents = results[0].address_components;
                let postalCode = "";
                let city = "";
                let state = "";
                let country = "";
                // Extract postal code from address components
                for (let component of addressComponents) {
                    if (component.types.includes("postal_code")) {
                        postalCode = component.long_name;
                    }
                    if (component.types.includes("locality")) {
                        city = component.long_name;
                    }
                    if (component.types.includes("administrative_area_level_1")) {
                        state = component.long_name;
                    }
                    if (component.types.includes("country")) {
                        country = component.long_name;
                    }
                }

                const address = results[0].formatted_address;
                // console.log(results, "therse are results")
                setPlaceName(address);


                props.onLocationSelect({
                    lat, lng, address: results[0].formatted_address, pincode: postalCode, city,
                    state, country
                });

            } else {
                setPlaceName("Unknown location");
            }
        });
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={props?.searchQuery?.lat ? props?.searchQuery : markerPosition ? markerPosition : center}
            zoom={22}
            options={options}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
        >
            {/* Child components, such as markers, info windows, etc. */}

            {markerPosition ? (
                <Marker position={markerPosition} />
            ) : props?.searchQuery?.lat && props?.searchQuery?.lng ? (
                <Marker position={{ lat: props?.searchQuery?.lat, lng: props?.searchQuery?.lng }} />
            ) : null}
            {/* <Circle center={center} options={circleOptions} /> */}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default Maps