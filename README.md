# framed

Resolves with the high res time stamp of the next animation frame

## Installation

```bash
yarn add framed
```

## Usage

```javascript
import { framed } from 'framed'

;(async () => {
  document.body.textContent = await framed()
})()
 ```

 ## License

 MIT 2019