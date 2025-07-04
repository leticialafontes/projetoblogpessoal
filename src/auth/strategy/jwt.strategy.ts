import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,// aqui se o ignore estiver como true, o que aconteceria é, a pessoa quer acessar, o token dela esta desatualizado, mas mesmo assim ela vai passar, então é por isso que o ignore tem que esta como false, para ela ter que fazer o login novamente 
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any){
        return payload;
    }
}