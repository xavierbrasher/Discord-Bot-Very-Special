import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage"
import { Permissions } from "discord.js"
import * as discordJs from "discord.js"

export default function ban(message:discordJs.Message) {
    try {
        const {mentions, author} = message //gets mentions, author
        const target = mentions.users.first() //gets target
        const guildSenderPermissions = message.guild.members.cache.get(author.id).permissions //gets permissions
        //check if has the permissions
        if(guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN BAN")
        }
        else {
            sendCustomEmbedMessage("You do not have permission to ban", "Ban", message)
            return console.log("CANNOT")
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id) //gets the guild member
            if (target.id == "219021504334135296") return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Ban", message)
            if (!(targetid == null)) { //if targetid doesnt exsist
                if(!targetid.bannable) return sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message)
                targetid.ban() //ban
                let thingyEmbed = 'Banning <@'+ target.id + ">"
                sendCustomEmbedMessage(thingyEmbed, "Ban", message) //responce message
            }  
        }
    }
    catch {
        //catchs error
        sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message)
    }
        
}

