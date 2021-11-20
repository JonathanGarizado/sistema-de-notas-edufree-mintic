import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Grupo, GrupoRelations} from '../models';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {
  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource,
  ) {
    super(Grupo, dataSource);
  }
}
