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
  UsarioGrupo,
  Nota,
} from '../models';
import {UsarioGrupoRepository} from '../repositories';

export class UsarioGrupoNotaController {
  constructor(
    @repository(UsarioGrupoRepository) protected usarioGrupoRepository: UsarioGrupoRepository,
  ) { }

  @get('/usario-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'Array of UsarioGrupo has many Nota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Nota)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Nota>,
  ): Promise<Nota[]> {
    return this.usarioGrupoRepository.notas(id).find(filter);
  }

  @post('/usario-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'UsarioGrupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Nota)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UsarioGrupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {
            title: 'NewNotaInUsarioGrupo',
            exclude: ['id'],
            optional: ['usarioGrupoId']
          }),
        },
      },
    }) nota: Omit<Nota, 'id'>,
  ): Promise<Nota> {
    return this.usarioGrupoRepository.notas(id).create(nota);
  }

  @patch('/usario-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'UsarioGrupo.Nota PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Nota, {partial: true}),
        },
      },
    })
    nota: Partial<Nota>,
    @param.query.object('where', getWhereSchemaFor(Nota)) where?: Where<Nota>,
  ): Promise<Count> {
    return this.usarioGrupoRepository.notas(id).patch(nota, where);
  }

  @del('/usario-grupos/{id}/notas', {
    responses: {
      '200': {
        description: 'UsarioGrupo.Nota DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Nota)) where?: Where<Nota>,
  ): Promise<Count> {
    return this.usarioGrupoRepository.notas(id).delete(where);
  }
}
