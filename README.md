[![Build Status](https://travis-ci.org/kentor/notejs-react.svg?branch=master)](https://travis-ci.org/kentor/notejs-react)
[![Dependency
Status](https://david-dm.org/kentor/notejs-react.svg?style=flat)](https://david-dm.org/kentor/notejs-react)

## About
A [Firebase](https://www.firebase.com/) backed [React](https://facebook.github.io/react/) application for storing notes. Intended for a single user only.

<p align="center">
  <img src="http://i.imgur.com/buwmSol.png" />
</p>

## To create your own
- Register a [Firebase](https://www.firebase.com/) account and create an app.
- Fork the project and clone it.
- Run `npm install`.
- In `src/js/appconfig.js` replace the url in `new Firebase('https://qdsndc.firebaseio.com')` with the location of your firebase app.
- If you don't need authentication, set `authRequired` to `false`.
- If you do need authentication, you need to set up simple auth on your firebase app. In your firebase app dashboard, go to "Login & Auth" and then follow their instructions to set up "Authentication Providers".
- In `src/js/appconfig.js` replace the `provider: 'twitter'` with the provider that you had just set up with Firebase.
- In your firebase "Security Rules" tab, set up your security rules to allow a specific user to read/write. An example:

    ```
    {
        "rules": {
            ".read": "auth.uid == 'twitter:12345678'",
            ".write": "auth.uid == 'twitter:12345678'"
        }
    }
    ```

    If you don't know what to put in place of `twitter:12345678`, you can find out by logging in first and then run this in the console: `JSON.parse(localStorage.getItem('user')).uid`.
- Run `npm run watch` to incrementally build the app in development. The app will be available at http://localhost:4069/.

## Deployment
- Make sure to update the CNAME file with the domain of your choice.
- Run `npm run deploy` to build and deploy. Deployment will push to the `gh-pages` branch of your repo with the contents of the built application.

## Bookmarklet
The [bookmarklet](bookmarklet.js) can be used to post a note whose content is `window.location.href`, the url of the page you're viewing.
If you want to use it, make sure to replace `<FIREBASE_URL>` with your firebase app url and `<FIREBASE_SECRET>` with one of your firebase secrets.
Be sure to add `javascript:` before the script to make it a valid bookmarklet.
Sites with a `Content-Security-Policy` header may block the script from making an xhr request to firebase so this won't work on every site.

## License
Licensed under the [MIT license](LICENSE).
