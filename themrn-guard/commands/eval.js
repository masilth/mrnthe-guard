const Discord = require("discord.js");
const config = require("../config.json")

exports.execute = async (client, message, args) => {
   if(message.author.id === config.OwnerID) return message.channel.send("Bu komut **Bot sahibine** özeldir!") 
   if (!args[0]) return message.channel.send(`Bir kod belirtmelisin!`);
   let code = args.join(' ');
   function clean(text) {
   if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
   text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
   return text;
 };
   try { 
   var evaled = clean(await eval(code));
   if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, "Maalesef tokenimi veremem.");
   message.channel.send(`${evaled.replace(client.token, "Maalesef tokenimi veremem.")}`, {code: "js", split: true});
} catch(err) { message.channel.send(err, {code: "js", split: true}) };
};

exports.conf = {
  command: "eval",
  description: "",
  aliases: []
}