import { QueryRunner } from 'typeorm'

/**
 * Garante que a extensão pgcrypto esteja instalada
 * para geração de UUIDs
 */
export const ensurePgCryptoExtension = async (
  queryRunner: QueryRunner,
): Promise<void> => {
  await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`)
}
