# framus

Resolves with the high res time stamp of the next animation frame

## Installation

```bash
yarn add framus
```

## Usage

```javascript
import { framus } from 'framus'

;(async () => {
  document.body.textContent = await framus()
})()
 ```

 ## License

 MIT 2019