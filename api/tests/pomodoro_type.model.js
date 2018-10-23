'use strict'

var assert = require('chai').assert,
    sinon = require('sinon'),
    PomodoroType = require('../models/pomodoro_type.model')
require('sinon-mongoose')

describe('Get all pomodoro_types', function () {
    it('should return all pomodoro_types', function (done) {
        var PomodoroTypeMock = sinon.mock(PomodoroType),
            expectedResult = {
                status: true,
                pomodoro_type: []
            }

        PomodoroTypeMock.expects('find').yields(null, expectedResult)
        PomodoroType.find(function (err, result) {
            PomodoroTypeMock.verify()
            PomodoroTypeMock.restore()
            assert.equal(result.status, true)
            assert.lengthOf(result.pomodoro_type, 0)
            setImmediate(done)
        })
    })
})

describe('Create a new pomodoro_type', function () {
    it('should create a new pomodoro_type', function (done) {
        var PomodoroTypeMock = sinon.mock(PomodoroType),
            pomodoro_type = PomodoroTypeMock.object,
            expectedResult = {status: true}
        PomodoroTypeMock.expects('create').yields(null, expectedResult)
        pomodoro_type.create(function (err, result) {
            PomodoroTypeMock.verify()
            PomodoroTypeMock.restore()
            assert.equal(result.status, true)
            setImmediate(done())
        })
    })
})

describe('Updated a pomodoro_type', function () {
    it('should create and update a pomodoro_type', function (done) {
        var PomodoroTypeMock = sinon.mock(PomodoroType),
            pomodoro_type = PomodoroTypeMock.object,
            expectedResult = {status: true}
        PomodoroTypeMock.expects('create').yields(null, expectedResult)
        pomodoro_type.create(function (err, result) {
            PomodoroTypeMock.verify()
            PomodoroTypeMock.restore()
            assert.equal(result.status, true)
            setImmediate(done())
        })
    })
})
