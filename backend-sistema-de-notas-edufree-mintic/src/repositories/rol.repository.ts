import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DataEdufreeDataSource} from '../datasources';
import {Rol, RolRelations} from '../models';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {
  constructor(
    @inject('datasources.DataEdufree') dataSource: DataEdufreeDataSource,
  ) {
    super(Rol, dataSource);
  }
}
