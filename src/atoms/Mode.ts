import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "localStorage", //원하는 key 값 입력
    storage: localStorage,
  })

export interface IMode{
    isLightMode:boolean
}

export const Mode = atom<IMode>({
    key: 'isLightMode', 
    default: {
        isLightMode:true
    },
    effects_UNSTABLE : [persistAtom]
});