const { Client, Intents } = require('discord.js');
const cheerio = require('cheerio');
const { message } = require('prompt');
const sdk = require('api')('@opensea/v1.0#p10gwr4l02q167c');
const Moralis = require('moralis');
const axios = require("axios").default;




const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const prefix = '/';


client.once('ready', () =>{
    console.log("YO!");
});




client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return ;
    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLocaleLowerCase();

    if(command === 'floor'){
      floor();
    }
});



async function floor(){
  let floorPrice = 0;
  axios.get('https://api.opensea.io/api/v1/collection/')
  .then(response => {
    floorPrice = response.data.collection.stats.floor_price;
  })
  .catch(error => {
    console.log(error);
  });

}

















client.login(/*check discord for token*/);
