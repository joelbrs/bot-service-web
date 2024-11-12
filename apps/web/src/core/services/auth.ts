import { HttpFactory } from "../factories";

const baseUrl = "/auth";
const http = HttpFactory(baseUrl);

export const postSignIn = (params: object) => {
    return http.post(`sign-in`, params);
}

export const postSignUp = (params: object) => {
    return http.post(`sign-up`, params);
}