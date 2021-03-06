const Discord = require('discord.js');

module.exports = {
  name: 'afk',
  category: 'Utils',
  description: 'Coloca uma tag [AFK] no seu nick.',
  callback: async ({ message, args, client }) => {
    if (message.channel.type === 'dm') return;

    let gNick = message.member.displayName;
    const nick = gNick.replace(/\[AFK\] /g, '');

    if (gNick === nick) {
      message.member.setNickname(`[AFK] ${nick}`);
      message.channel.send(`O seu nick foi setado para \`[AFK] ${nick}\`.`);
    } else {
      message.member.setNickname(nick);
      message.channel.send(`O seu nick foi resetado para \`${nick}\`.`);
    }
  },
};
