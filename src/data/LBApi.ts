export type BusinessInfo = {
    business_id: string;
    google_id: string;
    place_id: string;
    name: string;
    latitude: number;
    longitude: number;
    full_address: string;
    working_hours?: {
        Monday?: Array<string>
        Tuesday?: Array<string>
        Wednesday?: Array<string>
        Thursday?: Array<string>
        Friday?: Array<string>
        Saturday?: Array<string>
        Sunday?: Array<string>
    }
    website?: string;
    owner_id?: number;
    owner_name?: string;
    business_status: 'OPEN' | 'TEMPORARILY_CLOSED' | 'CLOSED'
}

export async function search(query: string, lat: number = 2.0, lng: number = 2.0, zoom: number = 10, limit: number = 10) {
    const queryParam = encodeURIComponent(query);

    let target = `https://local-business-data.p.rapidapi.com/search?`
    target += `query=${queryParam}`
    target += `&lat=${lat}&lng=${lng}`
    target += `&zoom=${zoom}`
    target += `&limit=${limit}`
    target += `&language=en&region=gb&extract_emails_and_contacts=false`
    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('x-rapidapi-host', 'local-business-data.p.rapidapi.com')
    headers.set('x-rapidapi-key', process.env.RAPID_API_KEY!)
    const res = await fetch(target, {
        method: 'GET',
        headers: headers,
    })

    const resBody = await res.json();
    if (res.ok) {
        return resBody as Array<BusinessInfo>
    } else {
        console.log('error during fetch: ' + JSON.stringify(resBody));
        throw new Error('An internal error occurred fetching results')
    }
}

export async function getBusinessDetails(businessId: string): Promise<BusinessInfo> {
    let target = "https://local-business-data.p.rapidapi.com/business-details?"
    target += `business_id=${businessId}`
    target += `&language=en&region=gb&extract_emails_and_contacts=false&extract_share_link=false`


    const headers = new Headers()
    headers.set('Accept', 'application/json')
    headers.set('x-rapidapi-host', 'local-business-data.p.rapidapi.com')
    headers.set('x-rapidapi-key', process.env.RAPID_API_KEY!)

    const res = await fetch(target, {
        method: 'GET',
        headers: headers,
    })

    const resBody = await res.json();
    if (res.ok) {
        return resBody as BusinessInfo
    } else {
        console.log('error during fetch: ' + JSON.stringify(resBody));
        throw new Error('An internal error occurred fetching results')
    }
}
