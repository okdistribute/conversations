"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Contact_1 = require("../../types/Contact");
describe('Contact', function () {
    describe('getName', function () {
        it('returns displayName if provided', function () {
            var contact = {
                name: {
                    displayName: 'displayName',
                    givenName: 'givenName',
                    familyName: 'familyName',
                },
                organization: 'Somewhere, Inc.',
            };
            var expected = 'displayName';
            var actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns organization if no displayName', function () {
            var contact = {
                name: {
                    givenName: 'givenName',
                    familyName: 'familyName',
                },
                organization: 'Somewhere, Inc.',
            };
            var expected = 'Somewhere, Inc.';
            var actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns givenName + familyName if no displayName or organization', function () {
            var contact = {
                name: {
                    givenName: 'givenName',
                    familyName: 'familyName',
                },
            };
            var expected = 'givenName familyName';
            var actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns just givenName', function () {
            var contact = {
                name: {
                    givenName: 'givenName',
                },
            };
            var expected = 'givenName';
            var actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns just familyName', function () {
            var contact = {
                name: {
                    familyName: 'familyName',
                },
            };
            var expected = 'familyName';
            var actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
    });
});
