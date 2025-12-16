export abstract class AuditLogsRepository {
  abstract findById(id: string): Promise<any>;
}
