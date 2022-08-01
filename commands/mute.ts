import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage"
import discordJs, {Permissions} from "discord.js"

export default function mute(message:discordJs.Message) {
    try {
        let {mentions, guild, author} = message //sets mention, guild and author from the message
        var MuteRole= guild.roles.cache.find(role => role.name === "MUTE") //finds the role in the cache 
        const target = mentions.users.first() //gets the first user @ in the message
        const guildSenderPermissions = guild.members.cache.get(author.id).permissions //gets the authors permissions
        //checks the authors permissions
        if(guildSenderPermissions.has([Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN MUTE") //checks
        }
        else {
            sendCustomEmbedMessage("You do not have permission to mute", "Mute", message) //sends message of no permission
            return console.log("CANNOT MUTE") //returns
        }
        if (target) {
            //checks synatx and if it is a bot
            if (target.bot) return sendCustomEmbedMessage("Failed to mute (Check permissions or Make sure it is right syntax -mute @WHOEVER)", "Mute", message)
            var targetid = message.guild.members.cache.get(target.id) //gets the members cache from id
            if (target.id == "219021504334135296") return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Mute", message) //check if it is xavier
            if (!(targetid == null)) { //check if someone has been choosen
                targetid.roles.add(MuteRole)
                let thingyEmbed = 'Muted <@'+ target.id + ">"
                sendCustomEmbedMessage(thingyEmbed, "Mute", message) //sends confirmation message
            }  
        }
    }
    catch {
        sendCustomEmbedMessage("Failed to mute (Check permissions or Make sure it is right syntax -mute @WHOEVER)", "Mute", message) //sends retry message
        console.log("tried, failed") //failed
    }
    
}
