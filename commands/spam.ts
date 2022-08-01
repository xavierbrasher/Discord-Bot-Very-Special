import discordJs from "discord.js"

export default function spam(message:discordJs.Message) {
    let {channel} = message 
    try {
        const target = message.mentions.users.first() //gets target
        if (target.id == "219021504334135296") return console.log("Thats xavier")
        for (let i = 0; i < 10; i++) { //spams it 10 times
            channel.send("<@"+target.id+">")
        }
    } catch {
        message.channel.send("Error, syntax: -spam @SOMEONE")
    }
}