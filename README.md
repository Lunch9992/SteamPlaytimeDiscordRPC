# SteamToDiscordStatsRPC

## Installation

#### Dependencies
  - [Node JS](https://nodejs.org/en/download/) - Tested Version: `v16.13.0`
  - [Steam API Key](https://steamcommunity.com/dev/apikey)


#### Method

1) Download the contents of the repo into a ZIP
2) Unzip the contents into its own folder
3) Edit the `config.yml` and replace all the necessary info
4) Run `start.bat`


## Automatically Run the Client when you start your PC

Go to your Microsoft Start Menu program folder (Generally `C:\Users\<YOUR_USER>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs`)

Create a file called `auto-rpc.vbs`, ensure it has the **VBScript Script File** file type.

Add the following code, however replace the directory listed with the directory leading to the installed repo files:
```sh
Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\freel\Downloads\SteamToDiscordStatsRPC"
shell.Run "start.bat"
```