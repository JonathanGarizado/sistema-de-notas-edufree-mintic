import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {ProgramaAcademico, ProgramaAcademicoRelations, Materia} from '../models';
import {MateriaRepository} from './materia.repository';

export class ProgramaAcademicoRepository extends DefaultCrudRepository<
  ProgramaAcademico,
  typeof ProgramaAcademico.prototype.id,
  ProgramaAcademicoRelations
> {

  public readonly materias: HasManyRepositoryFactory<Materia, typeof ProgramaAcademico.prototype.id>;

  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(ProgramaAcademico, dataSource);
    this.materias = this.createHasManyRepositoryFactoryFor('materias', materiaRepositoryGetter,);
    this.registerInclusionResolver('materias', this.materias.inclusionResolver);
  }
}
