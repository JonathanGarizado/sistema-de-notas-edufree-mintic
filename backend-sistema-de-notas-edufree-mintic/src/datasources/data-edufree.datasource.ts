import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'DataEdufree',
  connector: 'mongodb',
  url: 'mongodb://admin:Jhon2330@cluster0-shard-00-00.ejlzt.mongodb.net:27017,cluster0-shard-00-01.ejlzt.mongodb.net:27017,cluster0-shard-00-02.ejlzt.mongodb.net:27017/dataBaseEdufree?ssl=true&replicaSet=atlas-tp5g3n-shard-0&authSource=admin&retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DataEdufreeDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DataEdufree';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.DataEdufree', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
