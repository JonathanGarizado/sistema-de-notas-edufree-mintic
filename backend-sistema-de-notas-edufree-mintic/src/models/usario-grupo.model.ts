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
    type: 'number',
    required: false,
  })
  calificacion: number;

  @hasMany(() => Nota)
  notas: Nota[];

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @property({
    type: 'string',
  })
  grupoId?: string;
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
