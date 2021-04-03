const Discord = require('discord.js')
const colors = require('../lib/colors.json')

module.exports = (client, channel) => {
    const settings = client.getSettings(channel.guild.id)
    const language = settings.language
    const lang = require("../lib/languages/" + language + ".json")

    if (settings.logChannelUpdates == 'true') {
        if (settings.modLogChannel && channel.guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
            const modLogChannel = channel.guild.channels.cache.find(c => c.name == settings.modLogChannel)
            if (!modLogChannel.permissionsFor(channel.guild.me).has('VIEW_CHANNEL')) return
            if (!modLogChannel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return

            const embed = new Discord.MessageEmbed()
                .setAuthor(`🗑️ ${lang.ChannelDeleted}`)
                .setColor(colors.red)
                .setDescription(`${lang.DeletedChannel} \`${channel.name}\``)
                .setTimestamp()

            modLogChannel.send(embed)
        }
    }
}