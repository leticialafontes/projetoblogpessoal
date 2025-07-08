import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';// essa importação tem que ser feita a mão, no caso estamos pedindo para que importe tudo "*" do bcrypt 

@Injectable()
export class Bcrypt{
    async criptografarSenha(senha: string): Promise<string>{
        let saltos: number = 10; //normalmente se coloca de 10 a 12 saltos, se colocar mais o sistema acaba demorando e pode acabar dando erro, ou o usuario achar que deu erro e dando f5 e caindo no mesmo loop
        return await bcrypt.hash(senha, saltos)
    }
    async compararSenhas(senhaDigitada: string, senhaBanco: string): Promise<boolean>{
        return await bcrypt.compare(senhaDigitada, senhaBanco);  // nesse caso, estamos colocando tudo o que queremos usar no bcrypt dentro desse injectable que é do nest, assim não precisamos importar em todas os lugares que usaremos, pois ele vai ficar como herança para outros locais.
    }
}