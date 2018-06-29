const functions = require('firebase-functions');
const firebaseAdmin = require("firebase-admin");
const express = require("express");
const engines = require("consolidate");

firebaseAdmin.initializeApp(
    functions.config().firebase
) 

const firestore = firebaseAdmin.firestore();
const db = firebaseAdmin.database();

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', "./views");
app.set('view engine', 'hbs');

app.get('/admin', (req, res) => {
    console.log("insdie admin");
    const ref = db.ref('articles');
    res.set('Cache-Control', 'public, max-age:300, s-maxage=600');
    ref.once('value')
    .then(snap => snap.val())
    .then(articles => {
        console.log("inside articles", articles)
        res.render("index", { articles })
    }).catch(errors => {
        console.log(errors)
    })
    
})

app.get('/articles/list', (req, res) => {
    console.log("insdie articles list");
    res.set('Cache-Control', 'public, max-age:300, s-maxage=600');
    
    firestore.collection('articles').get()
    .then((snapshot) => {
        console.log("snapshot", snapshot);
        const articlesList = [];
      snapshot.forEach((article) => {
          console.log("article data", article.data());
          articlesList.push(article.data());
      });
      console.log({articlesList});
      return articlesList;
    })
    .then((articles) => {
        console.log("Inside 2nd promise");
        console.log("article", articles)
        res.render("index", {articles})
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });   
    
})

exports.app = functions.https.onRequest(app);
