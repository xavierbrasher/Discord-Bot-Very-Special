import discordJs, {PermissionOverwriteManager, PermissionFlags ,BaseCommandInteraction, BaseManager, Guild, GuildBan, GuildBanManager, Intents, Message, Permissions, User, PermissionOverwrites } from "discord.js"
import dotenv, { config } from 'dotenv'
dotenv.config()
const prefix = "-"
const client = new discordJs.Client({
    intents:[
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS
    ]
})

client.on("ready", ()=>{
    console.log("Discord Bot Online 😃🎉")
    client.user.setActivity('for -help', { type: "WATCHING" })
})
function unban(message:discordJs.Message) {
    var messageContent = message.content
    var partsOfMessage = messageContent.split(" ")
    const guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions
    if(guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.author.id == "219021504334135296") {
        console.log("CAN BAN")
    }
    else {
        message.reply("You do not have permission to kick")
        return console.log("CANNOT")
    }
    try {
        var UnBanTarget = client.users.cache.find(user => user.username == partsOfMessage[1])
        if (!UnBanTarget) return message.channel.send("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban")
        message.guild.members.unban(UnBanTarget)
        message.reply(partsOfMessage[1] + " has been unbanned")
    }
    catch {
        message.channel.send("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban")
    }
    
}

function ban(message:discordJs.Message) {
    try {
        const {mentions, author} = message
        const target = mentions.users.first()
        const guildSenderPermissions = message.guild.members.cache.get(author.id).permissions
        if(guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN BAN")
        }
        else {
            message.reply("You do not have permission to kick")
            return console.log("CANNOT")
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id)
            if (target.id == "219021504334135296") return message.channel.send("THATS DADDY I CANT 😦😩")
            if (!(targetid == null)) {
                if(!targetid.bannable) return message.reply("Failed to ban (Check permissions or Make sure it is right syntax -kick @WHOEVER)")
                targetid.ban()
                message.channel.send('Banning <@'+ target.id + ">")
            }  
        }
    }
    catch {
        message.channel.send("Failed to ban (Check permissions or Make sure it is right syntax -kick @WHOEVER)")
    }
        
}

function kick(message:discordJs.Message) {
    try {
        const {mentions, author} = message

        const target = mentions.users.first()
        const guildSenderPermissions = message.guild.members.cache.get(author.id).permissions
        if(guildSenderPermissions.has([Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN KICK")
        }
        else {
            message.reply("You do not have permission to kick")
            return console.log("CANNOT")
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id)
            if (target.id == "219021504334135296") return message.channel.send("THATS DADDY I CANT 😦😩")
            if (!(targetid == null)) {
                if(!targetid.kickable) return message.reply("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)")
                targetid.kick()
                message.channel.send('Kicking <@'+ target.id + ">")
            }  
        }
    }
    catch {
        message.channel.send("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)")
    }
        
} 

function configMessage(message:discordJs.Message) {
    let {guild, author, channel} = message

    guild.roles.create({
        name : "MUTE",
        color : "RED",
        reason : "mute",
        mentionable : false,
        permissions : [
            "READ_MESSAGE_HISTORY" , "ADD_REACTIONS"
        ]
    })

    let role = guild.roles.cache.find(role => role.name === "MUTE")
    try {
        message.guild.channels.cache.forEach(async (channel, id) => {
         await channel.updateOverwrite(role, {
             SEND_MESSAGES: false,
             SPEAK: false,
             ADD_REACTIONS: false,
             SEND_TTS_MESSAGES: false,
             ATTACH_FILES: false 
         })
        });
       } catch (e) {
        console.log(e.stack);
       }
    
    


}

function Commands(message:discordJs.Message) {
    var messageContent = message.content.toLowerCase()

    if (messageContent.match("-kick")) {
        kick(message)
    }
    else if (messageContent.match("-ban")) {
        ban(message)
    }
    else if (messageContent.match("-unban")) {
        unban(message)
    }
    else if (messageContent == "-config") {
        configMessage(message)
    }
    else if (messageContent == "-play?") {
        message.channel.send("Does anyone want to play? <@!517696139320098819> <@567507887992078336> <@219021504334135296> <@717568547823419403> <@695518091706237051>. From <@"+ message.author.id + ">")
        message.delete()
    
    }
    else if (messageContent == "-wow") {
        message.channel.send("w.o.w s.o c.o.o.l -<@" + message.author.id + ">")
        message.delete()
    }
}

client.on("messageCreate", (message)=>{
    console.log("Server: "+message.guild.name+ ", Channel: " +message.channel + ", Username: " + message.author.username+", Message: " + message.content);

    if (message.content[0] == prefix) {
        Commands(message)
    }
})



client.login(process.env.TOKEN)