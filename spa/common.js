import createAuth0Client from '@auth0/auth0-spa-js';

export default async function getA0Client() {
    console.log('creating a0');
    // return await createAuth0Client({
    //     client_id: 'dlVMpoNrHJ0dS444KEgeI5VC19i2rszz',
    //     domain:'fourzero.auth0.com',
    //     redirect_uri: `http://localhost:1234`
    // });

    return new Auth0Client({
        baseUrl: "http://bff.myspa.com"
    });
}


class Auth0Client {
    constructor(options) {
        this.options = options;
    }

    buildLoginUrl() {
        const baseUrl = this.options.baseUrl || window.location.origin;
        return `${baseUrl}/login?state=${btoa(window.location)}`;
    }

    async loginWithRedirect() {
        const url = this.buildLoginUrl();
        window.location.assign(url);
    }

    async getUser() {
        const url = `${this.options.baseUrl}/users/me`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include'
            });
            if (res.status == 200)
                return await res.json();
            return null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}