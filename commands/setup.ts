import discordJs from "discord.js"
import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage"

export default function setup(message:discordJs.Message) {
    let {guild, member} = message //gets guild, member
    try {
        let muteRole = guild.roles.cache.find(x => x.name == "MUTE") //tries to get role
        if(member.roles.cache.has(muteRole.id)) { //check if the server has the role
            console.log("DONT MAKE ROLE") 
        }
        else {
            console.log("DONT MAKE ROLE")
            sendCustomEmbedMessage("Setup is done and ready", "Setup", message) 
        }
    } catch {
        console.log("MAKE ROLE");
        guild.roles.create({
            name : "MUTE",
            color : "RED",
            reason : "mute",
            mentionable : false,
            permissions : [
            "READ_MESSAGE_HISTORY" , "ADD_REACTIONS"
            ]
        }) //makses the role
        sendCustomEmbedMessage("Setup is done and ready", "Setup", message)
    }
    
    
}