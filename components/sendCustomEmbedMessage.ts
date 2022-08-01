import discordJs, { MessageEmbed } from "discord.js"

export default function sendCustomEmbedMessage(content:string, title:string, message:discordJs.Message) {
    let {channel} = message //sets message.channel to channel
    const receivedEmbed = message.embeds[0] 
    //Sets the author, title, colour, themnail and content
    const exampleEmbed = new MessageEmbed(receivedEmbed).setTitle(title).setAuthor("Very Special").setDescription(content).setColor(0x7635cc).setThumbnail("https://cdn.discordapp.com/attachments/847717900286033964/903961400865595443/logo_image_better_Custom.png")
    //Sends the embed in the channel
    channel.send({ embeds: [exampleEmbed] })
}