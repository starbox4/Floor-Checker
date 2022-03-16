const { Client, Intents } = require('discord.js');
const res = require('express/lib/response');
const axios = require("axios").default;
var sleep = require('sleep-promise');


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '/';


client.once('ready', () =>{
    console.log("YO!");
});


var floorPrice = 0;
var ownerCount = 0;
var totalVolume = 0;
var totalSales = 0;
var sellingFee = 0;
let finalMsg = 0;

// client.on('message', message =>{
    
//   if(!message.content.startsWith(prefix) || message.author.bot) return ;
//   const args = message.content.slice(prefix.length).split(/ + /);
//   const command = args.shift().toLocaleLowerCase();
//   let commandParts = command.split(' ');
//   switch(commandParts[0]) {
//     case 'info':
//       var apiLink = 'https://api.opensea.io/api/v1/collection/'
//       var link = apiLink.concat(commandParts[1])
//       axios.get(link)
//       .then(response => {
//         console.log(response.data.collection.stats.floor_price); //floorprice
//         console.log(response.data.collection.stats.num_owners); //# of owners
//         console.log(response.data.collection.stats.total_volume); //total volume
//         console.log(response.data.collection.stats.total_sales); //total sales
//         console.log(response.data.collection.primary_asset_contracts.dev_seller_fee_basis_points); //royalties
        
//         floorPrice = response.data.collection.stats.floor_price;
//         ownerCount = response.data.collection.stats.num_owners;
//         totalVolume = response.data.collection.stats.total_volume;
//         totalSales = response.data.collection.stats.total_sales;
//         sellingFee = response.data.collection.primary_asset_contracts.dev_seller_fee_basis_points;

//         let floorPriceStr = 'Floor price: ' + (JSON.stringify(floorPrice));
//         let ownerCountStr = '\nOwner Count: ' + (JSON.stringify(ownerCount));
//         let totalVolumeStr = '\nTotal Volume: ' + (JSON.stringify(totalVolume));
//         let totalSalesStr = '\nTotal Sales: ' + (JSON.stringify(totalSales));
//         let sellingFeeStr = '\nSeller Fee: ' + (JSON.stringify(sellingFee));
//         message.channel.send(floorPriceStr + ownerCountStr + totalVolumeStr + totalSalesStr + sellingFeeStr);
//         //message.channel.send(JSON.stringify(data));
//         console.log(floorPriceStr)
//       })
//       .catch(error => {
//         console.log(error);
//       });
//       break;
//     default:
//       message.channel.send('Invaid command. Please try again');
//   }
// });

client.on('messageCreate', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return ;
  const args = message.content.slice(prefix.length).split(/ + /);
  const command = args.shift().toLocaleLowerCase();
  let commandParts = command.split(' ');
  let checker = 0;
  switch(commandParts[0]) {
    case 'monitor':
      var apiLink = 'https://api.opensea.io/api/v1/collection/'
      var link = apiLink.concat(commandParts[1])
      message.channel.send("Would you like to monitor floor increase, decrease, or both?");
      axios.get(link)
      .then(response => {
        var currFloorPrice = JSON.stringify(response.data.collection.stats.floor_price);
        console.log(currFloorPrice);
        var liveFloorPrice;

        async function increase(){
          while(checker === 0){
            console.log("sending request");
            axios.get(link).
              then((response) => {
                liveFloorPrice = JSON.stringify(response.data.collection.stats.floor_price);
              });
            console.log("got data");
            console.log("live floor - " + liveFloorPrice);
            console.log("inital floor - " + currFloorPrice);
            if(liveFloorPrice > currFloorPrice){
              console.log("change found");
              currFloorPrice == liveFloorPrice;
              message.channel.send("Floor as increased to " + currFloorPrice + " eth");
              console.log('sleeping for 30 secs');
              await sleep(30000);
              continue;
            }else{
              console.log('did not find change, sleeping for 30 secs');
              await sleep(30000);
              continue;
            }
          }
        }
        async function decrease(){
          while(checker === 0){
            if(liveFloorPrice < currFloorPrice){
              console.log("change found");
              currFloorPrice == liveFloorPrice;
              message.channel.send("Floor as decreased to " + currFloorPrice + "eth");
              console.log('sleeping for 30 secs');
              await sleep(30000);
              continue;
            }else{
              console.log('did not find change, sleeping for 30 secs');
              await sleep(30000);
              continue;
            }
          }
        }
        async function both(){
          while(checker === 0){
            console.log("sending request");
            axios.get(link).
              then((response) => {
                liveFloorPrice = JSON.stringify(response.data.collection.stats.floor_price);
              });
            console.log("got data");
            console.log("live floor - " + liveFloorPrice);
            console.log("inital floor - " + currFloorPrice);
            if(liveFloorPrice > currFloorPrice){
              console.log("change found");
              currFloorPrice == liveFloorPrice;
              message.channel.send("Floor as increased to " + currFloorPrice + " eth");
              console.log('sleeping for 30 secs');
              await sleep(30000);
              continue;
            }else if(liveFloorPrice < currFloorPrice){
              console.log("change found");
              currFloorPrice == liveFloorPrice;
              message.channel.send("Floor as decreased to " + currFloorPrice + "eth");
              console.log('sleeping for 30 secs');
              await sleep(30000);
              continue;
            }else{
              console.log('did not find change, sleeping for 30 secs');
              await sleep(30000);
              continue;
            }
          }
        }

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, max : 2, time: 150000 });
        let msg = 0;
        collector.on('collect', m => {
          console.log(`Collected ${m.content}`);
          msg = m.content
          if(msg === 'increase'){
            message.channel.send("Monitoring changes, current floor price is " + currFloorPrice + ", bot will dm for increase in floor");
            increase();
          }else if(msg === 'decrease'){
            message.channel.send("Monitoring changes, current floor price is " + currFloorPrice + ", bot will dm for decrease in floor");
            decrease();
          }else if(msg === 'both'){
            message.channel.send("Monitoring changes, current floor price is " + currFloorPrice + ", bot will dm for changes in floor");
            both();
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
      break;
  }

});















 
client.login('check discord');
