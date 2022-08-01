import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage"
import { Permissions } from "discord.js"
import * as discordJs from "discord.js"

export default function unban(message:discordJs.Message, client: discordJs.Client) {
    var messageContent = message.content //gets message content
    var partsOfMessage = ""
    //gets the string after the 7th letter
    for (let i = 0; i < messageContent.length; i++) {
        if (i >= 7) {
            partsOfMessage += messageContent[i]
        } 
    }
    //logs the message
    console.log(partsOfMessage)
    const guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions //gets the permissions
    //checks the permissions
    if(guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.author.id == "219021504334135296") {
        console.log("CAN BAN") 
    }
    else {
        sendCustomEmbedMessage("You do not have permission to Unban", "Unban", message)
        return console.log("CANNOT")
    }
    try {
        var UnBanTarget = client.users.cache.find(user => user.username == partsOfMessage) //gets target
        //check if it exsists 
        if (!UnBanTarget) return sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message)
        message.guild.members.unban(UnBanTarget) //unbans the person
        let embedThingy = partsOfMessage + " has been unbanned" 
        sendCustomEmbedMessage(embedThingy, "Unban", message)
    }
    catch {
        //catch an error
        sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message)
    }
    
}