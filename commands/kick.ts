import sendCustomEmbedMessage from "../components/sendCustomEmbedMessage";
import { Permissions } from "discord.js";
import * as discordJs from "discord.js";

export default function kick(message: discordJs.Message) {
  try {
    const { mentions, author } = message; //gets mentions, author
    const target = mentions.users.first(); //gets the first user mentioned
    const guildSenderPermissions = message.guild.members.cache.get(
      author.id
    ).permissions; //gets the permissions
    //check the permissions
    if (
      guildSenderPermissions.has([Permissions.FLAGS.KICK_MEMBERS]) ||
      guildSenderPermissions.has([Permissions.FLAGS.ADMINISTRATOR]) ||
      author.id == "438670084307812352"
    ) {
      console.log("CAN KICK");
    } else {
      sendCustomEmbedMessage(
        "You do not have permission to kick",
        "Kick",
        message
      );
      return console.log("CANNOT");
    }
    if (target) {
      var targetid = message.guild.members.cache.get(target.id); //gets the target
      if (target.id == "219021504334135296")
        return sendCustomEmbedMessage(
          "THATS DADDY I CANT 😦😩",
          "Kick",
          message
        );
      if (!(targetid == null)) {
        //if it exisist
        if (!targetid.kickable)
          return sendCustomEmbedMessage(
            "Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)",
            "Kick",
            message
          );
        targetid.kick(); //kicks
        let thingyEmbed = "Kicking <@" + target.id + ">";
        sendCustomEmbedMessage(thingyEmbed, "Kick", message); //responces
      }
    }
  } catch {
    //catchs the error
    sendCustomEmbedMessage(
      "Failed to kick (Check permissions or Make sure it is right syntax -kick @WHOEVER)",
      "Kick",
      message
    );
  }
}
