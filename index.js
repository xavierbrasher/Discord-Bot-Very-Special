"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv_1 = require("dotenv");
dotenv_1.config();
var prefix = "-";
var client = new discord_js_1.Client({
    //intents of what the bot does
    intents: [
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_BANS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES
    ]
});
client.on("ready", function () {
    //On the bot ready, the bot would log it going online
    console.log("Discord Bot Online 😃🎉");
    client.user.setActivity('for -help', { type: "WATCHING" }); //sets the activity for the bot
});
function helpCommand(message) {
    var channel = message.channel;
    var receivedEmbed = message.embeds[0];
    //Sets the content of the help command
    var content = "You should start with -setup to setup the server and for each channel you would want mute command to work do -setmute\n\n-kick: To kick someone, syntax: -kick @SOMEONE\n\n-ban: To ban someone, syntax: -ban @SOMEONE \n\n-unban: To unban someone (do not use @), syntax: -unban NAME \n\n-play?: To @ people who usually plays, syntax: -play? \n\n-wow: To show how much you appreciate someones message, syntax: -wow \n\n-mute: To mute someone, syntax: -mute @SOMEONE \n\n-unmute: To unmute someone, syntax: -unmute @SOMEONE";
    //sets up the embed
    var exampleEmbed = new discord_js_1.MessageEmbed(receivedEmbed).setTitle("Help").setAuthor("Very Special").setDescription(content).setColor(0x7635cc).setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png");
    //sends it
    channel.send({ embeds: [exampleEmbed] });
}
function sendCustomEmbedMessage(content, title, message) {
    var channel = message.channel; //sets message.channel to channel
    var receivedEmbed = message.embeds[0];
    //Sets the author, title, colour, themnail and content
    var exampleEmbed = new discord_js_1.MessageEmbed(receivedEmbed).setTitle(title).setAuthor("Very Special").setDescription(content).setColor(0x7635cc).setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png");
    //Sends the embed in the channel
    channel.send({ embeds: [exampleEmbed] });
}
function mute(message) {
    try {
        var mentions = message.mentions, guild = message.guild, author = message.author; //sets mention, guild and author from the message
        var MuteRole = guild.roles.cache.find(function (role) { return role.name === "MUTE"; }); //finds the role in the cache 
        var target = mentions.users.first(); //gets the first user @ in the message
        var guildSenderPermissions = guild.members.cache.get(author.id).permissions; //gets the authors permissions
        //checks the authors permissions
        if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN MUTE"); //checks
        }
        else {
            sendCustomEmbedMessage("You do not have permission to mute", "Mute", message); //sends message of no permission
            return console.log("CANNOT MUTE"); //returns
        }
        if (target) {
            //checks synatx and if it is a bot
            if (target.bot)
                return sendCustomEmbedMessage("Failed to mute (Check permissions or Make sure it is right syntax -mute @WHOEVER)", "Mute", message);
            var targetid = message.guild.members.cache.get(target.id); //gets the members cache from id
            if (target.id == "219021504334135296")
                return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Mute", message); //check if it is xavier
            if (!(targetid == null)) { //check if someone has been choosen
                targetid.roles.add(MuteRole);
                var thingyEmbed = 'Muted <@' + target.id + ">";
                sendCustomEmbedMessage(thingyEmbed, "Mute", message); //sends confirmation message
            }
        }
    }
    catch (_a) {
        sendCustomEmbedMessage("Failed to mute (Check permissions or Make sure it is right syntax -mute @WHOEVER)", "Mute", message); //sends retry message
        console.log("tried, failed"); //failed
    }
}
function unmute(message) {
    try {
        var mentions = message.mentions, guild = message.guild, author = message.author;
        var MuteRole = guild.roles.cache.find(function (role) { return role.name === "MUTE"; });
        var target = mentions.users.first();
        var guildSenderPermissions = guild.members.cache.get(author.id).permissions;
        if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN MUTE");
        }
        else {
            sendCustomEmbedMessage("You do not have permission to mute", "Mute", message);
            return console.log("CANNOT MUTE");
        }
        if (target) {
            if (target.bot)
                return sendCustomEmbedMessage("Failed to unmute (Check permissions or Make sure it is right syntax -unmute @WHOEVER)", "Mute", message);
            var targetid = message.guild.members.cache.get(target.id);
            if (target.id == "219021504334135296")
                return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Unmute", message);
            if (!(targetid == null)) {
                targetid.roles.remove(MuteRole);
                var thingyEmbed = 'Unmuted <@' + target.id + ">";
                sendCustomEmbedMessage(thingyEmbed, "Unmute", message);
            }
        }
    }
    catch (_a) {
        sendCustomEmbedMessage("Failed to unmute (Check permissions or Make sure it is right syntax -unmute @WHOEVER) or does not have the unmute role", "Mute", message);
        console.log("tried, failed");
    }
}
function unban(message) {
    var messageContent = message.content;
    var partsOfMessage = "";
    for (var i = 0; i < messageContent.length; i++) {
        if (i >= 7) {
            partsOfMessage += messageContent[i];
        }
    }
    console.log(partsOfMessage);
    var guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions;
    if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || message.author.id == "219021504334135296") {
        console.log("CAN BAN");
    }
    else {
        sendCustomEmbedMessage("You do not have permission to Unban", "Unban", message);
        return console.log("CANNOT");
    }
    try {
        var UnBanTarget = client.users.cache.find(function (user) { return user.username == partsOfMessage; });
        if (!UnBanTarget)
            return sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message);
        message.guild.members.unban(UnBanTarget);
        var embedThingy = partsOfMessage + " has been unbanned";
        sendCustomEmbedMessage(embedThingy, "Unban", message);
    }
    catch (_a) {
        sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message);
    }
}
function ban(message) {
    try {
        var mentions = message.mentions, author = message.author;
        var target = mentions.users.first();
        var guildSenderPermissions = message.guild.members.cache.get(author.id).permissions;
        if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN BAN");
        }
        else {
            sendCustomEmbedMessage("You do not have permission to ban", "Ban", message);
            return console.log("CANNOT");
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id);
            if (target.id == "219021504334135296")
                return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Ban", message);
            if (!(targetid == null)) {
                if (!targetid.bannable)
                    return sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message);
                targetid.ban();
                var thingyEmbed = 'Banning <@' + target.id + ">";
                sendCustomEmbedMessage(thingyEmbed, "Ban", message);
            }
        }
    }
    catch (_a) {
        sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message);
    }
}
function kick(message) {
    try {
        var mentions = message.mentions, author = message.author;
        var target = mentions.users.first();
        var guildSenderPermissions = message.guild.members.cache.get(author.id).permissions;
        if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN KICK");
        }
        else {
            sendCustomEmbedMessage("You do not have permission to kick", "Kick", message);
            return console.log("CANNOT");
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id);
            if (target.id == "219021504334135296")
                return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Kick", message);
            if (!(targetid == null)) {
                if (!targetid.kickable)
                    return sendCustomEmbedMessage("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)", "Kick", message);
                targetid.kick();
                var thingyEmbed = 'Kicking <@' + target.id + ">";
                sendCustomEmbedMessage(thingyEmbed, "Kick", message);
            }
        }
    }
    catch (_a) {
        sendCustomEmbedMessage("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)", "Kick", message);
    }
}
function setMute(message) {
    var guild = message.guild;
    var muteRole = guild.roles.cache.find(function (x) { return x.name == "MUTE"; });
    if (!muteRole)
        return console.log("Do -setup first to set it up");
    var channel = message.channel;
    channel.permissionOverwrites.create(muteRole, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: true });
    sendCustomEmbedMessage("Mute is setup and ready on this channel 😃", "Mute", message);
}
function setup(message) {
    var guild = message.guild, author = message.author, member = message.member;
    try {
        var muteRole = guild.roles.cache.find(function (x) { return x.name == "MUTE"; });
        if (message.member.roles.cache.has(muteRole.id)) {
            console.log("DONT MAKE ROLE");
        }
        else {
            console.log("DONT MAKE ROLE");
            sendCustomEmbedMessage("Setup is done and ready", "Setup", message);
        }
    }
    catch (_a) {
        console.log("MAKE ROLE");
        guild.roles.create({
            name: "MUTE",
            color: "RED",
            reason: "mute",
            mentionable: false,
            permissions: [
                "READ_MESSAGE_HISTORY", "ADD_REACTIONS"
            ]
        });
        sendCustomEmbedMessage("Setup is done and ready", "Setup", message);
    }
}
function Commands(message) {
    var messageContent = message.content.toLowerCase();
    if (messageContent.match(prefix + "kick")) {
        kick(message);
    }
    else if (messageContent.match(prefix + "ban")) {
        ban(message);
    }
    else if (messageContent == prefix + "help") {
        helpCommand(message);
    }
    else if (messageContent.match(prefix + "unban")) {
        unban(message);
    }
    else if (messageContent.match(prefix + "mute")) {
        mute(message);
    }
    else if (messageContent.match(prefix + "unmute")) {
        unmute(message);
    }
    else if (messageContent == prefix + "setup") {
        setup(message);
    }
    else if (messageContent == prefix + "setmute") {
        setMute(message);
    }
    else if (messageContent == prefix + "play?") {
        message.channel.send("Does anyone want to play? <@!517696139320098819> <@567507887992078336> <@219021504334135296> <@717568547823419403> <@695518091706237051>. From <@" + message.author.id + ">");
        message["delete"]();
    }
    else if (messageContent == prefix + "wow") {
        message.channel.send("w.o.w s.o c.o.o.l -<@" + message.author.id + ">");
        message["delete"]();
    }
}
client.on("messageCreate", function (message) {
    console.log("Server: " + message.guild.name + ", Channel: " + message.channel + ", Username: " + message.author.username + ", Message: " + message.content);
    if (message.content[0] == prefix) {
        Commands(message);
    }
});
client.login(process.env.TOKEN);
