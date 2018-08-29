"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Contact_1 = require("../../types/Contact");
describe('Contact', () => {
    describe('getName', () => {
        it('returns displayName if provided', () => {
            const contact = {
                name: {
                    displayName: 'displayName',
                    givenName: 'givenName',
                    familyName: 'familyName',
                },
                organization: 'Somewhere, Inc.',
            };
            const expected = 'displayName';
            const actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns organization if no displayName', () => {
            const contact = {
                name: {
                    givenName: 'givenName',
                    familyName: 'familyName',
                },
                organization: 'Somewhere, Inc.',
            };
            const expected = 'Somewhere, Inc.';
            const actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns givenName + familyName if no displayName or organization', () => {
            const contact = {
                name: {
                    givenName: 'givenName',
                    familyName: 'familyName',
                },
            };
            const expected = 'givenName familyName';
            const actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns just givenName', () => {
            const contact = {
                name: {
                    givenName: 'givenName',
                },
            };
            const expected = 'givenName';
            const actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
        it('returns just familyName', () => {
            const contact = {
                name: {
                    familyName: 'familyName',
                },
            };
            const expected = 'familyName';
            const actual = Contact_1.getName(contact);
            chai_1.assert.strictEqual(actual, expected);
        });
    });
});
