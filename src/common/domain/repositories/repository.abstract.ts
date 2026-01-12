import { SearchInput, SearchOutput } from './search'

/**
 * Repositório genérico abstrato
 * @template Entity - Tipo de entidade persistida
 * @template CreateProps - Dados necessários para criar a entidade
 */
export abstract class RepositoryAbstract<Entity, CreateProps> {
  /**
   * Busca por ID
   */
  abstract findById(id: string): Promise<Entity | null>

  /**
   * Cria uma entidade em memória (não persiste)
   */
  abstract newEntity(props: CreateProps): Entity

  /**
   * Persiste uma entidade
   */
  abstract save(entity: Entity): Promise<Entity>

  /**
   * Remove uma entidade
   */
  abstract delete(entity: Entity): Promise<void>

  /**
   * Busca entidades paginadas
   */
  abstract search(params: SearchInput): Promise<SearchOutput<Entity>>
}
