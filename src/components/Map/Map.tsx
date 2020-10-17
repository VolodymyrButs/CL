import React from 'react'
import GoogleMapReact from 'google-map-react'
import Icon from 'assets/icons/pin.svg'
import { styleMap } from 'components/Map/styleMap'
import styled from 'styled-components'
import { colors } from 'styles/colors'

const PinSvg = styled(Icon)`
    transform: translate(-50%, -100%);
    color: ${colors.white};
    #eye {
        animation: squeeze 3s infinite;
    }

    @keyframes squeeze {
        90% {
            transform: none;
            animation-timing-function: ease-in;
        }
        93% {
            transform: translateY(25px) scaleY(0);
        }
        100% {
            animation-timing-function: ease-out;
        }
    }
`

const Marker = ({ lat, lng }: { lat: number; lng: number }) => {
    lat
    lng
    return <PinSvg />
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
                    lat: 50.44076,
                    lng: 30.5076,
                }}
                zoom={17}
            >
                <Marker lat={50.44076} lng={30.5076} />
            </GoogleMapReact>
        )
    }
}

export default SimpleMap
