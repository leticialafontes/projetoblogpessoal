import { UsuarioLogin } from './../entities/usuariologin.entity';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';

@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){}

    async validateUser(username: string, password: string): Promise<any>{
        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if(!buscaUsuario)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)
        
        const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)

        if(buscaUsuario && matchPassword){
            const {senha, ...resposta } = buscaUsuario
            return resposta
        }
        return null
    }

    async login(usuarioLogin: UsuarioLogin){
        const payload = { sub: usuarioLogin.usuario}
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        return{
            id: buscaUsuario?.id,//aqui ele fala pode até ser nulo, mas se existe usuario, se existir, então puxa ele, tambem funciona se puxasse o if(!buscarUsuario)... que ele iria validar e depois trazer o resultado
            nome: buscaUsuario?.nome,
            usuario: usuarioLogin.usuario,
            senha:'',
            foto: buscaUsuario?.foto,
            token:`Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}