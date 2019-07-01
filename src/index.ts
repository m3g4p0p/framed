export interface FramusOptions {
  signal?: AbortSignal
}

export type FramusRequestCallback<T> = (now: DOMHighResTimeStamp) => T

/**
 * Resolves with the time stamp of the next animation frame.
 *
 * Accepts an optional options object which allows passing an abort signal.
 */
export function framus (options?: FramusOptions): Promise<DOMHighResTimeStamp>

/**
 * Calls the callback with the high res time stamp of the next animation
 * frame and resolves with that callback's return value.
 *
 * Accepts an optional options object which allows passing an abort signal.
 */
export function framus<T> (callback: FramusRequestCallback<T>, options?: FramusOptions): Promise<T>

export function framus<T> (
  callbackOrOptions: FramusRequestCallback<T> | FramusOptions = {},
  { signal }: FramusOptions = typeof callbackOrOptions === 'function' ? {} : callbackOrOptions
): Promise<T | DOMHighResTimeStamp> {
  const callback = typeof callbackOrOptions === 'function' ? callbackOrOptions : null

  return new Promise((resolve, reject) => {
    const request = window.requestAnimationFrame(now => {
      if (signal) {
        signal.removeEventListener('abort', handleAbort)
      }

      resolve(callback ? callback(now) : now)
    })

    const handleAbort = () => {
      window.cancelAnimationFrame(request)
      reject(new DOMException('Cancelled animation frame request'))
    }

    if (signal) {
      signal.addEventListener('abort', handleAbort)
    }
  })
}
