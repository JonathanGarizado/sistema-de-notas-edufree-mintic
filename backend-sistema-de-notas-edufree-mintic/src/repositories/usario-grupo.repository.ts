import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {UsarioGrupo, UsarioGrupoRelations, Nota} from '../models';
import {NotaRepository} from './nota.repository';

export class UsarioGrupoRepository extends DefaultCrudRepository<
  UsarioGrupo,
  typeof UsarioGrupo.prototype.id,
  UsarioGrupoRelations
> {

  public readonly notas: HasManyRepositoryFactory<Nota, typeof UsarioGrupo.prototype.id>;

  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource, @repository.getter('NotaRepository') protected notaRepositoryGetter: Getter<NotaRepository>,
  ) {
    super(UsarioGrupo, dataSource);
    this.notas = this.createHasManyRepositoryFactoryFor('notas', notaRepositoryGetter,);
    this.registerInclusionResolver('notas', this.notas.inclusionResolver);
  }
}
