import {Note} from 'App/types';
import {db} from 'App/db';
import {tx, id} from '@instantdb/react';

export const authRequired = true;

export function createNote(content: string) {
  db.transact([
    tx.notes[id()].update({
      content,
      created_at: new Date().toISOString(),
      hidden: false,
    }),
  ]);
}

export function updateNote(id: string, updates: Pick<Note, 'hidden'>) {
  db.transact([tx.notes[id].update(updates)]);
}

export function deleteNote(id: string) {
  db.transact([tx.notes[id].delete()]);
}

export function logout() {
  db.auth.signOut();
}
