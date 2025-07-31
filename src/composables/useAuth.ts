// composables/useAuth.ts
import { useUserStore } from "@/store/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import type { AxiosInstance } from "axios";

export async function loginByToken($axios: AxiosInstance): Promise<void> {
    const store = useUserStore();
    const tokenData = getToken();

    if (!tokenData) {
        console.log("[Auth] No token found");
        return;
    }

    console.log("[Auth] Token found:", tokenData.token);
    store.token = tokenData.token;

    try {
        const res = await $axios.get("/tokenlogin");
        console.log("[Auth] tokenlogin response:", res);

        if (res?.status === 200 && res.data) {
            if (res.data.code !== 299) {
                await removeToken();
                store.reLogin();
            } else {
                store.login(tokenData);
                console.log("[Auth] Login verified");
            }
        }
    } catch (err) {
        console.error("[Auth] Token login failed:", err);
    }
}
