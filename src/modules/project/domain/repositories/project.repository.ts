export abstract class ProjectRepository {
  abstract findById(id: string): Promise<any>;
}
