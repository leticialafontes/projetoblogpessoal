import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: "tb_usuarios"})
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number
    
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    @ApiProperty() 
    nome: string

    @IsEmail() //algumacoisa@algumacoisa, essa ordem em ter um @ identifica que é um email, e assim ele valida
    @Column({length: 255, nullable: false})
    @ApiProperty({example: "email@email.com.br"}) 
    usuario: string

    @MinLength(8) // tamanho minimo é 8 
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    senha: string

    @Column({length: 5000})
    @ApiProperty() 
    foto: string //caminho para acessar a foto, tem que ser acima de 5000

    @ApiProperty() 
    @OneToMany(()=> Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]
}