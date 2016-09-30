import { wrapReducer } from '../redux-utils';

describe('redux utils', () => {
  describe('wrapReducer', () => {
    it('throws when given undefined action type', () => {
      const reducer = wrapReducer((state, action) => {});
      expect(() => reducer(undefined, { type: undefined })).toThrow();
    });
  });
});
