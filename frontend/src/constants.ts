import axios from "axios";

export function getAuthHeader(): { Authorization: string } {
  return { Authorization: "Bearer " + sessionStorage.getItem("token") };
}

export async function getUserID() {
  return (await axios.get("/users", { headers: getAuthHeader() })).data.id;
}
