import discordJs, {MessageEmbed, PermissionOverwriteOptions ,PermissionOverwriteManager, PermissionFlags ,BaseCommandInteraction, BaseManager, Guild, GuildBan, GuildBanManager, Intents, Message, Permissions, User, PermissionOverwrites, TextChannel, GuildChannel } from "discord.js"
import dotenv, { config } from 'dotenv'
dotenv.config()
var prefix = "-"
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

function helpCommand(message:discordJs.Message) {
    let {channel} = message
    const receivedEmbed = message.embeds[0]
    //Sets the content of the help command
    let content = "You should start with -setup to setup the server and for each channel you would want mute command to work do -setmute\n\n-kick: To kick someone, syntax: -kick @SOMEONE\n\n-ban: To ban someone, syntax: -ban @SOMEONE \n\n-unban: To unban someone (do not use @), syntax: -unban NAME \n\n-play?: To @ people who usually plays, syntax: -play? \n\n-wow: To show how much you appreciate someones message, syntax: -wow \n\n-mute: To mute someone, syntax: -mute @SOMEONE \n\n-unmute: To unmute someone, syntax: -unmute @SOMEONE"
    //sets up the embed
    const exampleEmbed = new MessageEmbed(receivedEmbed).setTitle("Help").setAuthor("Very Special").setDescription(content).setColor(0x7635cc).setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png")
    //sends it
    channel.send({ embeds: [exampleEmbed] })
}

function sendCustomEmbedMessage(content:string, title:string, message:discordJs.Message) {
    let {channel} = message //sets message.channel to channel
    const receivedEmbed = message.embeds[0] 
    //Sets the author, title, colour, themnail and content
    const exampleEmbed = new MessageEmbed(receivedEmbed).setTitle(title).setAuthor("Very Special").setDescription(content).setColor(0x7635cc).setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png")
    //Sends the embed in the channel
    channel.send({ embeds: [exampleEmbed] })
}

function mute(message:discordJs.Message) {
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

function unmute(message:discordJs.Message) {
    try {
        let {mentions, guild, author} = message
        var MuteRole= guild.roles.cache.find(role => role.name === "MUTE");
        const target = mentions.users.first()
        const guildSenderPermissions = guild.members.cache.get(author.id).permissions
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
                targetid.roles.remove(MuteRole)
                let thingyEmbed = 'Unmuted <@'+ target.id + ">"
                sendCustomEmbedMessage(thingyEmbed, "Unmute", message)
            }  
        }
    }
    catch {
        sendCustomEmbedMessage("Failed to unmute (Check permissions or Make sure it is right syntax -unmute @WHOEVER) or does not have the unmute role", "Mute", message)
        console.log("tried, failed")
    }
    
}

function unban(message:discordJs.Message) {
    var messageContent = message.content
    var partsOfMessage = ""
    for (let i = 0; i < messageContent.length; i++) {
        if (i >= 7) {
            partsOfMessage += messageContent[i]
        } 
    }
    console.log(partsOfMessage)
    const guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions
    if(guildSenderPermissions.has([Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) || message.author.id == "219021504334135296") {
        console.log("CAN BAN")
    }
    else {
        sendCustomEmbedMessage("You do not have permission to Unban", "Unban", message)
        return console.log("CANNOT")
    }
    try {
        var UnBanTarget = client.users.cache.find(user => user.username == partsOfMessage)
        if (!UnBanTarget) return sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message)
        message.guild.members.unban(UnBanTarget)
        let embedThingy = partsOfMessage + " has been unbanned"
        sendCustomEmbedMessage(embedThingy, "Unban", message)
    }
    catch {
        sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message)
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
            sendCustomEmbedMessage("You do not have permission to ban", "Ban", message)
            return console.log("CANNOT")
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id)
            if (target.id == "219021504334135296") return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Ban", message)
            if (!(targetid == null)) {
                if(!targetid.bannable) return sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message)
                targetid.ban()
                let thingyEmbed = 'Banning <@'+ target.id + ">"
                sendCustomEmbedMessage(thingyEmbed, "Ban", message)
            }  
        }
    }
    catch {
        sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message)
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
            sendCustomEmbedMessage("You do not have permission to kick", "Kick", message)
            return console.log("CANNOT")
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id)
            if (target.id == "219021504334135296") return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Kick", message)
            if (!(targetid == null)) {
                if(!targetid.kickable) return sendCustomEmbedMessage("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)", "Kick", message)
                targetid.kick()
                let thingyEmbed = 'Kicking <@'+ target.id + ">"
                sendCustomEmbedMessage(thingyEmbed, "Kick", message)
            }  
        }
    }
    catch {
        sendCustomEmbedMessage("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)", "Kick", message)
    }
        
} 

function setMute(message:discordJs.Message) {
    let {guild} = message
    let muteRole = guild.roles.cache.find(x => x.name == "MUTE")
    if (!muteRole) return console.log("Do -config first to set it up")
    const channel = message.channel as GuildChannel
    channel.permissionOverwrites.create(muteRole, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: true }) 
    sendCustomEmbedMessage("Mute is setup and ready on this channel 😃", "Mute", message)
     
}

function setup(message:discordJs.Message) {
    let {guild, author, member} = message
    try {
        let muteRole = guild.roles.cache.find(x => x.name == "MUTE")
        if(message.member.roles.cache.has(muteRole.id)) {
            console.log("DONT MAKE ROLE")
        }
        else {
            console.log("DONT MAKE ROLE")
            sendCustomEmbedMessage("Config is done and ready", "Config", message)
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
        })
        sendCustomEmbedMessage("Config is done and ready", "Config", message)
    }
    
    
}

function Commands(message:discordJs.Message) {
    var messageContent = message.content.toLowerCase()
    if (messageContent.match(prefix + "kick")) {
        kick(message)
    }
    else if (messageContent.match(prefix + "ban")) {
        ban(message)
    }
    else if (messageContent == prefix + "help") {
        helpCommand(message)
    }
    else if (messageContent.match(prefix + "unban")) {
        unban(message)
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
        message.channel.send("Does anyone want to play? <@!517696139320098819> <@567507887992078336> <@219021504334135296> <@717568547823419403> <@695518091706237051>. From <@"+ message.author.id + ">")
        message.delete()
    
    }
    else if (messageContent == prefix + "wow") {
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