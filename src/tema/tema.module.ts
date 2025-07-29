import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaController } from './controller/tema.controller';
import { TemaService } from './services/tema.service';
import { Tema } from './entities/tema.entity';

@Module({
  //importação da modelagem de postagem
  imports: [TypeOrmModule.forFeature([Tema])],
  //importação de controladora que ira liberar os endpoints de acesso
  controllers: [TemaController],
  //importação da service de postagem, que irá passar as regras de pesquisas
  providers: [TemaService],
  exports: [TypeOrmModule],
})
export class TemaModule {}
