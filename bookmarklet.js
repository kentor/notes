!function() {
  var data = JSON.stringify({
    content: window.location.href,
    createdAt: new Date(),
    hidden: false,
  });

  var xhr = new XMLHttpRequest();
  xhr.open('post', 'https://<FIREBASE_URL>.firebaseio.com/notes.json?auth=<FIREBASE_SECRET>');
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(data);
}();

/* uglifyjs bookmarklet.js -cm
javascript:!function(){var t=JSON.stringify({content:window.location.href,createdAt:new Date,hidden:!1}),e=new XMLHttpRequest;e.open("post","https://<FIREBASE_URL>.firebaseio.com/notes.json?auth=<FIREBASE_SECRET>"),e.setRequestHeader("Content-type","application/json; charset=utf-8"),e.send(t)}()
*/
