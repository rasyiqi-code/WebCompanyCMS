# plugin-emotion-cache

Inject [emotion cache](https://emotion.sh/docs/@emotion/cache) into the CredBuild iframe.

## Quick start

```sh
npm i @credbuild/plugin-emotion-cache
```

```jsx
import { CredBuild } from "@credbuild/core";
import createEmotionCache from "@credbuild/plugin-emotion-cache";

// Create your emotion cache plugin. This example configures it for Chakra.
const chakraEmotionCache = createEmotionCache("cha");

// Render CredBuild
export function Page() {
  return <CredBuild config={config} data={data} plugins={[chakraEmotionCache]} />;
}
```

## Args

| Param         | Example | Type   | Status   |
| ------------- | ------- | ------ | -------- |
| [`key`](#key) | `cha`   | String | Required |

### Required args

#### `key`

Key to pass to Emotion's [`createCache` method](https://emotion.sh/docs/@emotion/cache#createcache).

## License

MIT © [The CredBuild Contributors](https://github.com/credbuild/credbuild/graphs/contributors)
