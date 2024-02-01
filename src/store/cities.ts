import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export interface City {
    id: string;
    name: string;
    fullName: string;
    coordinates: string;
    country: string;
    lastTemperature: string;
}

export type AddCityArg = Omit<City, "id">;


interface CityStore {
    cities: City[];
    _hasHydrated: boolean;
    _initialized: boolean;
    setHasHydrated: (state: any) => void;
    setInitialized: (state: any) => void;
    addCity: (city: AddCityArg) => void;
    updateCityLastTemperature: (id: string, newTemperature: string) => void;
    deleteCity: (fullName: string) => void;
    isCityPresent: (fullName: string) => boolean;
}


export const createCity = (cityDetails: Omit<City, "id">) => {
    return {
        id: uuidv4(),
        ...cityDetails
    }
}

interface GenerateCityStoreArgs<T> {
    storeName: string;
    onRehydrateStorage?: (state: T) => void
}


const isCityPresent = (set: any, get: any) => (fullName: string): boolean => {
    return (get()?.cities || []).some((city: City) => city.fullName === fullName);
}


const generateCityStore = ({ storeName, onRehydrateStorage }: GenerateCityStoreArgs<CityStore>) => create<CityStore>()((
    persist(
        (set, get) => {
            return {
                _hasHydrated: false,
                _initialized: false,
                setHasHydrated: (hydrationState: boolean) => {
                    set(() => ({
                        _hasHydrated: hydrationState,
                    }));
                },
                setInitialized: (initializationState: boolean) => {
                    set(() => ({
                        _initialized: initializationState,
                    }));
                },
                cities: get()?.cities || [],
                addCity: (city) => {
                    const alreadyAdded = isCityPresent(set, get)(city.fullName);
                    if (!alreadyAdded) {
                        set((state) => {
                            console.log({ state })
                            return { cities: [createCity(city), ...(state.cities)] }
                        })
                    }
                },
                deleteCity: (fullName: string) => {
                    set((state) => ({
                        cities: state.cities.filter((city) => city.fullName !== fullName),
                    }));
                },
                updateCityLastTemperature: (id, newTemperature) => {
                    return set((state) => ({
                        cities: state.cities.map((city) =>
                            city.id === id ? { ...city, lastTemperature: newTemperature } : city
                        ),
                    }));
                },
                isCityPresent: isCityPresent(set, get),
            }
        },
        {
            name: storeName,
            onRehydrateStorage
        },
    )
));

export const useDefaultCityStore = generateCityStore({
    storeName: "default-cities",
});
export const useFavouriteCityStore = generateCityStore({
    storeName: "favourite-cities"
});