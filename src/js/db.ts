import { i, init } from '@instantdb/react';

const APP_ID = '06544ad0-a5e9-4cef-b485-63e653c717d6';

const schema = i.schema({
  entities: {
    notes: i.entity({
      content: i.string(),
      created_at: i.string(),
      hidden: i.boolean(),
    }),
  },
});

export const db = init({
  appId: APP_ID,
  apiURI: 'https://api.dirtybit.dev',
  websocketURI: 'wss://api.dirtybit.dev/runtime/session',
  schema,
});
