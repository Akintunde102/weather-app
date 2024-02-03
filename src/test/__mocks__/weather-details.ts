import { WeatherDataForDisplay, WeatherStackApiResponse } from "@/utils/map-weather-data-for-display";

export const MOCK_WEATHER_DATA_FOR_DISPLAY: WeatherDataForDisplay = {
    weather: {
        feelsLike: 24,
        pressure: 1015,
        precipitation: 0,
        temperature: 25,
        uvIndex: 0,
        wind: {
            speed: 10,
            dir: 'N',
            degree: 0,
        },
        description: 'Sunny',
        is_day: 'yes',
        note: '',
        visibility: 10,
        humidity: 50,
    },
    location: {
        country: 'USA',
        region: 'New York',
        exact: 'Queens',
        fullName: 'Queens, New York, USA',
        coordinates: '40.7128,-74.0060',
    },
    time: '2022-02-03 12:00:00',
};

export const MOCK_WEATHER_DATA_FROM_API: WeatherStackApiResponse = {
    request: {
        type: 'City',
        query: 'New York',
        language: 'en',
        unit: 'm',
    },
    location: {
        name: 'New York',
        country: 'United States',
        region: 'New York',
        lat: '40.7128',
        lon: '-74.0060',
        timezone_id: 'America/New_York',
        localtime: '2022-02-04 12:00',
        localtime_epoch: 1643985600,
        utc_offset: '-5.0',
    },
    current: {
        observation_time: '2022-02-04 12:00',
        temperature: 10,
        weather_code: 113,
        weather_icons: ['https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png'],
        weather_descriptions: ['Sunny'],
        wind_speed: 15,
        wind_degree: 180,
        wind_dir: 'S',
        pressure: 1010,
        precip: 0,
        humidity: 50,
        cloudcover: 0,
        feelslike: 8,
        uv_index: 5,
        visibility: 10,
        is_day: 'yes',
    },
}