javascript: (async () => {
  const authResponse = await fetch(
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=<API_KEY>',
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: '<EMAIL>',
        password: '<PASSWORD>',
        returnSecureToken: true,
      }),
    },
  );
  const {idToken} = await authResponse.json();
  fetch(
    'https://firestore.googleapis.com/v1/projects/<PROJECT_ID>/databases/(default)/documents/notes',
    {
      method: 'post',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          content: {stringValue: window.location.href},
          createdAt: {timestampValue: new Date()},
          hidden: {booleanValue: false},
        },
      }),
    },
  );
})();
