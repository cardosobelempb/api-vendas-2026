import { ConflictError, NotFoundError, UUIDVO } from '@/common'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { productBuild } from '../../testing/productBuild'
import { ProductInMemoryRepository } from '../ProductInMemoryRepository'

describe('ProductInmemoryRepository unit tests', () => {
  let sut: ProductInMemoryRepository

  beforeEach(() => {
    sut = new ProductInMemoryRepository()
  })

  describe('findByName', () => {
    it('should throw error when id not found', async () => {
      await sut.findByName('fake_name').catch(err => {
        expect(err).toBeInstanceOf(NotFoundError)
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

  describe('conflictngName', async () => {
    it('should throw error when name product not found', async () => {
      const data = productBuild({
        name: 'Curso nodejs',
      })

      sut['items'].push(data)
      await sut.conflictngName('Curso nodejs').catch(err => {
        expect(err).toBeInstanceOf(ConflictError)
        expect(err.statusCode).toBe(409)
      })
    })

    it('should not find a product by name', async () => {
      expect.assertions(0)
      await sut.conflictngName('Curso nodejs')
    })
  })

  describe('applayFilter', () => {
    it('should no filter when filter param is null', async () => {
      // const result = stubFactory.create(props)
      const data = productBuild({})
      sut['items'].push(data)

      const spyFilterMethod = vi.spyOn(sut['items'], 'filter' as any)

      const result = await sut['applyFilter'](sut['items'])

      expect(spyFilterMethod).not.toHaveBeenCalled()
      expect(result).toStrictEqual(sut['items'])
    })

    it('should filter when filter param', async () => {
      // const result = stubFactory.create(props)
      const items = [
        productBuild({
          id: UUIDVO.create(),
          name: 'Test',
          price: 10,
        }),
        productBuild({
          id: UUIDVO.create(),
          name: 'TEST',
          price: 20,
        }),
        productBuild({
          id: UUIDVO.create(),
          name: 'fake',
          price: 30,
        }),
      ]

      sut['items'].push(...items)

      const spyFilterMethod = vi.spyOn(sut['items'], 'filter' as any)

      let result = await sut['applyFilter'](sut['items'], 'TEST')

      expect(spyFilterMethod).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([items[0], items[1]])
      expect(result).toHaveLength(2)

      result = await sut['applyFilter'](sut['items'], 'test')

      expect(spyFilterMethod).toHaveBeenCalledTimes(2)
      expect(result).toStrictEqual([items[0], items[1]])
      expect(result).toHaveLength(2)

      result = await sut['applyFilter'](sut['items'], 'no-ilter')

      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
      expect(result).toHaveLength(0)
    })
  })
})
