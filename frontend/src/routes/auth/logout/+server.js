import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";

const API_BASE_URL = env.API_BASE_URL || "http://localhost:3000";

export const POST = async ({ cookies, fetch }) => {
  const token = cookies.get("token");

  if (!token) {
    cookies.delete("token", { path: "/" });
    return json({ message: "Already logged out" }, { status: 200 });
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    cookies.delete("token", { path: "/" });

    if (!res.ok) {
      return json({ message: data?.message ?? "Logout failed" }, { status: res.status });
    }

    return json(data, { status: 200 });
  } catch (err) {
    cookies.delete("token", { path: "/" });
    return json({ message: err.message }, { status: 500 });
  }
};