import { MessageEmbed } from "discord.js"
import * as discordJs from "discord.js"

export default function helpCommand(message:discordJs.Message) {
    let {channel} = message
    const receivedEmbed = message.embeds[0]
    //Sets the content of the help command
    let content = "You should start with -setup to setup the server and for each channel you would want mute command to work do -setmute\n\n-kick: To kick someone, syntax: -kick @SOMEONE\n\n-ban: To ban someone, syntax: -ban @SOMEONE \n\n-unban: To unban someone (do not use @), syntax: -unban NAME \n\n-play?: To @ people who usually plays, syntax: -play? \n\n-wow: To show how much you appreciate someones message, syntax: -wow \n\n-mute: To mute someone, syntax: -mute @SOMEONE \n\n-unmute: To unmute someone, syntax: -unmute @SOMEONE \n\n-spam: To spam someone, syntax: -spam @SOMEONE \n\n-stfu: To send a sarcastic messsage, syntax: -stfu \n\n-serverMute: To server mute someone, syntax: -serverMute @SOMEONE \n\n-unServerMute: To unServer mute someone, syntax: \n-unServerMute @SOMEONE"
    //sets up the embed
    const exampleEmbed = new MessageEmbed(receivedEmbed).setTitle("Help").setDescription(content).setColor(0x7635cc).setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png")
    //sends it
    channel.send({ embeds: [exampleEmbed] })
}