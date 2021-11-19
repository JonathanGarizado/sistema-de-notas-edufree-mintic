import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Materia, MateriaRelations} from '../models';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.id,
  MateriaRelations
> {
  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource,
  ) {
    super(Materia, dataSource);
  }
}
