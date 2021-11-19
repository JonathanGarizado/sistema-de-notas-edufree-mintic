import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Grupo, GrupoRelations, Materia} from '../models';
import {MateriaRepository} from './materia.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly materias: HasManyRepositoryFactory<Materia, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(Grupo, dataSource);
    this.materias = this.createHasManyRepositoryFactoryFor('materias', materiaRepositoryGetter,);
    this.registerInclusionResolver('materias', this.materias.inclusionResolver);
  }
}
