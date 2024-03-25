import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "localStorage", //원하는 key 값 입력
    storage: localStorage,
  })

export const accessTokenAtom = atom({
    key: 'accessToken', 
    default:'',
    effects_UNSTABLE : [persistAtom]
});

export const isLoginSelector = selector({
    key     :   'isLoginSelector',
    get     :   ({get}) => { 
        const accessToken = get(accessTokenAtom);

        return !!(accessToken); 
    }
})