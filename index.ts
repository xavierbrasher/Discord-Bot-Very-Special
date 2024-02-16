#!/usr/bin/node
import * as discordJs from "discord.js";
import { Intents } from "discord.js";
import * as dotenv from "dotenv";
import Commands from "./commands";
import sendPush from "./components/sendPush";
const express = require("express");
const port = 8080;

dotenv.config();

export default function start() {
  const server = express();

  server.all("*", (req, res) => {
    res.send("This is just a digital ocean check :)");
  });

  server.listen(port, (err) => {
    if (err) throw err;
  });
}

const client = new discordJs.Client({
  //intents of what the bot does
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.on("ready", () => {
  if (process.env.PUSH == "1") {
    sendPush(
      process.env.PUSHUSER,
      process.env.PUSHTOKEN,
      "Discord server is now online"
    );
  }
  //On the bot ready, the bot would log it going online
  start();
  console.log("Discord Bot Online 😃🎉");
  client.user.setActivity("for -help", { type: "WATCHING" }); //sets the activity for the bot
});

client.on("messageCreate", (message) => {
  //console.log("Server: "+message.guild.name+ ", Channel: " +message.channel + ", Username: " + message.author.username+", Message: " + message.content); //logs the message
  if (message.author.bot) return;

  if (message.content[0] == "-") Commands(message, client); //if the first letter = to prefix than run commands
});

client.login(process.env.TOKEN); //logs in with the token
