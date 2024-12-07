import { UserRepository } from '@src/db/user.repository';

const DbProvider = {
  UserRepository,
};

const DbProviders = Object.values(DbProvider);

export { DbProvider, DbProviders };
