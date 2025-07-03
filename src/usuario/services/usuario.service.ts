import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) {}

    async findByUsuario(usuario:string): Promise<Usuario | null>{// antes era usado como undefined, mas agora é usado como null
        return await this.usuarioRepository.findOne({
            where:{
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]>{
        return await this.usuarioRepository.find()
    }

    async findById(id: number): Promise<Usuario>{
        const usuario = await this.usuarioRepository.findOne({
            where:{
                id
            }
        });
        if(!usuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND);
        return usuario;
    }

    async create(usuario:Usuario): Promise<Usuario>{
        const buscaUsuario = await this.findByUsuario(usuario.usuario);
        if(buscaUsuario)
            throw new HttpException('O usuario já existe!', HttpStatus.BAD_REQUEST);
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario>{
        await this.findById(usuario.id);
        const buscaUsuario = await this.findByUsuario(usuario.usuario);
        if(buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('Usuario (e-mail) já cadastrado!', HttpStatus.BAD_REQUEST);
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }

}