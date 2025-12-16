#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const moduleName = process.argv[2];
if (!moduleName) {
    console.error('❌ Please provide a module name. Example:\n  npm run generate:module orders');
    process.exit(1);
}
const basePath = path.join('src', 'modules', moduleName);
const structure = [
    path.join(basePath, 'application', 'dto'),
    path.join(basePath, 'application', 'use-cases'),
    path.join(basePath, 'application', 'mappers'),
    path.join(basePath, 'domain', 'entities'),
    path.join(basePath, 'domain', 'repositories'),
    path.join(basePath, 'infrastructure', 'adapters', 'http'),
    path.join(basePath, 'infrastructure', 'adapters', 'persistence'),
    path.join(basePath, 'infrastructure', 'entities'),
    path.join(basePath, 'infrastructure', 'providers'),
];
function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
}
function createFile(filePath, content) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
}
structure.forEach(createFolder);
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const ModuleClass = `${capitalize(moduleName)}Module`;
const EntityClass = capitalize(moduleName);
const RepositoryInterface = `${EntityClass}Repository`;
const RepositoryToken = `${EntityClass}RepositoryToken`;
const RepositoryImplClass = `${EntityClass}RepositoryImpl`;
const ControllerClass = `${EntityClass}Controller`;
createFile(path.join(basePath, `${moduleName}.module.ts`), `import { Module } from '@nestjs/common';
import { ${ControllerClass} } from './infrastructure/adapters/http/${moduleName}.controller';
import { ${RepositoryImplClass} } from './infrastructure/adapters/persistence/${moduleName}.repository.impl';

@Module({
  controllers: [${ControllerClass}],
  providers: [
    ${RepositoryImplClass},
    {
      provide: '${RepositoryToken}',
      useClass: ${RepositoryImplClass},
    },
  ],
  exports: ['${RepositoryToken}'],
})
export class ${ModuleClass} {}
`);
createFile(path.join(basePath, 'domain', 'repositories', `${moduleName}.repository.ts`), `export abstract class ${RepositoryInterface} {
  abstract findById(id: string): Promise<any>;
}
`);
createFile(path.join(basePath, 'domain', 'entities', `${moduleName}.entity.ts`), `export class ${EntityClass} {
  id!: string;
  // add domain properties here
}
`);
createFile(path.join(basePath, 'infrastructure', 'adapters', 'http', `${moduleName}.controller.ts`), `import { Controller, Get, Param, Inject } from '@nestjs/common';

@Controller('${moduleName}')
export class ${ControllerClass} {
  constructor(
    @Inject('${RepositoryToken}') private readonly repo: any,
  ) {}

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const result = await this.repo.findById(id);
    return result;
  }
}
`);
createFile(path.join(basePath, 'infrastructure', 'adapters', 'persistence', `${moduleName}.repository.impl.ts`), `import { Injectable } from '@nestjs/common';
import { ${RepositoryInterface} } from '../../../domain/repositories/${moduleName}.repository';

@Injectable()
export class ${RepositoryImplClass} implements ${RepositoryInterface} {
  // Implementation returns a Promise via explicit constructor to avoid certain TS overload issues.
  findById(id: string): Promise<any> {
    // TODO: Replace with real DB call (e.g., Prisma/TypeORM)
    return new Promise((resolve) => {
      resolve({ id });
    });
  }
}
`);
console.log(`\n✨ Hexagonal module created: ${moduleName}`);
console.log(`Paths created under: ${basePath}\n`);
//# sourceMappingURL=generate-module.js.map