'use strict'

var assert = require('chai').assert,
    sinon = require('sinon'),
    Pomodoro = require('../models/pomodoro.model')
require('sinon-mongoose')

describe('Get all pomodoros', function () {
    it('should return all pomodoros', function (done) {
        var PomodoroMock = sinon.mock(Pomodoro),
            expectedResult = {
                status: true,
                pomodoro: []
            }

        PomodoroMock.expects('find').yields(null, expectedResult)
        Pomodoro.find(function (err, result) {
            PomodoroMock.verify()
            PomodoroMock.restore()
            assert.equal(result.status, true)
            assert.lengthOf(result.pomodoro, 0)
            setImmediate(done)
        })
    })
})

describe('Create a new pomodoro', function () {
    it('should create a new pomodoro', function (done) {
        var PomodoroMock = sinon.mock(Pomodoro),
            pomodoro = PomodoroMock.object,
            expectedResult = {status: true}
        PomodoroMock.expects('create').yields(null, expectedResult)
        pomodoro.create(function (err, result) {
            PomodoroMock.verify()
            PomodoroMock.restore()
            assert.equal(result.status, true)
            setImmediate(done())
        })
    })
})

describe('Updated a pomodoro', function () {
    it('should create and update a pomodoro', function (done) {
        var PomodoroMock = sinon.mock(Pomodoro),
            pomodoro = PomodoroMock.object,
            expectedResult = {status: true}
        PomodoroMock.expects('create').yields(null, expectedResult)
        pomodoro.create(function (err, result) {
            PomodoroMock.verify()
            PomodoroMock.restore()
            assert.equal(result.status, true)
            setImmediate(done())
        })
    })
})
