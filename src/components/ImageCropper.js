import React from 'react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'

const ImageCropper = (props) => {
    console.log(props.image, "thieeffafaf")
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }

    return (
        <div style={{ height: props.height, width: props.width, position: 'relative' }}>
            <Cropper
                image={props.image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
        </div>
    )
}

export default ImageCropper