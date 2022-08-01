import discordJs from "discord.js"
import ban from "./ban"
import helpCommand from "./helpCommand"
import kick from "./kick"
import mute from "./mute"
import ray from "./ray"
import raySpam from "./raySpam"
import serverMute from "./servermute"
import setMute from "./setMute"
import setup from "./setup"
import spam from "./spam"
import stfu from "./stfu"
import unban from "./unban"
import unmute from "./unmute"
import unserverMute from "./unservermute"

const prefix = "-"

export default function Commands(message:discordJs.Message, client: discordJs.Client) {
    var messageContent = message.content.toLowerCase() //gets the content of message lower case
    //check which one it is
    if (messageContent.match(prefix + "kick")) {
        kick(message)
    }
    else if (messageContent.match(prefix + "ban")) {
        ban(message)
    }
    else if (messageContent== prefix + "spam ray") {
        raySpam(message)
    }
    else if (messageContent == prefix + "what") {
        message.channel.send("https://cdn.discordapp.com/attachments/868111171222396992/906148880658362398/Z.png")
    }
    else if (messageContent == prefix + "help") {
        helpCommand(message)
    }
    else if (messageContent.match(prefix + "unban")) {
        unban(message, client)
    }
    else if (messageContent.match(prefix + "servermute")) {
        serverMute(message)
    }
    else if (messageContent == prefix + "ray") {
        ray(message)
    }
    else if (messageContent.match(prefix + "unservermute")) {
        unserverMute(message)
    }
    else if (messageContent.match(prefix + "mute")) {
        mute(message)
    }
    else if (messageContent.match(prefix + "unmute")) {
        unmute(message)
    }
    else if (messageContent == prefix + "setup") {
        setup(message)
    }
    else if (messageContent == prefix + "setmute") {
        setMute(message)
    }
    else if (messageContent == prefix + "play?") {
        message.channel.send("Does anyone want to play? <@!517696139320098819> <@567507887992078336> <@219021504334135296> <@717568547823419403> <@695518091706237051> <@687826673608949801>. From <@"+ message.author.id + ">")
        message.delete()
    }
    else if (messageContent == prefix + "wow") {
        message.channel.send("w.o.w s.o c.o.o.l from<@" + message.author.id + ">")
        message.delete()
    }
    else if (messageContent.match(prefix+"spam")) {
        spam(message)
    }
    else if (messageContent == prefix +"stfu") {
        stfu(message)
    }
    else if (messageContent == prefix +"id") {
        console.log(message.author.id)
    }
}