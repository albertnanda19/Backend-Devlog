export abstract class AuthRepository {
  abstract findById(id: string): Promise<any>;
}
