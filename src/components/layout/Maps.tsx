"use client";

import React, { ReactNode } from "react";
//import { Loader } from "@googlemaps/js-api-loader";
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

export type Poi = { key: string; location: google.maps.LatLngLiteral };

export const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
        <>
            {props.pois.map((poi: Poi) => (
                <AdvancedMarker key={poi.key} position={poi.location}>
                    <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
                </AdvancedMarker>
            ))}
        </>
    );
};

export default function Maps({ children }: { children?: ReactNode }) {
    //const mapRef = React.useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const initMap = async () => {
    //         const loader = new Loader({
    //             apiKey: process.env.NEXT_PUBLIC_GOOOGLE_API_KEY as string,
    //             version: "weekly",
    //         });
    //
    //         const { Map } = await loader.importLibrary("maps");
    //
    //         //init a marker as google
    //         //@ts-expect-error google told me to do this
    //         const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    //
    //         const position = {
    //             lat: 43.642693,
    //             lng: -79.3871189,
    //         };
    //
    //         //map options
    //         const mapOptions: google.maps.MapOptions = {
    //             center: position,
    //             zoom: 17,
    //             mapId: "Finditfaster",
    //         };
    //
    //         //SETUP THE MAP
    //         const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
    //
    //         //add a marker
    //         new AdvancedMarkerElement({
    //             map: map,
    //             position: position,
    //         });
    //     };
    //     initMap();
    // }, []);

    return (
        <>
            <div>
                {/* <iframe
                    src="https://storage.googleapis.com/maps-solutions-uben8x1wu5/neighborhood-discovery/85j4/neighborhood-discovery.html"
                    width="1000"
                    height="200"
                    className="border-none"
                    loading="eager"
                ></iframe> */}
            </div>

            <div className="flex flex-col h-4/6 w-screen">
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOOGLE_API_KEY!}>
                    <Map defaultZoom={13} defaultCenter={{ lat: 53.40468, lng: -2.98034 }} mapId={"HOME_MAP"}>
                        {children}
                    </Map>
                </APIProvider>
            </div>
        </>
    );
}
