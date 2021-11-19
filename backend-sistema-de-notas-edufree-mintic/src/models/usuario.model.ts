import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {Grupo} from './grupo.model';
import {UsarioGrupo} from './usario-grupo.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Grupo, {through: {model: () => UsarioGrupo, keyFrom: 'idUsuario', keyTo: 'idGrupo'}})
  grupos: Grupo[];

  @hasOne(() => Rol, {keyTo: 'tipoUsuario'})
  rol: Rol;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
