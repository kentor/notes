import { init } from '@instantdb/react';
import type { Note } from 'App/types.ts';

const APP_ID = '06544ad0-a5e9-4cef-b485-63e653c717d6';

export const db = init<{ notes: Note }>({
  appId: APP_ID,
  apiURI: 'https://api.dirtybit.dev',
  websocketURI: 'wss://api.dirtybit.dev/runtime/session',
});
