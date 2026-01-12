import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { baseColumns } from '../migration-helpers/base-columns.helper'
import { uuidColumn, varcharColumn } from '../migration-helpers/columns.helper'
import { ensurePgCryptoExtension } from '../migration-helpers/extensions.helper'

export class CreateSituationsTable1767905850595 implements MigrationInterface {
  private readonly tableName = 'situations'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Garante suporte a UUID
    await ensurePgCryptoExtension(queryRunner)

    // Cria tabela
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          uuidColumn(), // id
          varcharColumn('name', 100), // coluna do domínio
          ...baseColumns(), // created_at, updated_at, deleted_at
        ],
        // indices: [
        //   createIndex({ name: 'IDX_SITUATIONS_NAME', columns: ['name'] }),
        // ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName)
  }
}
