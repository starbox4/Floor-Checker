const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const prefix = '/';


client.once('ready', () =>{
    console.log("YO!");
});



client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return ;
    const args = message.content.slice(prefix.length).split(/ + /);
    const command = args.shift().toLocaleLowerCase();

    if(command === 'bluechip'){
        //code here
    }
});

















client.login('OTUwNTEwODE1NDgyNjQyNDQy.YiZ-Lg.tb8qMzcd07KzRweKfuHSG7U5IgA');