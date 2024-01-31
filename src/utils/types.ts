import { City } from "@/store/cities";

export type HydratedCity = City & { temperature: string };
