# framus

Promise wrapper for requesting an animation frame.

## Installation

```bash
yarn add framus
```

## Usage

```typescript
function framus(callback?: function, options?: object): Promise
```

### Callback based

```javascript
import { framus } from 'framus'

framus(now => {
  document.body.textContent = now
})
```

### Promise based

```javascript
;(async () => {
  document.body.textContent = await framus()
})()
```

### With abort signal option

```javascript
const controller = new AbortController()

framus({ signal: controller.signal }).catch(console.error)
controller.abort()
```

## License

MIT 2019