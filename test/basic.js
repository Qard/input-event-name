import {mouse,key,any} from '../dist'
import should from 'should'

// TODO: Figure out why event constructors don't work in karma. :S
describe('basic', () => {

  it('should include key name', () => {
    key({
      charCode: 'a'.charCodeAt(0)
    }).should.equal('a')
  })

  // Test inclusion of state flags
  let states = ['shift','alt','ctrl']
  states.forEach((state) => {
    it(`should include ${state} key state`, () => {
      key({
        charCode: 'a'.charCodeAt(0),
        [`${state}Key`]: true
      }).should.equal(`${state}+a`)
    })
  })

  // This corresponds to event.buttons
  let BUTTONS = {
    LEFT: 1,
    RIGHT: 2,
    MIDDLE: 4,
    BACK: 8,
    FORWARD: 16
  }
  Object.keys(BUTTONS).forEach((button) => {
    let name = button.toLowerCase()
    it(`should indentify ${name} from multi-button state`, () => {
      mouse({
        buttons: BUTTONS[button]
      }).should.equal(name)
    })
  })

  // This corresponds to event.button
  let BUTTON_NAMES = [
    'left',
    'middle',
    'right',
    'back',
    'forward'
  ]
  BUTTON_NAMES.forEach((button, index) => {
    it(`should identify ${button} from single-button state`, () => {
      mouse({
        button: index
      }).should.equal(button)
    })
  })

  it('should include multiple buttons', () => {
    mouse({
      buttons: BUTTONS.BACK + BUTTONS.FORWARD
    }).should.equal('back+forward')
  })

  it('should differentiate "any" events', () => {
    any({
      buttons: BUTTONS.LEFT
    }).should.equal('mouse:left')

    any({
      charCode: 'a'.charCodeAt(0),
      // Hack to make this look like a real KeyboardEvent instance
      keyIdentifier: ''
    }).should.equal('key:a')
  })

})
