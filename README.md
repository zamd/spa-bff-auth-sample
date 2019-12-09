# SPA-BFF Auth Sample

- Cookies are a type of `automatically submitted credentials` and needs speical care in a SPA architecture
- At minimum, the backend API must be locked down to only allow it's access via XHR. This can be done by checking for a custom header like `x-xsrf-token` with an expected value `#anti-forgery token`. Only requests including this custom header (and possibly content-type: `application/json`) should be able to call backend APIs. 
- Browser form POST won't be able to add custom headers and won't be able to execute API endpoints with `automatic credentials`
- This custom header approach along with a white-listed CORS origin should protect SPA endpoints from CSRF
- This is similar to `Authorization Bearer ey.....` model where access_token would be included as an `explicit credential`



- Regular website follows a similar model where they include an additional credential (csrfToken) along with automatic credentials (cookie) to ensure that it's the real user making the request. 


# How to Run

The sample uses [hiproxy](http://hiproxy.org/) which needs to be installed and configured in the browser... 

## Install dependencies and start

- git clone https://github.com/zamd/spa-bff-auth-sample.git
- Open 4 terminal windows to run "proxy", "bff server", "spa server" and "api server"

### "bff server"
Rename `.env.sample` file to `.env` and add you Auth0 settings
- cd spa-bff-auth-sample
- npm install
- npm start

### "api server"
Rename `.env.sample` file to `.env` and add you Auth0 settings
- cd spa-bff-auth-sample/apiserver
- npm install 
- npm start

### "spa server"
- cd spa-bff-auth-sample/spa
- npm install
- npm start 

### Install and start hiproxy

- The proxy will use the `rewrite` file available in the root `spa-bff-auth-sample` directory. 

- npm install -g hiproxy
- cd spa-bff-auth-sample
- hiproxy start

- Open the browser and configure HTTP Proxy as:

- Now browse the app as `myspa.com'



