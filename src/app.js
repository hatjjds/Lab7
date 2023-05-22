const express = require('express');
import configViewEngine from "./config/viewEngine";
const app = express()
const port = 3000
configViewEngine(app);

app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/////////////////////////////////////////////////////////////////////////
const url = 'mongodb://localhost:27017/myDatabase';
const MongoClient = require('mongodb').MongoClient;
var mongo = new MongoClient(url, { useNewUrlParser: true });
const mongoose = require('mongoose')

mongoose.connect(url, { useNewUrlParser: true })

mongoose.connection.on('connecting', () => {
  console.log(mongoose.connection.readyState); //logs 2
  console.log('connecting')
});
mongoose.connection.on('connected', () => {
  console.log(mongoose.connection.readyState); //logs 1
  console.log('connected');
});
mongoose.connection.on('disconnecting', () => {
  console.log(mongoose.connection.readyState); //logs 3
  console.log('disconnecting');
});
mongoose.connection.on('disconnected', () => {
  console.log(mongoose.connection.readyState); //logs 0
  console.log('disconnected');
});

const testPlaylist = new mongoose.Schema({
  name: String,
  author: String
})

const clientPlaylist = new mongoose.model('clientPlaylist', testPlaylist);

const inserDoc = async () => {
  try {
    const vbsscripsPlaylist = new clientPlaylist({
      name: "client1",
      author: "client1"
    })

    const doc = await vbsscripsPlaylist.save()
    console.log(doc)
  } catch (err) {
    console.log(err)
  }
}

inserDoc();
