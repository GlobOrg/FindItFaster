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
    return (
        <>
            <div className="flex flex-col h-svh w-screen">
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOOGLE_API_KEY!}>
                    <Map defaultZoom={13} defaultCenter={{ lat: 53.40468, lng: -2.98034 }} mapId={"HOME_MAP"}>
                        {children}
                    </Map>
                </APIProvider>
            </div>
        </>
    );
}
