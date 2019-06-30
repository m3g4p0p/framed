/**
 * Resolves with the high res time stamp of the next animation frame
 */
export const framus = () => new Promise<DOMHighResTimeStamp>(window.requestAnimationFrame)
