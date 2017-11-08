import { wrapReducer } from '../redux-utils';

describe('redux utils', () => {
  describe('wrapReducer', () => {
    it('throws when given undefined action type', () => {
      const reducer = wrapReducer((_state, _action) => {});
      expect(() => reducer(undefined, { type: undefined })).toThrow();
    });
  });
});
