const Discord = require("discord.js")
const client = new Discord.Client();
var request = require('request');

var apikey = "";
var token = "";
var channelid = "";

var whatdogacutal = 0;
var stafftotal = 0;

request({
    headers: {
      'API-Key': apikey,
    },
    uri: 'https://api.hypixel.net/punishmentstats',
    method: 'get'
  }, function (err, res, body) {
    
    whatdogacutal = parseInt(JSON.parse(body)['watchdog_total'])
    stafftotal = parseInt(JSON.parse(body)['staff_total'])
});

client.on("ready", on => {
    setInterval(a => {
        request({
            headers: {
              'API-Key': apikey,
            },
            uri: 'https://api.hypixel.net/punishmentstats',
            method: 'get'
          }, function (err, res, body) {
            var watchbanint = parseInt(JSON.parse(body)['watchdog_total'] - whatdogacutal)
            var watchban = watchbanint.toString()
            var staffbanint = parseInt(JSON.parse(body)['staff_total'] - stafftotal)
            var staffban = staffbanint.toString()
            if(watchbanint != 0 || staffbanint != 0) {
                var embed = new Discord.MessageEmbed()
                .setTitle("Hypixel Ban Record")
                .setDescription("**Watchdog's Banned " + watchban +" players**\n" + "**Staff's Banned " + staffban + " players**")
                .setTimestamp(Date.now())
                .setImage("https://media.tenor.com/d0VNnBZkSUkAAAAC/bongocat-banhammer.gif")
                .setFooter("Created By Sysy's#1492 For KidiKlient & Aether");
                client.channels.fetch(channelid).then(async (channel) => {channel.send(embed)});
                whatdogacutal = parseInt(JSON.parse(body)['watchdog_total'])
                stafftotal = parseInt(JSON.parse(body)['staff_total'])  
            }
        });
    },5000)
})

client.login(token);