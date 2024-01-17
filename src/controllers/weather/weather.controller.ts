import { Body, Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { WeatherLookupDto } from 'src/dto/weather_lookup.dto';
import { WeatherService } from 'src/services/weather/weather.service';

@Controller('weather')
export class WeatherController {

    constructor(private weatherService:WeatherService){}

    @Get()
    @UsePipes(ValidationPipe)
    getCurrentWeather(@Query() weatherDto:WeatherLookupDto){
        return this.weatherService.getWeather(weatherDto);
    }

}
