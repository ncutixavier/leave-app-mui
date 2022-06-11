import jwt_decode from "jwt-decode";

export const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return jwt_decode(token);
  }
  return null;
};

export const authRedirect = (navigate) => { 
  const token = localStorage.getItem("token");
  if (token) {
    const user = jwt_decode(token);
    if (user.role === "employee") {
      navigate("/employee");
    }
    if (user.role === "admin") {
      navigate("/admin");
    }
  }
}
