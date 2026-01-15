import { ErrorCode, NotFoundError } from '@/common'
import { ProductInMemoryRepository } from '@/products/infrastructure/in-memory-repository'
import { productBuild } from '@/products/infrastructure/testing'

import { beforeEach, describe, expect, it } from 'vitest'

describe('ProductInmemoryRepository unit tests', () => {
  let sut: ProductInMemoryRepository

  beforeEach(() => {
    sut = new ProductInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when id not found', async () => {
      await sut.findByName('fake_name').catch(err => {
        expect(err).toBeInstanceOf(NotFoundError)
        expect(err.path).toBe(`${ErrorCode.NOT_FOUND} fake_name`)
        expect(err.statusCode).toBe(404)
      })
    })

    it('should find a product by name', async () => {
      const data = productBuild({
        name: 'Curso nodejs',
      })
      const product = await sut.save(data)
      const result = await sut.findByName(product.name)
      expect(result).toBeDefined()
      expect(result).toStrictEqual(data)
      expect(result.name).toStrictEqual(data.name)
    })
  })
})
