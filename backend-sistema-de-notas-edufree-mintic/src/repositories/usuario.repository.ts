import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Grupo, UsarioGrupo, Rol} from '../models';
import {UsarioGrupoRepository} from './usario-grupo.repository';
import {GrupoRepository} from './grupo.repository';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          UsarioGrupo,
          typeof Usuario.prototype.id
        >;

  public readonly rol: HasOneRepositoryFactory<Rol, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource, @repository.getter('UsarioGrupoRepository') protected usarioGrupoRepositoryGetter: Getter<UsarioGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.rol = this.createHasOneRepositoryFactoryFor('rol', rolRepositoryGetter);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, usarioGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
