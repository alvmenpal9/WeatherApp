import { IsNotEmpty } from "class-validator";

export class WeatherLookupDto{
    @IsNotEmpty({message:'City cannot be empty'})
    city: string;

    @IsNotEmpty({message: 'Country cannot be empty'})
    country: string;
}