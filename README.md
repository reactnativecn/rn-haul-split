# react-native-chunk-split

## Getting started

This module works with react native and [haul](https://callstack.github.io/haul/), which use webpack as bundle tools.

Step 1: Init project

```bash
# Create a project. skip if you already have a project
react-native init MyProject --version 0.55.4
cd MyProject

# install and init haul
yarn add -D haul
yarn haul init
```

This will generate `haul.config.js` in your project root.

Step 2: Config babel

Config babel to support "async import" syntax. You can skip this step if you use require.ensure instead.

```bash
# babel 6(rn 0.55-)
yarn add -D babel-plugin-syntax-dynamic-import
# babel 7(rn 0.56+, currently not supported by haul:)
yarn add -D @babel/plugin-syntax-dynamic-import
```

Edit your `.babelrc`:

```javascript
{
  "presets": ["react-native"],
  // Add this line for RN 0.55-:
  "plugins": ["babel-plugin-syntax-dynamic-import"]
  // Add this line for RN 0.56+:
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

Step 3: Install and add ChunkSplit:

```bash
yarn add react-native-chunk-split
react-native link react-native-chunk-split
```

Edit your `haul.config.js`:

```javascript
// Change this line from require("haul"):
const { createWebpackConfig } = require('react-native-chunk-split');

export default {
  webpack: createWebpackConfig(({ platform }) => ({
    entry: `./index.js`,
  })),
};
```

Step 4: Run project

Start haul packager:

```bash
yarn haul
```

Run your app:

```bash
react-native run-ios
# or
react-native run-android
```

Now you can use

## Usage

Read [Webpack guides for code splitting](https://webpack.js.org/guides/code-splitting/#dynamic-imports)

## FAQ:

#### Why `yarn haul init` doesn't create `haul.config.js` ?

Currently, haul doesn't support babel@7, which means it's not compatible with react native 0.56+. Use 0.55.4 instead.

#### Can I split react-native into a vendor chunk?

Nope. Because react-native init bridge with a root view, while only one script can be loaded at this time, you must include BOTH react-native code AND your root component in your entry chunk.

But you can split other libraries that's not used by root component into vendor chunk.

It's good to include only a entry(splash) component in entry chunk, then load any other component with 'await import' syntax.
