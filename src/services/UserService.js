import { BASE_URL } from '../util/Constants';


export const dologin = (email, password) => {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });

            if (response.ok) {
                const responseData = await response.json();
                resolve(responseData);
            } else {
                // Handle non-OK response
                console.error('Error:', response.status);
                reject(response.status);
            }
        } catch (error) {
            console.error('Error:', error);
            reject(error);
        }

    });
}