import admin from 'firebase-admin';
import fetch from 'node-fetch';

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_CREDENTIALS),
  ),
  databaseURL: 'https://qdsndc.firebaseio.com',
});

const db = admin.firestore();
const query = db.collection('notes');

let initialized = false;
query.onSnapshot(
  (querySnapshot) => {
    if (!initialized) {
      initialized = true;
      console.log('initialized');
      return;
    }

    querySnapshot.docChanges().forEach((change) => {
      if (change.type != 'added') return;
      (async () => {
        const {id} = change.doc;
        const content = change.doc.get('content');
        const title = await extractTitleFromContent(content);
        if (title) {
          query.doc(id).update({
            content: `${title}\n${content}`,
          });
        }
      })();
    });
  },
  (err) => {
    console.error(err);
  },
);

async function extractTitleFromContent(
  content: string,
): Promise<string | undefined> {
  try {
    const match = content.match(/youtu\.be.*?(?:\?|&)v=(.*?)(?:&|$)/);
    if (match && match[1]) {
      const id = match[1];
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items%2Fsnippet%2Ftitle&key=${process.env.YOUTUBE_API_KEY}`,
      );
      const json = await response.json();
      const {title} = json.items[0].snippet;
      console.log(title);
      return title;
    }
    console.log('Not a youtube link.');
  } catch (err) {
    console.error(err);
  }
}
