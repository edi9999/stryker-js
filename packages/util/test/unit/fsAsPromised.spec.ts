import * as fs from 'fs';
import { promisify } from 'util';

import { expect } from 'chai';

import { fsAsPromised } from '../../src';

describe('fsAsPromised', () => {
  describePromisifiedFunction('appendFile');
  describePromisifiedFunction('exists');
  describePromisifiedFunction('lstat');
  describePromisifiedFunction('readdir');
  describePromisifiedFunction('readFile');
  describePromisifiedFunction('stat');
  describePromisifiedFunction('symlink');
  describePromisifiedFunction('writeFile');

  describeProxyFunction('existsSync');
  describeProxyFunction('readdirSync');
  describeProxyFunction('createReadStream');
  describeProxyFunction('createWriteStream');

  function describeProxyFunction(fnToTest: keyof typeof fs & keyof typeof fsAsPromised) {
    it(`should proxy ${fnToTest}`, () => {
      // It's difficult to test this any other way. At least this way, we know it is promisified.
      expect(fsAsPromised[fnToTest]).eq(fs[fnToTest]);
    });
  }

  function describePromisifiedFunction(fnToTest: keyof typeof fs & keyof typeof fsAsPromised) {
    it(`should expose promisified ${fnToTest}`, () => {
      // It's difficult to test this any other way. At least this way, we know it is promisified.
      expect(fsAsPromised[fnToTest].toString()).eq(promisify(fs[fnToTest]).toString());
    });
  }
});
