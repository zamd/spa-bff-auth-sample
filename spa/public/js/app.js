// The Auth0 client, initialized in configureClient()
let auth0 = null;

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

  async isAuthenticated() {
    const user = await this.getUser();
    return user != null;
  }


  async getUser() {
    const url = `${this.options.baseUrl}/users/me`;
    try {
      const csrfToken = getCookie("XSRF-TOKEN");
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "x-xsrf-token": csrfToken
        }
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



class ApiClient {
  constructor(options) {
    this.options = options;
  }
  async addToCart() {
    const url = `${this.options.baseUrl}/api/cart/`;
    const json = JSON.stringify({ name: 'iphone', price: 900});
    try {
      const csrfToken = getCookie("XSRF-TOKEN");
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": 'application/json',
          "x-xsrf-token": csrfToken
        },
        body: json
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

const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Starts the authentication flow
 */
const login = async (targetUrl) => {
  try {
    console.log("Logging in", targetUrl);

    const options = {
      redirect_uri: window.location.origin
    };

    if (targetUrl) {
      options.appState = { targetUrl };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

const addToCart = async () => {
  const apiClient = new ApiClient({
    baseUrl: "http://bff.myspa.com"
  });

  const r = await apiClient.addToCart();
  console.log(r);
}

async function createAuth0Client() {
  console.log('creating a0');

  return new Auth0Client({
    baseUrl: "http://bff.myspa.com"
  });
}

/**
 * Executes the logout flow
 */
const logout = () => {
  try {
    console.log("Logging out");
  } catch (err) {
    console.log("Log out failed", err);
  }
};

/**
 * Initializes the Auth0 client
 */
const configureClient = async () => {
  auth0 = await createAuth0Client({
  });
};

/**
 * Checks to see if the user is authenticated. If so, `fn` is executed. Otherwise, the user
 * is prompted to log in
 * @param {*} fn The function to execute if the user is logged in
 */
const requireAuth = async (fn, targetUrl) => {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    return fn();
  }

  return login(targetUrl);
};

// Will run when page finishes loading
window.onload = async () => {
  await configureClient();
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    console.log("> User is authenticated");
    window.history.replaceState({}, document.title, window.location.pathname);
    updateUI();
    return;
  }

  console.log("> User not authenticated");

  updateUI();
};
