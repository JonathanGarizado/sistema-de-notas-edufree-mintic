// Creamos el controlador del modelo usuarioGrupo
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsarioGrupo} from '../models';
import {UsarioGrupoRepository} from '../repositories';

export class UsuarioPorGrupoController {
  constructor(
    @repository(UsarioGrupoRepository)
    public usarioGrupoRepository : UsarioGrupoRepository,
  ) {}

  @post('/usario-grupos')
  @response(200, {
    description: 'UsarioGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsarioGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsarioGrupo, {
            title: 'NewUsarioGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    usarioGrupo: Omit<UsarioGrupo, 'id'>,
  ): Promise<UsarioGrupo> {
    return this.usarioGrupoRepository.create(usarioGrupo);
  }

  @get('/usario-grupos/count')
  @response(200, {
    description: 'UsarioGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsarioGrupo) where?: Where<UsarioGrupo>,
  ): Promise<Count> {
    return this.usarioGrupoRepository.count(where);
  }

  @get('/usario-grupos')
  @response(200, {
    description: 'Array of UsarioGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsarioGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsarioGrupo) filter?: Filter<UsarioGrupo>,
  ): Promise<UsarioGrupo[]> {
    return this.usarioGrupoRepository.find(filter);
  }

  @patch('/usario-grupos')
  @response(200, {
    description: 'UsarioGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsarioGrupo, {partial: true}),
        },
      },
    })
    usarioGrupo: UsarioGrupo,
    @param.where(UsarioGrupo) where?: Where<UsarioGrupo>,
  ): Promise<Count> {
    return this.usarioGrupoRepository.updateAll(usarioGrupo, where);
  }

  @get('/usario-grupos/{id}')
  @response(200, {
    description: 'UsarioGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsarioGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsarioGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<UsarioGrupo>
  ): Promise<UsarioGrupo> {
    return this.usarioGrupoRepository.findById(id, filter);
  }

  @patch('/usario-grupos/{id}')
  @response(204, {
    description: 'UsarioGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsarioGrupo, {partial: true}),
        },
      },
    })
    usarioGrupo: UsarioGrupo,
  ): Promise<void> {
    await this.usarioGrupoRepository.updateById(id, usarioGrupo);
  }

  @put('/usario-grupos/{id}')
  @response(204, {
    description: 'UsarioGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usarioGrupo: UsarioGrupo,
  ): Promise<void> {
    await this.usarioGrupoRepository.replaceById(id, usarioGrupo);
  }

  @del('/usario-grupos/{id}')
  @response(204, {
    description: 'UsarioGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usarioGrupoRepository.deleteById(id);
  }
}
