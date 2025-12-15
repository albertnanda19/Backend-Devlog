import { Injectable } from '@nestjs/common';
import { WorklogRepository } from '../../../domain/repositories/worklog.repository';

@Injectable()
export class WorklogRepositoryImpl implements WorklogRepository {
  // Implementation returns a Promise via explicit constructor to avoid certain TS overload issues.
  findById(id: string): Promise<any> {
    // TODO: Replace with real DB call (e.g., Prisma/TypeORM)
    return new Promise((resolve) => {
      resolve({ id });
    });
  }
}
