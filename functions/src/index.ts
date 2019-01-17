import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as bookmark from "./bookmark";

admin.initializeApp(functions.config().firebase);
let settings = {
  timestampsInSnapshots: true
}

let collectionName = "bookmarks";
let db = admin.firestore();
db.settings(settings);

// Create a bookmark entry
export const create = functions.https.onRequest((request, response) => {

  let b: bookmark.IBookmark = request.body;
  if (bookmark.isValid(b)) {

    db.collection(collectionName).doc().set(b).then(() => {
      response.send("Bookmark saved.");
    }).catch((err) => {
      console.log(err);
      response.send("Unexpected error saving bookmark.");
    });

  } else {
    response.send("Invalid request.");
  }
});

// Search on bookmark entries
export const search = functions.https.onRequest((request, response) => {

  let b: bookmark.IBookmark = request.body;
  let resultset = [];

  if (bookmark.isSearchable(b)) {

    let query = db.collection(collectionName).where(Object.keys(b)[0], "==", b[Object.keys(b)[0]]);
    query.get().then((docs) => {
      docs.forEach((doc) => {
        resultset.push(doc.data());
      });
      response.send(resultset);
    }).catch((err) => {
      console.log(err);
      response.send("Unexpected error searching bookmarks");
    });

  } else {
    response.send("Invalid request.");
  }
});

// List all bookmark entries
export const list = functions.https.onRequest((request, response) => {
  let resultset = [];
  db.collection(collectionName).get()
    .then((docs) => {
      docs.forEach((doc) => {
        resultset.push(doc.data());
      });
      response.send(resultset);
    })
    .catch((err) => {
      console.log(err);
      response.send("Unexpected error listing bookmarks");
    });
});