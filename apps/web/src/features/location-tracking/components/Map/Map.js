import { MdSwitchVideo } from 'react-icons/md';
import { AiOutlineStop } from 'react-icons/ai';
import { BsFillRecordCircleFill } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineAudioMuted } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import { HiLocationMarker } from 'react-icons/hi';
import { MdSpatialTracking } from 'react-icons/md';
import { MdOutlineTrackChanges } from 'react-icons/md';

import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import icon from "../../icon-play.svg"
import { MEDIA__TYPE } from "../hooks/webRTC/actions/action"
import { useDispatch, useSelector } from 'react-redux'

const zoom = 8;
const items = [
    {
        place: 'pokhara',
        lat: 28.2096,
        long: 83.9856
    },
    {
        place: 'jhapa',
        lat: 26.5455,
        long: 87.8942
    },
    {
        place: 'kathmandu',
        lat: 27.7172,
        long: 85.3240
    },
    {
        place: 'Mt. Everest',
        lat: 27.9881,
        long: 86.9250
    },
]
const Map = ({ setShowPeerTracking }) => {
    // const state = useSelector((state) => state.Slice1)
    // const [coordinates, setCoordinates] = useState(state?.mapLocation)
    const { isRecording, media } = useSelector(state => state.socket)

    const [coordinates, setCoordinates] = useState({
        lat: 28,
        long: 28
    })
    const [data, setData] = useState(items)
    const [childClicked, setChildClicked] = useState(null)
    useEffect(() => {
        async function getAddress() {
            let pos = await new Promise((resolve, reject) => {
                navigator?.geolocation?.getCurrentPosition(resolve, reject)
            })
            const { latitude, longitude } = pos.coords
            console.log('called here')
            setCoordinates({ lat: latitude, lng: longitude })
        }
        getAddress()
    }, [])

    console.log({ childClicked })
    return (
        <div style={{ height: '100%', width: '100%', }}>
            <GoogleMapReact
                defaultCenter={coordinates}
                defaultZoom={zoom}
                bootstrapURLKeys={{ key: 'AIzaSyCTbYZF_kDxKNopcvej6oh-eVs1z9Xq2J0' }}
                // bootstrapURLKeys={{ key: 'AIzaSyDh0mmKyaIeWxTS-oII7ugqKb91afj4ZQ8' }}
                center={coordinates}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                }}
                onChildClick={(e) => {
                    setChildClicked(e)
                }}
            >
                {data?.map(({ place, lat, long }) => (
                    <div
                        lat={lat}
                        lng={long}
                    >
                        <div data-fslightbox className="vc wf hg mb">
                            <span style={{ backgroundColor: 'blue', width: '35px', height: '35px' }} className="tc wf xf be dd rg i gh ua">
                                <span style={{ backgroundColor: 'blue' }} className="nf h vc yc vd rg gh qk -ud-z-1"></span>
                                <MdSpatialTracking
                                    className="text-white"
                                    size={22}
                                />
                            </span>
                        </div>

                    </div>
                ))}

            </GoogleMapReact>

        </div>
    );
}
export default Map