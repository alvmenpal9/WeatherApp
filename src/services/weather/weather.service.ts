import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { WeatherLookupDto } from 'src/dto/weather_lookup.dto';
import { Weather } from 'src/interfaces/weather.interface';

@Injectable()
export class WeatherService {
    constructor(private readonly httpService: HttpService) { }

    async getWeather(weatherDto: WeatherLookupDto):Promise<Weather>{
        const { city, country } = weatherDto;
        try {
            const fetchGeocoding = await firstValueFrom(
                this.httpService.get(`https://api.geoapify.com/v1/geocode/search?city=${city}&country=${country}&apiKey=${process.env.API_KEY_GEOCODING}`)
            );

            const lon:number = fetchGeocoding?.data?.features[0]?.properties?.lon;
            const lat:number = fetchGeocoding?.data?.features[0]?.properties?.lat;

            const getCurrentWeather = await firstValueFrom(
                this.httpService.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY_WEATHER}&q=${lat},${lon}&aqi=no`)
            );

            if (getCurrentWeather.status === 200) {
                const result: Weather = {
                    location: {
                        city: getCurrentWeather?.data?.location?.name,
                        state: getCurrentWeather?.data?.location?.region,
                        country: getCurrentWeather?.data?.location?.country
                    },
                    temperature: {
                        temp_c: getCurrentWeather?.data?.current?.temp_c,
                        temp_f: getCurrentWeather?.data?.current?.temp_f,
                        condition: getCurrentWeather?.data?.current?.condition?.text,
                    },
                    current: {
                        wind: getCurrentWeather?.data?.current?.wind_kph,
                        wind_direction: getCurrentWeather?.data?.current?.wind_dir,
                        humidity: getCurrentWeather?.data?.current?.humidity,
                        feels_like: getCurrentWeather?.data?.current?.feelslike_c,
                    }
                }

                return result;
            }

        } catch (error) {
            if (error?.response?.status === 401) throw new HttpException(`Could not retrieve data`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
