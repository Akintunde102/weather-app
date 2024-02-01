import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MetaStore {
    alreadyRedirectedToCityPage: boolean
    updateCityPageRedirection: (bool: boolean) => void;
}

const useMetaStore = create<MetaStore>()(
    persist(
        (set, get) => ({
            alreadyRedirectedToCityPage: get()?.alreadyRedirectedToCityPage || false,
            updateCityPageRedirection: (bool) =>
                set(() => ({
                    alreadyRedirectedToCityPage: bool
                })),
        }),
        {
            name: 'meta',
        }
    )
);

export default useMetaStore;
