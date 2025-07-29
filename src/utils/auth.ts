// utils/auth.ts
const TOKEN_KEY = 'smartNCCdemo_tokenInfo';

export function getToken(): string | null {
  try {
    const data = uni.getStorageSync<{ token: string }>(TOKEN_KEY);
    return data?.token || null;
  } catch (e) {
    console.error('[getToken ERROR]:', e);
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
