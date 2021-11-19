import {Entity, model, property, hasMany} from '@loopback/repository';
import {Nota} from './nota.model';

@model({settings: {strict: false}})
export class UsarioGrupo extends Entity {
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
  idGrupo: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @hasMany(() => Nota)
  notas: Nota[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UsarioGrupo>) {
    super(data);
  }
}

export interface UsarioGrupoRelations {
  // describe navigational properties here
}

export type UsarioGrupoWithRelations = UsarioGrupo & UsarioGrupoRelations;
