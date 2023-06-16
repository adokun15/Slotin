import { redirect } from "react-router-dom";
export function logout() {
  localStorage.removeItem("auth-token");
  return redirect("/?type=login");
}
