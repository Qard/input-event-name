# input-event-name

This is a helper to transform MouseEvent and KeyboardEvent instances to a readable/parseable string. It's useful for event-emitter keys.

## Install

```sh
npm install input-event-name
```

## Usage

```js
el.addEventListener('keydown', function (e) {
  if (eventName.key(e) === 'ctrl+x') {
    // Do a thing when both ctrl and x are pressed
  }
})
```
