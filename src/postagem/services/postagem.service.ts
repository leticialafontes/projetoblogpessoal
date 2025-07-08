import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations:{
                tema: true,
                usuario:true
      }
    });
  }

  async findById(id: number): Promise<Postagem> {
    let postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations:{
                tema: true,
                usuario:true
      }
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),  //a % significa que tanto faz o que tenha antes do que quero pesquisar e tanto faz o que esta depois, o que eu quero é aquela letra/palavra que inseri, aqui o ILike ele não se preocupa se a pessoa digitar com letra maiúscula ou minúscula, já o Like se preocupa.
      },
      relations:{
                tema: true,
                usuario:true
      }
    });
  }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem>{
        await this.findById(postagem.id)
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.postagemRepository.delete(id);
    }

}
