const { Client, Intents } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const { message } = require('prompt');
const sdk = require('api')('@opensea/v1.0#p10gwr4l02q167c');
const Moralis = require('moralis');



const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const prefix = '/';


client.once('ready', () =>{
    console.log("Bot is Online");
});





client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return ;
    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLocaleLowerCase();

    let info;
    if(command === 'bluechip'){
        bluechip();
    }
});




async function bluechip() {
//todo

}

















client.login(/*check discord for token*/);
