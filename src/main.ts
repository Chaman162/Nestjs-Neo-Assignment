import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './product/product.exception';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import { ResponseInterceptor } from './response/response.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  logger: WinstonModule.createLogger({
    transports: [
      new transports.File({
        filename: `logs/error.log`,
        level: 'error',
        format: format.combine(format.timestamp(), format.json())
      }),
      new transports.File({
        filename: `logs/combined.log`,
        format: format.combine(format.timestamp(), format.json()),
      }),
      new transports.Console({
        format: format.combine(
          format.cli(),
          format.splat(),
          format.timestamp(),
          format.colorize({ all: true }),
          format.printf((info) => {
            console.log("1111111111111", `${info.level}`)
            return `${info.level}: ${info.message}`;
            //  ${info.timestamp}
          }),
        ),
      }),
    ],
  })

  // Configure API docs using Swagger.
  const docsConfig = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('The documentation of Products API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('api', app, document);

  // Set validation pipe for entire app.
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Configure app host and port.
  const host = process.env.HOST;
  const port = process.env.PORT;

  await app.listen(port, host);
  console.log(`App run successfully at ${await app.getUrl()}.`);
}
bootstrap();
