export abstract class WorklogRepository {
  abstract findById(id: string): Promise<any>;
}
