import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Grupo, GrupoRelations, Usuario, UsarioGrupo} from '../models';
import {UsarioGrupoRepository} from './usario-grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly grupo: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsarioGrupo,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource, @repository.getter('UsarioGrupoRepository') protected usarioGrupoRepositoryGetter: Getter<UsarioGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Grupo, dataSource);
    this.grupo = this.createHasManyThroughRepositoryFactoryFor('grupo', usuarioRepositoryGetter, usarioGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupo', this.grupo.inclusionResolver);
  }
}
