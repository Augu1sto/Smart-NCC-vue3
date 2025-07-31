// utils/auth.ts
const TOKEN_KEY = "smartNCCdemo_tokenInfo";

export function getToken(): object | null {
    try {
        const data = uni.getStorageSync(TOKEN_KEY);
        return data || null;
    } catch (e) {
        console.error("[getToken ERROR]:", e);
        return null;
    }
}

export function setToken(payload: any, callback?: () => void): void {
    uni.setStorage({
        key: TOKEN_KEY,
        data: payload,
        success: callback,
    });
}

export function removeToken(): void {
    uni.removeStorage({ key: TOKEN_KEY });
}
