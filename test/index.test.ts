import { framus } from '../src'

const afterNextFrame = (callback: (now: DOMHighResTimeStamp) => void) =>
  window.requestAnimationFrame(now => window.setTimeout(() => callback(now)))

describe('framus', () => {
  const callback = jest.fn()
  const handleError = jest.fn()

  afterEach(() => {
    callback.mockClear()
    handleError.mockClear()
  })

  it('should request an animation frame', done => {
    framus().then(callback).catch(handleError)

    afterNextFrame(now => {
      const [[ arg ]] = callback.mock.calls

      expect(callback).toHaveBeenCalled()
      expect(arg).toBeLessThan(now)
      expect(handleError).not.toHaveBeenCalled()
      done()
    })
  })

  it('should accept a callback', done => {
    callback.mockImplementation(now => now * 2)

    framus(callback).then(value => {
      const [[ arg ]] = callback.mock.calls

      expect(callback).toHaveBeenCalled()
      expect(value).toBe(arg * 2)
      done()
    }).catch(handleError)
  })

  it('should cancel an animation frame', done => {
    const controller = new AbortController()

    framus({
      signal: controller.signal
    }).then(callback).catch(handleError)

    controller.abort()

    afterNextFrame(() => {
      expect(callback).not.toHaveBeenCalled()
      expect(handleError).toHaveBeenCalled()
      done()
    })
  })

  it('should accept a callback and an options object', done => {
    const signal = new AbortController().signal
    const addEventListenerSpy = jest.spyOn(signal, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(signal, 'removeEventListener')

    framus(() => {
      expect(removeEventListenerSpy).toHaveBeenCalled()
      done()
    }, { signal }).catch(handleError)

    expect(addEventListenerSpy).toHaveBeenCalled()
  })
})
