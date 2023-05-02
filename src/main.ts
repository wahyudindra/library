import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }),
    );

    const options = new DocumentBuilder().setTitle('Library').setVersion('1.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 4000;

    await app.listen(port as number, host);
    console.log(`Server running on ${host}:${port}`);
}
bootstrap();
