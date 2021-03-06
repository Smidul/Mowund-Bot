const Discord = require('discord.js');
const errors = require('../utils/errors.js');

module.exports = {
  name: 'addrole',
  category: 'Utils',
  description: 'Adicionar cargo à um membro.',
  callback: async ({ message, args, client }) => {
    if (message.channel.type === 'dm') return;

    //!addrole @Smidul VIP
    if (!message.member.hasPermission('MANAGE_ROLES'))
      return errors.noPerms(message, 'Gerenciar Cargos');
    if (args[0] == 'help') {
      message.reply('Uso: `!addrole <usuário> <cargo>`');
      return;
    }
    let rMember =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[0]);
    if (!rMember) return errors.cantfindUser(message.channel);
    let role = args.join(' ').slice(22);
    if (!role) return message.reply('Especifique um cargo!');
    let gRole = message.guild.roles.cache.find(`name`, role);
    if (!gRole) return message.reply('Não foi possível encontrar este cargo.');

    if (rMember.roles.has(gRole.id))
      return message.reply(`${rMember} já tem este cargo.`);
    await rMember.roles.add(gRole.id);

    try {
      await rMember.send(`Você ganhou o cargo ${gRole.name}`);
    } catch (e) {
      console.log(e.stack);
      message.channel.send(`<@${rMember.id}> ganhou o cargo ${gRole.name}.`);
    }
  },
};
