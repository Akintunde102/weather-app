interface WeatherStackLocationRequest {
    type: string;
    query: string;
    language: string;
    unit: string;
}

interface WeatherStackLocationData {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
}

export interface WeatherStackCurrentWeather {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: "yes" | "no";
}

export interface Weather {
    feelsLike: number;
    pressure: number;
    precipitation: number;
    temperature: number;
    uvIndex: number;
    wind: {
        speed: number;
        dir: string;
        degree: number;
    };
    description: string;
    is_day: string;
    note: string;
    visibility: number;
    humidity: number;
}

interface Location {
    country: string;
    region: string;
    exact: string;
    fullName: string;
    coordinates: string;
}

export interface WeatherDataForDisplay {
    weather: Weather;
    location: Location;
    time: string;
}


export interface WeatherStackApiResponse {
    request: WeatherStackLocationRequest;
    location: WeatherStackLocationData;
    current: WeatherStackCurrentWeather;
}

export const mapWeatherDataForDisplay = (weatherData: WeatherStackApiResponse): WeatherDataForDisplay => {

    const { current, location } = weatherData;

    return {
        weather: {
            feelsLike: current.feelslike,
            pressure: current.pressure,
            precipitation: current.precip,
            temperature: current.temperature,
            uvIndex: current.uv_index,
            wind: {
                speed: current.wind_speed,
                dir: current.wind_dir,
                degree: current.wind_degree,
            },
            description: current.weather_descriptions[0],
            is_day: current.is_day,
            note: `Today, expect a ${current.is_day ? "day" : "night"} with temperatures reaching a maximum of ${current.temperature}°C.`,
            visibility: current.visibility,
            humidity: current.humidity,
        },
        location: {
            country: location.country,
            region: location.region,
            exact: location.name,
            fullName: `${location.name}, ${location.region}, ${location.country}`,
            coordinates: `${location.lat} ${location.lon}`
        },
        time: current.observation_time
    }
}

