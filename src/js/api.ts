import { Note } from 'App/types.ts';
import { db } from 'App/db.ts';
import { id, tx } from '@instantdb/react';

export const authRequired = true;

export async function createNote(content: string) {
  const newId = id();
  try {
    await db.transact([
      tx.notes[newId].update({
        content,
        created_at: new Date().toISOString(),
        hidden: false,
      }),
    ]);
    if (content.match(/^https?:\/\//)) {
      const response = await fetch(
        `https://get-title.deno.dev/?url=${content}`,
      );
      if (!response.ok) {
        return;
      }
      const { title } = await response.json();
      if (title) {
        db.transact([
          tx.notes[newId].update({
            content: `${content} ${title}`,
          }),
        ]);
      }
    }
  } catch (e) {}
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
