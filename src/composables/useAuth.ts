// composables/useAuth.ts
import { useUserStore } from '@/store/user';
import { getToken } from '@/utils/auth';
import type { AxiosInstance } from 'axios';

export async function loginByToken($axios: AxiosInstance): Promise<void> {
  const store = useUserStore();
  const token = getToken();

  if (!token) {
    console.log('[Auth] No token found');
    return;
  }

  console.log('[Auth] Token found:', token);
  store.token = token;

  try {
    const res = await $axios.get('/tokenlogin');
    console.log('[Auth] tokenlogin response:', res);

    if (res?.status === 200 && res.data) {
      if (res.data.code !== 299) {
        await store.reLogin();
      } else {
        console.log('[Auth] Login verified');
      }
    }
  } catch (err) {
    console.error('[Auth] Token login failed:', err);
  }
}
