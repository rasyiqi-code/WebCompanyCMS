# plugin-heading-analyzer

Visualise your heading outline structure and identify missing heading levels. Respects WCAG 2.

<img src="https://i.imgur.com/POqtgHu.jpg" alt="example" width="156px" />

## Quick start

```sh
npm i @credbuild/plugin-heading-analyzer
```

```jsx
import { CredBuild } from "@credbuild/core";
import headingAnalyzer from "@credbuild/plugin-heading-analyzer";
import "@credbuild/plugin-heading-analyzer/dist/index.css";

...

// Render CredBuild
export function Page() {
  return <CredBuild
    config={config}
    data={data}
    plugins={[
        headingAnalyzer
    ]}
  />;
}
```

## License

MIT © [The CredBuild Contributors](https://github.com/credbuild/credbuild/graphs/contributors)
