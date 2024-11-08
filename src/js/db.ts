import { init } from '@instantdb/react';
import type { Note } from 'App/types.ts';

const APP_ID = 'd7dd3078-9350-4e3e-8c73-d66416b6ca46';

export const db = init<{ notes: Note }>({ appId: APP_ID });
