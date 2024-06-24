# @shelf/babel-config

## Install

```
$ yarn add --dev @shelf/babel-config
```

## Usage

In your `package.json`:

### Backend

```json
{
  "babel": {
    "extends": "@shelf/babel-config/backend"
  }
}
```

### Frontend

React components without browser boilerplate (jsx,tsx) + testing (ts/tsx)

```json
{
  "babel": {
    "extends": "@shelf/babel-config/frontend"
  }
}
```

React components(jsx,tsx) + testing (ts/tsx)

```json
{
  "babel": {
    "extends": "@shelf/babel-config/frontend-component"
  }
}
```

Frontend library (lodash, ts)

```json
{
  "babel": {
    "extends": "@shelf/babel-config/frontend-library"
  }
}
```

Vue.js  configuration

```json
{
  "babel": {
    "extends": "@shelf/babel-config/frontend-vue"
  }
}
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
