# 📦 Padrão de Repositórios com Delete Físico e Soft Delete

## 🎯 Objetivo

Este documento define o **padrão oficial de repositórios** do projeto, estabelecendo:

* Separação clara entre **delete físico** e **soft delete**
* Contratos explícitos
* Boas práticas baseadas em **Clean Architecture, DDD e SOLID**
* Prevenção de bugs silenciosos e inconsistências de dados

---

## 🧠 Conceitos Fundamentais

### Repositório

Responsável **exclusivamente** por:

* Persistir
* Recuperar
* Remover entidades

> ❌ Repositórios **não** devem conter regras de negócio.

---

### Delete Físico

Remove o registro **definitivamente** do banco de dados.

✔ Usar quando:

* Dados temporários
* Limpeza de base
* Casos técnicos específicos

⚠️ **Uso consciente e explícito**

---

### Soft Delete

Marca o registro como excluído, **sem removê-lo fisicamente**.

✔ Usar quando:

* Auditoria
* Histórico
* Compliance (LGPD, rastreabilidade)
* Recuperação futura

---

## 🧩 Interface `SoftDeletable`

Entidades que suportam soft delete **devem implementar esta interface**.

```ts
/**
 * Marca uma entidade como apta a soft delete.
 */
export interface SoftDeletable {
  /**
   * Data da exclusão lógica.
   * null = entidade ativa
   */
  deletedAt: Date | null
}
```

### ❌ Anti-padrão

```ts
isDeleted: boolean
```

> ❌ Perde contexto temporal e dificulta auditoria.

---

## 🧱 Repositório Base

Repositório com **delete físico explícito**.

```ts
/**
 * Contrato base de persistência.
 */
export abstract class Repository<TEntity> {

  /**
   * Busca uma entidade pelo ID.
   */
  abstract findById(id: string): Promise<TEntity | null>

  /**
   * Persiste uma entidade (create ou update).
   */
  abstract save(entity: TEntity): Promise<TEntity>

  /**
   * Remove fisicamente a entidade da base.
   *
   * ⚠️ Uso restrito e consciente.
   */
  abstract delete(entity: TEntity): Promise<void>
}
```

---

## 🧱 Repositório com Soft Delete

Extensão explícita para entidades que suportam exclusão lógica.

```ts
/**
 * Repositório com suporte a soft delete.
 */
export abstract class SoftDeleteRepository<
  TEntity extends SoftDeletable
> extends Repository<TEntity> {

  /**
   * Realiza exclusão lógica da entidade.
   */
  async softDelete(entity: TEntity): Promise<void> {
    entity.deletedAt = new Date()
    await this.save(entity)
  }

  /**
   * Restaura uma entidade excluída logicamente.
   */
  async restore(entity: TEntity): Promise<void> {
    entity.deletedAt = null
    await this.save(entity)
  }
}
```

---

## 🔍 Busca e Paginação

Repositórios com busca paginada **devem filtrar registros excluídos**.

```ts
import { SearchInput, SearchOutput } from './search'

/**
 * Repositório com busca paginada e soft delete.
 */
export abstract class SearchableSoftDeleteRepository<
  TEntity extends SoftDeletable
> extends SoftDeleteRepository<TEntity> {

  /**
   * Busca entidades ativas por padrão.
   *
   * ⚠️ Não deve retornar registros com deletedAt != null
   */
  abstract search(
    params: SearchInput
  ): Promise<SearchOutput<TEntity>>
}
```

---

## 🧪 Exemplo Prático

### Entidade

```ts
class User implements SoftDeletable {
  deletedAt: Date | null = null

  constructor(
    public readonly id: string,
    public name: string
  ) {}
}
```

---

### Repositório Concreto

```ts
class UserRepository
  extends SearchableSoftDeleteRepository<User> {

  async findById(id: string): Promise<User | null> {
    // SELECT * FROM users WHERE id = ? AND deletedAt IS NULL
    return null
  }

  async save(user: User): Promise<User> {
    return user
  }

  async delete(user: User): Promise<void> {
    // DELETE FROM users WHERE id = ?
  }

  async search(params: SearchInput) {
    // SELECT * FROM users WHERE deletedAt IS NULL
    return { items: [], total: 0 }
  }
}
```

---

## ❌ Erros Comuns

| Erro                           | Impacto               |
| ------------------------------ | --------------------- |
| `delete()` fazendo soft delete | Bugs silenciosos      |
| Esquecer `deletedAt IS NULL`   | Dados “fantasmas”     |
| Usar `boolean isDeleted`       | Perda de histórico    |
| Soft delete implícito          | Baixa previsibilidade |

---

## 🛡️ Boas Práticas Obrigatórias

* Soft delete **sempre explícito**
* `delete` **sempre físico**
* Queries devem ignorar registros deletados
* Criar índice em `deletedAt`
* Criar testes para exclusão e restauração

---

## ⏱️ Complexidade (Big-O)

| Operação   | Complexidade |
| ---------- | ------------ |
| delete     | O(1)         |
| softDelete | O(1)         |
| restore    | O(1)         |
| search     | O(n)         |

> Com índice em `deletedAt`, impacto mínimo.

---

## 📈 Impacto Arquitetural

| Aspecto        | Benefício    |
| -------------- | ------------ |
| Clareza        | 🔥 Alta      |
| Segurança      | 🔐 Alta      |
| Auditoria      | 📜 Completa  |
| Manutenção     | 📉 Reduzida  |
| Escalabilidade | 📈 Preparada |

---

## 📌 Diretrizes Finais

> 🔴 **Nunca** sobrescrever `delete` para soft delete
> 🟢 **Sempre** documentar o uso de exclusão
> 🟢 **Sempre** escrever testes

---

## 📚 Próximos Passos (Opcional)

* [ ] Template para novos módulos
* [ ] Exemplo com **Prisma**
* [ ] Exemplo com **TypeORM**
* [ ] Testes unitários (Jest)
* [ ] Integração com **NestJS**
* [ ] ADR (Architecture Decision Record)

---

Se quiser, posso:

* Adaptar esta doc para **ADR**
* Criar **diagramas**
* Gerar **checklist de PR**
* Criar **template de repositório**
* Criar **exemplo com ORM real**

É só dizer como deseja evoluir 👍
