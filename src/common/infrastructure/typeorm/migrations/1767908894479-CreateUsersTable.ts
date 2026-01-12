import { MigrationInterface, QueryRunner, Table } from 'typeorm'

import { uuidColumn, varcharColumn } from '../migration-helpers/columns.helper'
import { ensurePgCryptoExtension } from '../migration-helpers/extensions.helper'
import { createForeignKey } from '../migration-helpers/foreign-key.helper'

import { baseColumns } from '../migration-helpers/base-columns.helper'
import { createIndex } from '../migration-helpers/index.helper'

export class CreateUsersTable1767908894479 implements MigrationInterface {
  private readonly tableName = 'users'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await ensurePgCryptoExtension(queryRunner)

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          uuidColumn(), // id
          varcharColumn('first_name'),
          varcharColumn('last_name'),
          varcharColumn('email', 150, { isUnique: true }),
          uuidColumn('situation_id'), // FK
          ...baseColumns(), // auditoria
        ],
        indices: [
          createIndex({
            name: 'IDX_USERS_EMAIL',
            columns: ['email'],
            unique: true,
          }),
          createIndex({
            name: 'IDX_USERS_SITUATION',
            columns: ['situation_id'],
            unique: true,
          }),
        ],
      }),
    )

    await queryRunner.createForeignKey(
      this.tableName,
      createForeignKey({
        name: 'FK_USERS_SITUATION',
        column: 'situation_id',
        referencedTable: 'situations',
        onDelete: 'RESTRICT',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName)
    const foreignKey = table?.foreignKeys.find(
      fk => fk.name === 'FK_USERS_SITUATION',
    )

    if (foreignKey) {
      await queryRunner.dropForeignKey(this.tableName, foreignKey)
    }

    await queryRunner.dropTable(this.tableName)
  }
}
