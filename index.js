const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require("./config.json")
const serverStats = {
    guildID: '548313138139758592',
    totalUsersID: '594464536568922112'
};
client.commands = new Discord.Collection();

client.login(config.token)

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === 'js');
    if(commandes.length <= 0) return console.log('[LOGS] Aucune commandes trouvé !');

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`[LOGS] ${f} chargé`);

    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir('./Events/', (error, f) => {
    if(error) console.log(error);
    console.log(`[LOGS] ${f.length} events en chargement`)

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split('.')[0];

    client.on(event, events.bind(null, client));
    });
});

client.on("guildMemberAdd", member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`Joueur : ${member.guild.memberCount}`);
});

client.on("guildMemberRemove", member => {
    if (member.guild.id !== serverStats.guildID) return;
    client.channels.get(serverStats.totalUsersID).setName(`Joueur : ${member.guild.memberCount}`);
});

client.on('ready', ready => {
    setInterval(function() {
        client.user.setActivity('San Andreas Rp', { type: 'PLAYING' });
    }, 5000)    
});