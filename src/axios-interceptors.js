import axios from "axios";

export const initAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response && error.response != 401) {
                return Promise.reject(error);
            }
            const accessToken = await getNewAccessToken();
            localStorage.setItem("accessToken", accessToken);
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(error.config);
        }
    );

    axios.interceptors.request.use(
        async (request) => {
            if (request.url.endsWith("/oauth2/token")) return request;

            if (
                !request.headers.Authorization ||
                request.headers.Authorization.length === 0 ||
                request.headers.Authorization === "Bearer undefined"
            ) {
                let accessToken = localStorage.getItem("accessToken");
                if (!accessToken) {
                    accessToken = await getNewAccessToken();
                    localStorage.setItem("accessToken", accessToken);
                }
                request.headers.Authorization = `Bearer ${accessToken}`;
            }
            return request;
        },
        (error) => {
            console.log("Request error:", error.response);
            return Promise.reject(error);
        }
    );
}

async function getNewAccessToken() {
    const {
        data: { access_token },
    } = await axios.post("/oauth2/token", {
        grant_type: "client_credentials",
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
    });
    return access_token;
}