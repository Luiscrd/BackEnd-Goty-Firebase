const functions = require("firebase-functions");
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const express = require('express');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://goty-5f05c-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore();

// const goty = functions.https.onRequest( async(request, response) => {
   
//     // const id = request.params['0'];

//     const gotyRef = db.collection('goty');

//     const docsSnap = await gotyRef.get();

//     const games = docsSnap.docs.map(doc => doc.data());

//     console.log(request.params);

//     response.json({
//         ok: true,
//         games
//     });

// });

// module.exports = {
//     // helloWorld,
//     goty
// }

const app = express();

app.use(cors({ origin: true }));

app.get('/goty', async(req, res) => {

    const gotyRef = db.collection('goty');

    const docsSnap = await gotyRef.get();

    const games = docsSnap.docs.map(doc => doc.data());


    res.json({
        ok: true,
        games
    });

})

exports.api = functions.https.onRequest(app);