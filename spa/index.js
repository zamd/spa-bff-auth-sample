import getA0Client from './common';

function urlHasQueryString(url) {
    return url.split('?').slice(1).length>0;
}
window.onload = async () => {
    const client = await getA0Client();
    const u = await client.getUser();
    console.log(u);
    
    if (urlHasQueryString(window.location.href)) {
        const d = await client.handleRedirectCallback();
        console.log(d);
        const u = await client.getUser();
        console.log(u);
    }
        
    document.getElementById('btnGetUser').addEventListener('click', async()=>{
        const user = await client.getUser();
        console.log(user);
    });
    
    document.getElementById('btnLogin').addEventListener('click', async () => {
        try {
            const user = await client.getUser();
            if (user) {
                console.log(`logged in: ${JSON.stringify(user)}`);
            }
            else {
                console.log('starting login...');
                await client.loginWithRedirect({});
            }
        }
        catch (ee) {
            console.log(ee);
        }
    });
};


