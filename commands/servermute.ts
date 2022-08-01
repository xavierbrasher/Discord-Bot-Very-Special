import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage"
import {Permissions} from "discord.js"
import * as discordJs from "discord.js"

export default async function serverMute(message:discordJs.Message) {
    try {
        const guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions //gets permissions
        //checks permissions
        if (!(guildSenderPermissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || guildSenderPermissions.has(Permissions.FLAGS.ADMINISTRATOR) || message.author.id == "219021504334135296")) return sendCustomEmbedMessage("Do not have permission to do this", "Server Mute", message)
        let target = message.mentions.members.first() //gets target
        let voiceChannel = target.voice //gets the voice channel it is in
        await voiceChannel.setMute(true) //sets the mute
        let customMessage = "<@"+target.id+"> has been server muted"  //sets up the message
        sendCustomEmbedMessage(customMessage, "Server Mute", message) //sends the message
    }
    catch {
        sendCustomEmbedMessage("Server mute failed, Must be in a voice channel, syntax: -serverMute @SOMEONE", "Server Mute", message) //sends catch message
    }
    
}