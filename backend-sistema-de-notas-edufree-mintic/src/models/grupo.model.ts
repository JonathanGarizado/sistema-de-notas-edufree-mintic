import {Entity, model, property, hasMany} from '@loopback/repository';
import {Materia} from './materia.model';
import {Usuario} from './usuario.model';
import {UsarioGrupo} from './usario-grupo.model';

@model({settings: {strict: false}})
export class Grupo extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @property({
    type: 'string',
  })
  materiaId?: string;

  @hasMany(() => Usuario, {through: {model: () => UsarioGrupo}})
  grupo: Usuario[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
