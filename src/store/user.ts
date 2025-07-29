import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { setToken, removeToken } from "@/utils/auth";

interface TokenInfo {
    username?: string; // 可选属性
    school?: string,
    snumber?: string,
    tel?: string,
    avatar?: string,
    // Add other properties as needed
}

export const useUserStore = defineStore('user', () => {
    // state
    const hasLogin = ref<boolean>(false);
    const token = ref<string>('');
    let tokenInfo = reactive<TokenInfo>({});

    // getters
    const getUsername = computed<string>(() => tokenInfo.username || '');
    const getSchool = computed<string>(() => tokenInfo.school || '');
    const getNumber = computed<string>(() => tokenInfo.snumber || '');
    const getTel = computed<string>(() => tokenInfo.tel || '');
    const getAvatarUrl = computed<string>(() => tokenInfo.avatar || '');

    // actions
    function login(payload: any) {
        hasLogin.value = true;
        tokenInfo = {
            username: payload.username,
            school: payload.school,
            snumber: payload.snumber,
            tel: payload.tel,
            avatar: payload.avatar
        };
        token.value = payload.token;
        setToken(payload, () => {
            console.log('success login');
        })
        // console.log(tokenInfo); // for dev
    }


    function logout() {
        hasLogin.value = false;
        token.value = "";
        tokenInfo = {};

        removeToken();     
    }


    // actions
    function reLogin() {
        logout();
    }

    return {
        hasLogin,
        token,
        tokenInfo,
        getUsername,
        getSchool,
        getNumber,
        getTel,
        getAvatarUrl,
        login,
        logout,
        reLogin
    };
});