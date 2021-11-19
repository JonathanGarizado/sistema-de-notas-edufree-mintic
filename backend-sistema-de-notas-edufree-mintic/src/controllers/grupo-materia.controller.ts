import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Grupo,
  Materia,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoMateriaController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/materias', {
    responses: {
      '200': {
        description: 'Array of Grupo has many Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Materia>,
  ): Promise<Materia[]> {
    return this.grupoRepository.materias(id).find(filter);
  }

  @post('/grupos/{id}/materias', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Materia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateriaInGrupo',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) materia: Omit<Materia, 'id'>,
  ): Promise<Materia> {
    return this.grupoRepository.materias(id).create(materia);
  }

  @patch('/grupos/{id}/materias', {
    responses: {
      '200': {
        description: 'Grupo.Materia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Partial<Materia>,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.grupoRepository.materias(id).patch(materia, where);
  }

  @del('/grupos/{id}/materias', {
    responses: {
      '200': {
        description: 'Grupo.Materia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.grupoRepository.materias(id).delete(where);
  }
}
