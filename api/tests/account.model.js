'use strict'

var assert = require('chai').assert,
    sinon = require('sinon'),
    Account = require('../models/account.model')
require('sinon-mongoose')

describe('Get all accounts', function () {
    it('should return all accounts', function (done) {
        var AccountMock = sinon.mock(Account),
            expectedResult = {
                status: true,
                account: []
            }

        AccountMock.expects('find').yields(null, expectedResult)
        Account.find(function (err, result) {
            AccountMock.verify()
            AccountMock.restore()
            assert.equal(result.status, true)
            assert.lengthOf(result.account, 0)
            setImmediate(done)
        })
    })
})

describe('Create a new account', function () {
    it('should create a new account', function (done) {
        var AccountMock = sinon.mock(Account),
            account = AccountMock.object,
            expectedResult = {status: true}
        AccountMock.expects('create').yields(null, expectedResult)
        account.create(function (err, result) {
            AccountMock.verify()
            AccountMock.restore()
            assert.equal(result.status, true)
            setImmediate(done())
        })
    })
})

describe('Updated a account', function () {
    it('should create and update a account', function (done) {
        var AccountMock = sinon.mock(Account),
            account = AccountMock.object,
            expectedResult = {status: true}
        AccountMock.expects('create').yields(null, expectedResult)
        account.create(function (err, result) {
            AccountMock.verify()
            AccountMock.restore()
            assert.equal(result.status, true)
            setImmediate(done())
        })
    })
})
