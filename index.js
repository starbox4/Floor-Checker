const { Client, Intents } = require('discord.js');
const axios = require("axios").default;


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

client.on('message', message =>{
    
  if(!message.content.startsWith(prefix) || message.author.bot) return ;
  const args = message.content.slice(prefix.length).split(/ + /);
  const command = args.shift().toLocaleLowerCase();
  let commandParts = command.split(' ');
  switch(commandParts[0]) {
    case 'info':
      var apiLink = 'https://api.opensea.io/api/v1/collection/'
      var link = apiLink.concat(commandParts[1])
      axios.get(link)
      .then(response => {
        console.log(response.data.collection.stats.floor_price); //floorprice
        console.log(response.data.collection.stats.num_owners); //# of owners
        console.log(response.data.collection.stats.total_volume); //total volume
        console.log(response.data.collection.stats.total_sales); //total sales
        console.log(response.data.collection.primary_asset_contracts.dev_seller_fee_basis_points); //royalties
        
        floorPrice = response.data.collection.stats.floor_price;
        ownerCount = response.data.collection.stats.num_owners;
        totalVolume = response.data.collection.stats.total_volume;
        totalSales = response.data.collection.stats.total_sales;
        sellingFee = response.data.collection.primary_asset_contracts.dev_seller_fee_basis_points;

        let floorPriceStr = 'Floor price: ' + (JSON.stringify(floorPrice));
        let ownerCountStr = '\nOwner Count: ' + (JSON.stringify(ownerCount));
        let totalVolumeStr = '\nTotal Volume: ' + (JSON.stringify(totalVolume));
        let totalSalesStr = '\nTotal Sales: ' + (JSON.stringify(totalSales));
        let sellingFeeStr = '\nSeller Fee: ' + (JSON.stringify(sellingFee));
        message.channel.send(floorPriceStr + ownerCountStr + totalVolumeStr + totalSalesStr + sellingFeeStr);
        //message.channel.send(JSON.stringify(data));
        console.log(floorPriceStr)
      })
      .catch(error => {
        console.log(error);
      });
      break;
    default:
      message.channel.send('Invaid command. Please try again');
  }
});
















client.login(/*check discord for token*/);
