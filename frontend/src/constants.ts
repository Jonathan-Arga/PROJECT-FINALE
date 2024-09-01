export function getAuthHeader(): { Authorization: string } {
	return { Authorization: "Bearer " + sessionStorage.getItem("token") };
}
