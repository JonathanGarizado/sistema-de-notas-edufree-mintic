import {Entity, hasMany, model, property} from '@loopback/repository';
import {Materia} from './materia.model';

@model({settings: {strict: false}})
export class ProgramaAcademico extends Entity {
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
  tipoProgramaAcademico: string;

  @property({
    type: 'string',
    required: false,
  })
  imagen: string;

  @hasMany(() => Materia)
  materias: Materia[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProgramaAcademico>) {
    super(data);
  }
}

export interface ProgramaAcademicoRelations {
  // describe navigational properties here
}

export type ProgramaAcademicoWithRelations = ProgramaAcademico & ProgramaAcademicoRelations;
