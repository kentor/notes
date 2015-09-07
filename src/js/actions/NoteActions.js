export const ADD_SUCCESS = Symbol();
export const DESTROY_SUCCESS = Symbol();
export const FETCH_SUCCESS = Symbol();
export const HYDRATE = Symbol();
export const TOGGLE_LOCAL_HIDDEN = Symbol();
export const UPDATE_SUCCESS = Symbol();

export function hydrate() {
  return {
    type: HYDRATE,
    payload: JSON.parse(localStorage.getItem('notes')),
  };
}

export function toggleLocalHidden(note) {
  return {
    type: TOGGLE_LOCAL_HIDDEN,
    payload: note,
  };
}
