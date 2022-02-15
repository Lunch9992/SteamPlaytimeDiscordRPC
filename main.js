const yaml = require('js-yaml')
const fs = require('fs');
const DiscordRPC = require('discord-rpc');
const SteamAPI = require('steamapi');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
var config;
/*                              */
const steamId = config.steamid;
const steamApi = config.steamapi;
const steamGameName = config.SteamGameName;
const clientId = config.clientid;
/*                              */
const steam = new SteamAPI(steamApi);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function consoleErrorMessage(err) {
  console.log(`\x1b[31m-------------------------------------- CRITICAL ERROR --------------------------------------\n\n\x1b[31mAn unexpected error has occurred:\n\x1b[33m${err}\n\n\x1b[31m--------------------------------------------------------------------------------------------\x1b[0m`);
}

(async () => {
  try {
    setInterval(() => {
      try {
        config = yaml.load(fs.readFileSync('./config.yml', 'utf8'));
      } catch (err) {
        consoleErrorMessage(err);
      }
    }, 5e3)
    console.log(`##############################\n#                            #\n#  Steam to Discord Game RP  #\n#     has been launched      #\n#                            #\n##############################\nInitialising Config.. (this will take 15 seconds)`)
    await sleep(15000);
    if (steamApi == "CHANGE_THIS" || steamId == "CHANGE_THIS" || steamGameName == "CHANGE_THIS") {
      console.log(`\x1b[31m-------------------------------- ERROR --------------------------------\n\n\x1b[31m- Please edit the \x1b[33mconfig.yml \x1b[31mfile and make sure it is setup correctly.\n\n\x1b[31m-------------------------------- ERROR --------------------------------\x1b[0m`)
      process.exit(1);
    }
    console.log(`Config initialised. It will auto update any values that change every 5 seconds.`)
    DiscordRPC.register(clientId);
    async function setActivity() {
      if (!rpc) return console.log('No RPC Found')
      try {
        var summary = await steam.getUserOwnedGames(steamId);
        var gameArr = [];
        summary.map(sum => gameArr.push(sum.name));
        fs.writeFileSync('./ownedgames.txt', `# HERE ARE ALL VALID GAMES THAT YOU CAN USE\n\n${JSON.stringify(gameArr, null, "\t")}`);
        for (let i = 0; i < summary.length; i++) {
          if (summary[i].name !== steamGameName) continue;
          rpc.setActivity({ details: `${steamGameName}`, state: `Total: ${Math.round(summary[i].playTime / 60 * 100) / 100 + " hrs"}\nPast 2w: ${Math.round(summary[i].playTime2 / 60 * 100) / 100 + " hrs"}`, largeImageKey: config.LargeImageName, largeImageText: config.LargeImageText, smallImageKey: config.SmallImageName, smallImageText: config.ImageImageText, instance: false, buttons: [{ label: "Steam", url: `https://eon.gg/s/${steamId}` }, { label: "Pantheon", url: "https://eon.gg/" }] });
        }
      } catch (err) {
        consoleErrorMessage(err);
      }
    }
    rpc.on('ready', () => {
      setActivity();
      setInterval(() => setActivity(), 15e3);
    });
    rpc.login({ clientId })
  } catch (err) {
    consoleErrorMessage(err);
  }
})();