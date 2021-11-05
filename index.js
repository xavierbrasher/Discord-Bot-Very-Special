"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    var content = "You should start with -setup to setup the server and for each channel you would want mute command to work do -setmute\n\n-kick: To kick someone, syntax: -kick @SOMEONE\n\n-ban: To ban someone, syntax: -ban @SOMEONE \n\n-unban: To unban someone (do not use @), syntax: -unban NAME \n\n-play?: To @ people who usually plays, syntax: -play? \n\n-wow: To show how much you appreciate someones message, syntax: -wow \n\n-mute: To mute someone, syntax: -mute @SOMEONE \n\n-unmute: To unmute someone, syntax: -unmute @SOMEONE \n\n-spam: To spam someone, syntax: -spam @SOMEONE \n\n-stfu: To send a sarcastic messsage, syntax: -stfu \n\n-serverMute: To server mute someone, syntax: -serverMute @SOMEONE \n\n-unServerMute: To unServer mute someone, syntax: \n-unServerMute @SOMEONE";
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
        var mentions = message.mentions, guild = message.guild, author = message.author; //sets mentions, guild, author
        var MuteRole = guild.roles.cache.find(function (role) { return role.name === "MUTE"; }); //find the mute role
        var target = mentions.users.first(); //gets target as discord.js user
        var guildSenderPermissions = guild.members.cache.get(author.id).permissions; //gets the permissions of that user
        //checks the permissions
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
                //removes the mute role
                targetid.roles.remove(MuteRole);
                var thingyEmbed = 'Unmuted <@' + target.id + ">"; //gets message ready
                sendCustomEmbedMessage(thingyEmbed, "Unmute", message); //sends custom unmute message
            }
        }
    }
    catch (_a) {
        //checks for errors
        sendCustomEmbedMessage("Failed to unmute (Check permissions or Make sure it is right syntax -unmute @WHOEVER) or does not have the unmute role", "Mute", message);
        console.log("tried, failed");
    }
}
function unban(message) {
    var messageContent = message.content; //gets message content
    var partsOfMessage = "";
    //gets the string after the 7th letter
    for (var i = 0; i < messageContent.length; i++) {
        if (i >= 7) {
            partsOfMessage += messageContent[i];
        }
    }
    //logs the message
    console.log(partsOfMessage);
    var guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions; //gets the permissions
    //checks the permissions
    if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || message.author.id == "219021504334135296") {
        console.log("CAN BAN");
    }
    else {
        sendCustomEmbedMessage("You do not have permission to Unban", "Unban", message);
        return console.log("CANNOT");
    }
    try {
        var UnBanTarget = client.users.cache.find(function (user) { return user.username == partsOfMessage; }); //gets target
        //check if it exsists 
        if (!UnBanTarget)
            return sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message);
        message.guild.members.unban(UnBanTarget); //unbans the person
        var embedThingy = partsOfMessage + " has been unbanned";
        sendCustomEmbedMessage(embedThingy, "Unban", message);
    }
    catch (_a) {
        //catch an error
        sendCustomEmbedMessage("Unbanning Failed (Wrong syntax (-unban name) not @ or Cannot find user. Might have to manually unban", "Unban", message);
    }
}
function ban(message) {
    try {
        var mentions = message.mentions, author = message.author; //gets mentions, author
        var target = mentions.users.first(); //gets target
        var guildSenderPermissions = message.guild.members.cache.get(author.id).permissions; //gets permissions
        //check if has the permissions
        if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.BAN_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN BAN");
        }
        else {
            sendCustomEmbedMessage("You do not have permission to ban", "Ban", message);
            return console.log("CANNOT");
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id); //gets the guild member
            if (target.id == "219021504334135296")
                return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Ban", message);
            if (!(targetid == null)) { //if targetid doesnt exsist
                if (!targetid.bannable)
                    return sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message);
                targetid.ban(); //ban
                var thingyEmbed = 'Banning <@' + target.id + ">";
                sendCustomEmbedMessage(thingyEmbed, "Ban", message); //responce message
            }
        }
    }
    catch (_a) {
        //catchs error
        sendCustomEmbedMessage("Failed to ban (Check permissions or Make sure it is right syntax -ban @WHOEVER)", "Ban", message);
    }
}
function kick(message) {
    try {
        var mentions = message.mentions, author = message.author; //gets mentions, author
        var target = mentions.users.first(); //gets the first user mentioned
        var guildSenderPermissions = message.guild.members.cache.get(author.id).permissions; //gets the permissions
        //check the permissions
        if (guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.KICK_MEMBERS]) || guildSenderPermissions.has([discord_js_1.Permissions.FLAGS.ADMINISTRATOR]) || author.id == "219021504334135296") {
            console.log("CAN KICK");
        }
        else {
            sendCustomEmbedMessage("You do not have permission to kick", "Kick", message);
            return console.log("CANNOT");
        }
        if (target) {
            var targetid = message.guild.members.cache.get(target.id); //gets the target
            if (target.id == "219021504334135296")
                return sendCustomEmbedMessage("THATS DADDY I CANT 😦😩", "Kick", message);
            if (!(targetid == null)) { //if it exisist
                if (!targetid.kickable)
                    return sendCustomEmbedMessage("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)", "Kick", message);
                targetid.kick(); //kicks
                var thingyEmbed = 'Kicking <@' + target.id + ">";
                sendCustomEmbedMessage(thingyEmbed, "Kick", message); //responces
            }
        }
    }
    catch (_a) {
        //catchs the error
        sendCustomEmbedMessage("Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)", "Kick", message);
    }
}
function setMute(message) {
    var guild = message.guild; //gets guild of the message
    var muteRole = guild.roles.cache.find(function (x) { return x.name == "MUTE"; }); //finds mute role
    if (!muteRole)
        return console.log("Do -setup first to set it up"); //check if it exsists 
    var channel = message.channel; //sets it as a GuildChannel
    channel.permissionOverwrites.create(muteRole, { SEND_MESSAGES: false, READ_MESSAGE_HISTORY: true }); //changes the permissionOverwrites
    sendCustomEmbedMessage("Mute is setup and ready on this channel 😃", "Mute", message); //sends custom message
}
function setup(message) {
    var guild = message.guild, member = message.member; //gets guild, member
    try {
        var muteRole = guild.roles.cache.find(function (x) { return x.name == "MUTE"; }); //tries to get role
        if (member.roles.cache.has(muteRole.id)) { //check if the server has the role
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
        }); //makses the role
        sendCustomEmbedMessage("Setup is done and ready", "Setup", message);
    }
}
function spam(message) {
    try {
        var target = message.mentions.users.first(); //gets target
        if (target.id == "219021504334135296")
            return console.log("Thats xavier");
        for (var i = 0; i < 10; i++) { //spams it 10 times
            message.channel.send("<@" + target.id + ">");
        }
    }
    catch (_a) {
        message.channel.send("Error, syntax: -spam @SOMEONE");
    }
}
function stfu(message) {
    var sarcasticComments = [
        "who asked", "idc bot frag", "absolute brash brash", "ur being an ezra", "SUCH A TROLL", "so fucking stupid", "where is your brain", "bot set math"
    ];
    var commentIndex = Math.floor(Math.random() * (sarcasticComments.length)); //randomly chooses 1
    message.channel.send(sarcasticComments[commentIndex] + " from <@" + message.author.id + ">"); //sends it
    message["delete"]();
}
function serverMute(message) {
    return __awaiter(this, void 0, void 0, function () {
        var guildSenderPermissions, target, voiceChannel, customMessage, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions //gets permissions
                    ;
                    //checks permissions
                    if (!(guildSenderPermissions.has(discord_js_1.Permissions.FLAGS.MANAGE_CHANNELS) || guildSenderPermissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR) || message.author.id == "219021504334135296"))
                        return [2 /*return*/, sendCustomEmbedMessage("Do not have permission to do this", "Server Mute", message)];
                    target = message.mentions.members.first() //gets target
                    ;
                    voiceChannel = target.voice //gets the voice channel it is in
                    ;
                    return [4 /*yield*/, voiceChannel.setMute(true)]; //sets the mute
                case 1:
                    _b.sent(); //sets the mute
                    customMessage = "<@" + target.id + "> has been server muted" //sets up the message
                    ;
                    sendCustomEmbedMessage(customMessage, "Server Mute", message); //sends the message
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    sendCustomEmbedMessage("Server mute failed, Must be in a voice channel, syntax: -serverMute @SOMEONE", "Server Mute", message); //sends catch message
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function unserverMute(message) {
    return __awaiter(this, void 0, void 0, function () {
        var guildSenderPermissions, target, voiceChannel, customMessage, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    guildSenderPermissions = message.guild.members.cache.get(message.author.id).permissions //checks permissions
                    ;
                    if (!(guildSenderPermissions.has(discord_js_1.Permissions.FLAGS.MANAGE_CHANNELS) || guildSenderPermissions.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR) || message.author.id == "219021504334135296"))
                        return [2 /*return*/, sendCustomEmbedMessage("Do not have permission to do this", "UnServer Mute", message)];
                    target = message.mentions.members.first() //gets target
                    ;
                    voiceChannel = target.voice //check voice channel
                    ;
                    return [4 /*yield*/, voiceChannel.setMute(false)]; //sets mute to false
                case 1:
                    _b.sent(); //sets mute to false
                    customMessage = "<@" + target.id + "> has been server unmuted" //sets up message
                    ;
                    sendCustomEmbedMessage(customMessage, "UnServer Mute", message); //sends message
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    sendCustomEmbedMessage("UnServer mute failed, Must be in a voice channel, syntax: -unServerMute @SOMEONE", "UnServer Mute", message); //catches error
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function Commands(message) {
    var messageContent = message.content.toLowerCase(); //gets the content of message lower case
    //check which one it is
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
    else if (messageContent.match(prefix + "servermute")) {
        serverMute(message);
    }
    else if (messageContent.match(prefix + "unservermute")) {
        unserverMute(message);
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
        message.channel.send("Does anyone want to play? <@!517696139320098819> <@567507887992078336> <@219021504334135296> <@717568547823419403> <@695518091706237051> <@687826673608949801>. From <@" + message.author.id + ">");
        message["delete"]();
    }
    else if (messageContent == prefix + "wow") {
        message.channel.send("w.o.w s.o c.o.o.l from<@" + message.author.id + ">");
        message["delete"]();
    }
    else if (messageContent.match(prefix + "spam")) {
        spam(message);
    }
    else if (messageContent == prefix + "stfu") {
        stfu(message);
    }
    else if (messageContent == prefix + "id") {
        console.log(message.author.id);
    }
}
client.on("messageCreate", function (message) {
    console.log("Server: " + message.guild.name + ", Channel: " + message.channel + ", Username: " + message.author.username + ", Message: " + message.content); //logs the message
    if (message.content[0] == prefix)
        Commands(message); //if the first letter = to prefix than run commands
});
client.login(process.env.TOKEN); //logs in with the token
