import env from './env'
const ApiURL = env.LOCALHOST
export default async function postRequest(route, authToken, reqBody) {
    const response = await fetch(ApiURL + "" + route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authToken': authToken
        },
        body: JSON.stringify(reqBody)
    });
    return response
}