"use client";

import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Maps() {
    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOOGLE_API_KEY as string,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary("maps");

            //init a marker as google
            //@ts-expect-error google told me to do this
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            const position = {
                lat: 53.400002,
                lng: -2.983333,
            };

            //map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: "Finditfaster",
            };

            //SETUP THE MAP
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            //add a marker
            new AdvancedMarkerElement({
                map: map,
                position: position,
            });
        };
        initMap();
    }, []);

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
            <div style={{ height: "600px", width: "1000px" }} ref={mapRef} />
        </>
    );
}
