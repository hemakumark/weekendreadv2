const functions = require('firebase-functions');
const firebaseAdmin = require("firebase-admin");
const express = require("express");
const engines = require("consolidate");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const date = require('date-and-time');

const DATE_FORMAT = 'ddd MMM DD YYYY HH:mm:ss';

firebaseAdmin.initializeApp(
    functions.config().firebase
) 

const firestore = firebaseAdmin.firestore();
const db = firebaseAdmin.database();

const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', "./views");
app.set('view engine', 'hbs');

/* app.get('/admin', (req, res) => {
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
    
}) */

app.get('/admin/articles', (req, res) => {
    console.log("insdie articles list");
    res.set('Cache-Control', 'public, max-age:300, s-maxage=600');
    
    firestore.collection('articles').orderBy('id','asc').get()
    .then((snapshot) => {
        console.log("snapshot", snapshot);
        
        const articlesList = [];
      snapshot.forEach((article) => {
        //console.log("Article doc", article.doc());
          console.log("article data", article.data());
          articlesList.push(article.data());
      });
      //console.log({articlesList});
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



app.post('/admin/articles', jsonParser, (req, res) => {
    console.log("insdie articles post method");
    
    if (req.body) {
        const {user, article} = req.body;
        let now = new Date();
        console.info(`User ${user} Posted Article :: ${article} on ${date.format(now, DATE_FORMAT)}`);

        res.status(200).json({"title":"Thanks for posting the article.", "detail":"Your shared article will be published to Weekendread Portal post admin approval."});
    } else {
        /* TODO error validation has to be taken care when user post invalid json article */
        return res.status(400).send({"error":"You have sent invalid format"}).end();
    } 
    
})

app.post('/admin/articles/publish', jsonParser, (req, res) => {
    console.info("Inside :: /admin/articles/publish :: router mapping")
    
    updateDatabase(req.body.articleIdList)
    
    res.status(200).json({"message":"success"});
})

function updateDatabase(articleIdList){
    articleIdList.forEach((item)=>{
        console.log(item)
        console.log(firestore.collection('articles').doc(item));
        firestore.collection('articles').doc(item).set({published: true});
        
    })
    //firestore.doc('articles').orderBy('id','asc').get()
}

exports.app = functions.https.onRequest(app);
