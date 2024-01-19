import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { IAnswerResult } from '../interfaces/questionair.interface';

interface useansState {
    ans: IAnswerResult[] | null,
    addAnsData:(data:IAnswerResult[] | null)=>void;
}

export const useAnsStore = create<useansState>()(
    devtools(
        persist(
            (set) => ({
                ans: null,
                addAnsData: (data) => set(() => ({ ans: data })),
            }),
            {
                name: 'ans-storage', // name of the item in the storage (must be unique)
                storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
            },
        ),
    )

)