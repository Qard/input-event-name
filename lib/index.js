let BUTTONS = {
  LEFT: 1,
  RIGHT: 2,
  MIDDLE: 4,
  BACK: 8,
  FORWARD: 16
}

function hasButton (code, value) {
  return (value | code) === value
}

function modifiers (ev) {
  let names = []
  if (ev.ctrlKey) names.push('ctrl')
  if (ev.altKey) names.push('alt')
  if (ev.shiftKey) names.push('shift')
  if (ev.metaKey) names.push('meta')
  return names
}

export function mouse (ev) {
  let b = ev.buttons
  let names = modifiers(ev)

  for (let name in BUTTONS) {
    if ((b | BUTTONS[name]) === b) {
      names.push(name.toLowerCase())
    }
  }

  return names.join('+')
}

export function key (ev) {
  let names = modifiers(ev)

  if (typeof ev.charCode !== 'undefined') {
    names.push(String.fromCharCode(ev.charCode))
  }

  return names.join('+')
}

export function any (ev) {
  if (typeof ev.buttons !== 'undefined') return `mouse:${mouse(ev)}`
  if (typeof ev.keyIdentifier !== 'undefined') return `key:${key(ev)}`
  return false
}
