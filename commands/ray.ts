import {MessageEmbed} from "discord.js"
import * as discordJs from "discord.js"

export default function ray(message:discordJs.Message) {
    let {channel} = message 
    try {
        const receivedEmbed = message.embeds[0] 
        //Sets the author, title, colour, themnail and content
        const exampleEmbed = new MessageEmbed(receivedEmbed).setTitle("Ray").setColor(0x7635cc).setImage("https://cdn.discordapp.com/attachments/847717900286033964/912671362890477618/ray_perm_2_2.jpg").setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png")
        //Sends the embed in the channel
        channel.send({ embeds: [exampleEmbed] })
        message.delete()
    }
    catch {
        channel.send("error occurred")
    }
}

