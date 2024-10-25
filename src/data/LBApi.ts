export type BusinessInfo = {

}

export default async function search(query: string, lat: number = 2.0, lng: number = 2.0, zoom: number = 10, limit: number = 10) {
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
        throw new Error('An internal error occured fetching results')
    }
}
