export function wrapReducer(reducer) {
  return (state, action) => {
    if (action.type === undefined) {
      throw new Error(`Got undefined action type in ${reducer.name}`);
    }
    return reducer(state, action);
  };
}
