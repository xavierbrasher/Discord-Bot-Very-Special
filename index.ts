#!/usr/bin/node
import discordJs, {Intents} from "discord.js"
import dotenv from 'dotenv'
import Commands from "./commands"
dotenv.config()

const client = new discordJs.Client({
    //intents of what the bot does
    intents:[
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})


client.on("ready", ()=>{
    //On the bot ready, the bot would log it going online
    console.log("Discord Bot Online 😃🎉")
    client.user.setActivity('for -help', { type: "WATCHING" }) //sets the activity for the bot
})

client.on("messageCreate", (message)=>{
    console.log("Server: "+message.guild.name+ ", Channel: " +message.channel + ", Username: " + message.author.username+", Message: " + message.content); //logs the message

    if (message.content[0] == "-") Commands(message, client) //if the first letter = to prefix than run commands
})

client.login(process.env.TOKEN) //logs in with the token
