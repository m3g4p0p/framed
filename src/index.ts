export interface FramusOptions {
  signal?: AbortSignal
}

export type FramusRequestCallback<T> = (now: DOMHighResTimeStamp) => T

/**
 * Resolves with the high res time stamp of the next animation frame
 */
export const framus = <T = unknown>(
  callback: FramusRequestCallback<T> | FramusOptions = {},
  { signal }: FramusOptions = typeof callback === 'function' ? {} : callback
): Promise<T | DOMHighResTimeStamp> => new Promise((resolve, reject) => {
  const request = window.requestAnimationFrame(now => {
    if (signal) {
      signal.removeEventListener('abort', handleAbort)
    }

    resolve(typeof callback === 'function' ? callback(now) : now)
  })

  const handleAbort = () => {
    window.cancelAnimationFrame(request)
    reject(new DOMException('Cancelled animation frame request'))
  }

  if (signal) {
    signal.addEventListener('abort', handleAbort)
  }
})
