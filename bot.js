const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const { RichEmbed } = require("discord.js");

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Vicent Bot || by 지성", {type: "STREAMING"});
})

bot.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === ".관리자명령"){
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.cyan)
    .setTitle("관리자명령어")
    .setAuthor("관리자 명령어", message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .addField("**공지 : ** ``할말 공지 [진짜 할말]``")
    .setFooter("VicentBot | by 지성", bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});

  }

  if (cmd === "할말") {
    if (message.deletable) message.delete();

    if (args.length < 1)
      return message.reply("할말이 없으신가요?").then(m => m.delete(5000));

    const roleColor = message.guild.me.displayHexColor;

    if (args[0].toLowerCase() === "공지") {
      const embed = new RichEmbed()
          .setColor(roleColor)
          .setDescription(args.slice(1). join(" "));

      message.channel.send(embed);
    }
  }
});





bot.login(botconfig.token);
