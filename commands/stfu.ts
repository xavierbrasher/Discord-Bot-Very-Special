import * as discordJs from "discord.js"

export default function stfu(message:discordJs.Message) {
    const sarcasticComments = [ //all the satcastic comments
        "who asked", "idc bot frag", "absolute brash brash", "ur being an ezra", "SUCH A TROLL", "so fucking stupid", "where is your brain", "bot set math"
    ]
    var commentIndex = Math.floor(Math.random() * (sarcasticComments.length)) //randomly chooses 1
    message.channel.send(sarcasticComments[commentIndex] + " from <@" + message.author.id + ">") //sends it
    message.delete()
}