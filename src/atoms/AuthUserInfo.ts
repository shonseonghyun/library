import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "localStorage", //원하는 key 값 입력
    storage: localStorage,
  })


export interface IAuthUserInfo{
    accessToken: string,
    refreshToken:string,
    userId: string,
    userNo: number
}

export const AuthUserInfoAtom = atom<IAuthUserInfo>({
    key: 'authUserInfo', 
    default: {
        accessToken:'',
        refreshToken:'',
        userId:'',
        userNo: 0
    },
    effects_UNSTABLE : [persistAtom]
});

export const isLoginSelector = selector({
    key     :   'isLoginSelector',
    get     :   ({get}) => { 
        const authUserInfo = get(AuthUserInfoAtom);

        return !!(authUserInfo.accessToken); 
    }
})