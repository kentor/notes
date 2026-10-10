import type { Note } from 'App/types.ts';
import { db } from 'App/db.ts';
import { id } from '@instantdb/react';

export const authRequired = true;

export async function createNote(content: string) {
  const newId = id();
  try {
    await db.transact([
      db.tx.notes[newId].update({
        content,
        created_at: new Date().toISOString(),
        hidden: false,
      }),
    ]);
    if (content.match(/^https?:\/\//)) {
      const response = await fetch(
        `https://get-title.dirtybit.dev/?url=${content}`,
      );
      if (!response.ok) {
        return;
      }
      const { title } = await response.json();
      if (title) {
        db.transact([
          db.tx.notes[newId].update({
            content: `${content} ${title}`,
          }),
        ]);
      }
    }
  } catch (e) {}
}

export function updateNote(id: string, updates: Pick<Note, 'hidden'>) {
  db.transact([db.tx.notes[id].update(updates)]);
}

export function deleteNote(id: string) {
  db.transact([db.tx.notes[id].delete()]);
}

export function logout() {
  db.auth.signOut();
}
