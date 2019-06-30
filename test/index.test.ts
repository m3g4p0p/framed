import { framus } from '../src'

describe('framus', () => {
  const handleError = jest.fn()

  afterEach(() => {
    expect(handleError).not.toHaveBeenCalled()
  })

  it('should request an animation frame', done => {
    const fn = jest.fn()

    framus().then(fn).catch(handleError)

    window.requestAnimationFrame((now) => window.setTimeout(() => {
      const [[ arg ]] = fn.mock.calls

      expect(fn).toHaveBeenCalled()
      expect(arg).toBeLessThanOrEqual(now)
      done()
    }))
  })
})
