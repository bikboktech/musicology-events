import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const folderName = "spotify";
const fileName = "config.json";

// Check if the folder already exists
fs.access(folderName, (err) => {
  if (err) {
    // If the folder does not exist, create it
    fs.mkdir(folderName, (err) => {
      if (err) throw err;
      console.log("Spotify folder created successfully");
      createConfigFile();
    });
  } else {
    // If the folder exists, delete it and its contents, then create it again
    fs.rm(folderName, { recursive: true }, (err) => {
      if (err) throw err;
      console.log("Spotify folder deleted successfully");
      fs.mkdir(folderName, (err) => {
        if (err) throw err;
        console.log("Spotify folder created successfully");
        createConfigFile();
      });
    });
  }
});

function createConfigFile() {
  // Create an object that will hold the data you want to write to the file
  const data = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    fallbackSearch: false,
  };

  // Check if the file already exists
  fs.access(`${folderName}/${fileName}`, (err) => {
    if (err) {
      // If the file does not exist, create it
      fs.writeFile(`${folderName}/${fileName}`, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("Config file created successfully");
      });
    } else {
      // If the file exists, overwrite its contents
      fs.writeFile(`${folderName}/${fileName}`, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("Config file overwritten successfully");
      });
    }
  });
}
