export function getToken() {
  const token = localStorage.getItem("auth-token");
  const data = JSON.parse(token);
  if (!data) {
    return null;
  }
  return data;
}
