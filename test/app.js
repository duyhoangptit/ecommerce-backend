const { expect } = require('chai')

const app = require('../src/app')

describe('Testing app creation', () => {
    it('App is correctly exported', () => {
        expect(typeof app).to.equal('function')
    })
})