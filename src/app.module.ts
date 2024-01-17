import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherService } from './services/weather/weather.service';
import { WeatherController } from './controllers/weather/weather.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  controllers: [AppController, WeatherController],
  providers: [AppService, WeatherService],
})
export class AppModule {}
