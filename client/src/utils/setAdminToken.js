import axios from "axios";

const setAdminToken = (admintoken) => {
  if (admintoken) {
    axios.defaults.headers.common["x-auth-token"] = admintoken;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAdminToken;
