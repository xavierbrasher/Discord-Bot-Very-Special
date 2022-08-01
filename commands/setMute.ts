import discordJs, {GuildChannel} from "discord.js"
import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage"

export default function setMute(message:discordJs.Message) {
    let {guild} = message //gets guild of the message
    let muteRole = guild.roles.cache.find(x => x.name == "MUTE") //finds mute role
    if (!muteRole) return console.log("Do -setup first to set it up") //check if it exsists 
    const channel = message.channel as GuildChannel //sets it as a GuildChannel
    channel.permissionOverwrites.create(muteRole, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: true }) //changes the permissionOverwrites
    sendCustomEmbedMessage("Mute is setup and ready on this channel 😃", "Mute", message) //sends custom message
     
}

