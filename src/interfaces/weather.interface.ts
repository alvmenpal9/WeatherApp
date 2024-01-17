export interface Weather {
    location: Location;
    temperature: Temperature;
    current: Current;
}

export interface Location {
    city: string;
    state: string;
    country: string;
}

export interface Temperature {
    temp_c: number;
    temp_f: number;
    condition: string;
}

export interface Current {
    wind: number;
    wind_direction: string;
    humidity: number;
    feels_like: number;
}
