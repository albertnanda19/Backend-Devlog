import { Injectable, Inject } from '@nestjs/common';
import { UserRepositoryPort, CreateUserInput, UserRecord } from '../../../application/ports/user.repository.port';
import { PrismaClient } from '../../../../../../generated/prisma/client';

@Injectable()
export class UserPrismaRepository implements UserRepositoryPort {
  constructor(
    @Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient,
  ) {}

  async findByEmail(email: string): Promise<UserRecord | null> {
    const row = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!row) return null;
    return {
      id: (row as any).id,
      email: (row as any).email,
      password_hash: (row as any).passwordHash,
      role_id: (row as any).roleId,
      full_name: (row as any).fullName ?? null,
      is_active: (row as any).isActive,
      created_at: (row as any).createdAt,
      updated_at: (row as any).updatedAt,
    };
  }

  async createUser(data: CreateUserInput): Promise<UserRecord> {
    const row = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.password_hash,
        roleId: data.role_id,
        fullName: data.full_name ?? null,
      },
    });
    return {
      id: (row as any).id,
      email: (row as any).email,
      password_hash: (row as any).passwordHash,
      role_id: (row as any).roleId,
      full_name: (row as any).fullName ?? null,
      is_active: (row as any).isActive,
      created_at: (row as any).createdAt,
      updated_at: (row as any).updatedAt,
    };
  }

  async getDefaultRoleId(): Promise<string> {
    // Try from env first
    const fromEnv = process.env.DEFAULT_ROLE_ID;
    if (fromEnv) return fromEnv;

    // Find role named 'USER', create if not exists
    const existing = await this.prisma.role.findUnique({
      where: { name: 'USER' },
    });
    if (existing) return (existing as any).id as string;

    const created = await this.prisma.role.create({
      data: {
        name: 'USER',
        description: 'Default application role',
      },
    });
    return (created as any).id as string;
  }
}


