import * as t from 'io-ts';

export const NoteExtractor = t.type({
  content: t.string,
  createdAt: t.string, // TODO: ISOString?
  hidden: t.boolean,
  id: t.string,
});

export type Note = t.TypeOf<typeof NoteExtractor>;

export const StateShapeExtractor = t.type({
  notes: t.type({
    items: t.record(t.string, NoteExtractor),
    loaded: t.boolean,
  }),
  session: t.unknown,
});

export type StateShape = t.TypeOf<typeof StateShapeExtractor>;

type InitAction = {
  type: 'Init';
};

type SessionLoggedInAction = {
  type: 'SessionLoggedIn';
  payload: unknown;
};

type SessionLoggedoutAction = {
  type: 'SessionLoggedOut';
};

type NoteListFetchedAction = {
  type: 'NoteListFetched';
  payload: Array<Note>;
};

type NoteRetrievedAction = {
  type: 'NoteRetrieved';
  payload: Note;
};

export type NoteDeletedAction = {type: 'NoteDeleted'; payload: Note};

export type AllActions =
  | InitAction
  | SessionLoggedInAction
  | SessionLoggedoutAction
  | NoteListFetchedAction
  | NoteRetrievedAction
  | NoteDeletedAction;
