const express = require('express');
const Twitter = require('twitter');
const port = 3986;
const Tauth = require('./config/secrete'); 
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
let tweetArray = [];
let client = new Twitter({
  consumer_key: Tauth.consumer_key,
  consumer_secret: Tauth.consumer_secret,
  access_token_key: Tauth.access_token_key,
  access_token_secret: Tauth.access_token_secret
});
app.use(cors());
let params = {screen_name: 'citadel50'};
//app.get('/', (req, res) => {

setInterval( () => {
let randomYear = new Date().getFullYear() - Math.floor(Math.random()*100);

fetch('http://numbersapi.com/'+randomYear+'/year')
  .then(res => res.text())
  .then( data => {
    client.post('statuses/update', {status: data}, function(error, tweet, response) {
  if (!error) {
     console.log('A new tweet has been sent');
  tweetArray.push(randomYear)
  console.log(tweetArray.length+'  posts made');
  }else{
        console.log(error);
  }
 
});
  })
  .catch( err => console.log(err))
}, 1800000)

//res.send('Working...');
//})

app.listen(process.env.PORT || port, () => {
	console.log(`Server started on port ${port}`)
})