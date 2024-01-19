import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { IUser } from '../interfaces/user.interface';

interface userState {
    user: IUser | null;
    addUser: (data: IUser | null) => void;
}

export const useUserStore = create<userState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                addUser: (data) => set(() => ({ user: data })),
            }),
            {
                name: 'user-storage', // name of the item in the storage (must be unique)
                storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
            },
        ),
    )

)