import fetch from 'node-fetch';

export default function sendPush(userkey:string, tokenkey:string, message: string) {
    fetch("https://api.pushover.net/1/messages.json?" + new URLSearchParams({ "token": tokenkey, "user": userkey, "message": message }), {method: "POST"}).then(response => {
      if (!response.ok) {
        console.log("Push failed to send :(")
      }
        return
    })
}