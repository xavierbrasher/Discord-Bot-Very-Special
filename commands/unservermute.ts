import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage";
import { Permissions } from "discord.js";
import * as discordJs from "discord.js";

export default async function unserverMute(message: discordJs.Message) {
  try {
    const guildSenderPermissions = message.guild.members.cache.get(
      message.author.id
    ).permissions; //checks permissions
    if (
      !(
        guildSenderPermissions.has(Permissions.FLAGS.MANAGE_CHANNELS) ||
        guildSenderPermissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
        message.author.id == "438670084307812352"
      )
    )
      return sendCustomEmbedMessage(
        "Do not have permission to do this",
        "UnServer Mute",
        message
      );
    let target = message.mentions.members.first(); //gets target
    let voiceChannel = target.voice; //check voice channel
    await voiceChannel.setMute(false); //sets mute to false
    let customMessage = "<@" + target.id + "> has been server unmuted"; //sets up message
    sendCustomEmbedMessage(customMessage, "UnServer Mute", message); //sends message
  } catch {
    sendCustomEmbedMessage(
      "UnServer mute failed, Must be in a voice channel, syntax: -unServerMute @SOMEONE",
      "UnServer Mute",
      message
    ); //catches error
  }
}
