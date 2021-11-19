import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Nota, NotaRelations} from '../models';

export class NotaRepository extends DefaultCrudRepository<
  Nota,
  typeof Nota.prototype.id,
  NotaRelations
> {
  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource,
  ) {
    super(Nota, dataSource);
  }
}
