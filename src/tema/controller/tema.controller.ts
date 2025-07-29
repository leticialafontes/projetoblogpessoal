import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller("/tema")
@ApiBearerAuth()
export class TemaController {
    constructor(private readonly temaService: TemaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    FINDaLL(): Promise<Tema[]>{
        return this.temaService.findAll()
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id);
    }

    @Get("/descricao/:descricao")
    @HttpCode(HttpStatus.OK)
    findBydescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findAllByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() tema: Tema):Promise<Tema>{
        return this.temaService.create(tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    updatre(@Body() tema: Tema): Promise<Tema>{
        return this.temaService.update(tema);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.temaService.delete(id);
    }

}