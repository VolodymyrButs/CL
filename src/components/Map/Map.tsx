import React from 'react'
import GoogleMapReact from 'google-map-react'
import Icon from 'assets/icons/Logo.svg'
import { styleMap } from 'components/Map/styleMap'

const Marker = ({ lat, lng }: { lat: number; lng: number }) => {
    lat
    lng
    return (
        <Icon
            style={{
                transform: 'translate(-30%, -100%)',
            }}
        />
    )
}

class SimpleMap extends React.Component {
    render() {
        const mapOptions = {
            maxZoom: 21,
            styles: styleMap,
        }

        return (
            <GoogleMapReact
                options={mapOptions}
                bootstrapURLKeys={{
                    key: 'AIzaSyBZhp4ZnniD35BMQX6miz68sMD-HUiT85U',
                }}
                center={{
                    lat: 50.440771,
                    lng: 30.507301,
                }}
                zoom={17}
            >
                <Marker lat={50.440771} lng={30.507301} />
            </GoogleMapReact>
        )
    }
}

export default SimpleMap
