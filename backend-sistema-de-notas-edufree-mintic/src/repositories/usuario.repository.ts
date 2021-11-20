import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Grupo, UsarioGrupo} from '../models';
import {UsarioGrupoRepository} from './usario-grupo.repository';
import {GrupoRepository} from './grupo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          UsarioGrupo,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource, @repository.getter('UsarioGrupoRepository') protected usarioGrupoRepositoryGetter: Getter<UsarioGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(Usuario, dataSource);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, usarioGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
