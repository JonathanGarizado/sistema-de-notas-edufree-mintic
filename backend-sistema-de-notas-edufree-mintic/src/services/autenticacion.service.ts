import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import {Llaves} from '../config/llaves';
import generador from "password-generator";
import cryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */
  
  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string){
    try {
      let p = this.usuarioRepository.findOne({where:{email: usuario, clave: clave}})
      if(p){
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombres + " " + usuario.apellidos,
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT)
      return datos;
    } catch {
      return false;
    }
  }
}
