import axios from "axios";

const http = axios.create({
  // baseURL: "https://nx-leave-app.herokuapp.com/api/v1",
  // baseURL: "http://localhost:3005/api/v1",
  baseURL: "https://nx-leave-backend.cleverapps.io/api/v1",
});

const requestHandler = (request) => {
  request.headers.Authorization = localStorage.token;
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  }
  return response;
};

const errorHandler = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  }
  return Promise.reject(error);
};

http.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

http.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default http;
