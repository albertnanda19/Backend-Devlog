export abstract class UsersRepository {
  abstract findById(id: string): Promise<any>;
}
