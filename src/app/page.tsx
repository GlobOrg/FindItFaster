import Maps, { Poi, PoiMarkers } from "@/components/layout/Maps";
import { Business, db } from "@/util/db";

export default async function Home() {
    const businesses = await db().query<Business & { id: number }>(
        /* language=PostgreSQL */ "SELECT id, name, longitude, latitude FROM biz_businesses"
    );
    const poi: Poi[] = businesses.rows.map((business) => {
        return { key: business.id.toString(), location: { lat: business.latitude, lng: business.longitude } };
    });
    return (
        <div className="grid grid-rows-[0px_1fr_0px] left-0 p-0 m-0 min-h-screen">
            <Maps>{poi && <PoiMarkers pois={poi} />}</Maps>
            <main></main>
        </div>
    );
}
