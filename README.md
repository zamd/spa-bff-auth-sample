# spa-backend-auth-sample

- Cookies are a type of `automatically submitted credentials` and needs speical care in a SPA architecture
- At minimum, the backend API must be locked down to only allow it's access via XHR. This can be done by checking for a custom header like `csrf` with an expected value `auth0-spa`. Only requests including this custom header (and possibly content-type: `application/json`) should be able to call backend APIs. 
- Browser form POST won't be able to add custom headers and won't be able to execute API endpoints with `automatic credentials`
- This custom header approach along with a white-listed CORS origin should protect SPA endpoints from CSRF
- This is similar to `Authorization Bearer ey.....` model with access_token would be included as an `explicit credential`



- Regular website follows a similar model where they include an additional credential (csrfToken) along with automatic credentials (cookie) to ensure that it's the real user making the request. 
