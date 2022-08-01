import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage";
import {Permissions} from "discord.js"
import * as discordJs from "discord.js"

export default function unmute(message:discordJs.Message) {
    try {
        let {mentions, guild, author} = message //sets mentions, guild, author
        var MuteRole= guild.roles.cache.find(role => role.name === "MUTE"); //find the mute role
        const target = mentions.users.first() //gets target as discord.js user
        const guildSenderPermissions = guild.members.cache.get(author.id).permissions //gets the permissions of that user
        //checks the permissions
        if(guildSenderPermissions.has([Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN MUTE")
        }
        else {
            sendCustomEmbedMessage("You do not have permission to mute", "Mute", message)
            return console.log("CANNOT MUTE")
        }
        if (target) {
            if (target.bot) return sendCustomEmbedMessage("Failed to unmute (Check permissions or Make sure it is right syntax -unmute @WHOEVER)", "Mute", message)
            var targetid = message.guild.members.cache.get(target.id)
            if (target.id == "219021504334135296") return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Unmute", message)
            if (!(targetid == null)) {
                //removes the mute role
                targetid.roles.remove(MuteRole)
                let thingyEmbed = 'Unmuted <@'+ target.id + ">" //gets message ready
                sendCustomEmbedMessage(thingyEmbed, "Unmute", message) //sends custom unmute message
            }  
        }
    }
    catch {
        //checks for errors
        sendCustomEmbedMessage("Failed to unmute (Check permissions or Make sure it is right syntax -unmute @WHOEVER) or does not have the unmute role", "Mute", message)
        console.log("tried, failed")
    }
    
}