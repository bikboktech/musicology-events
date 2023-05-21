import deemix from "deemix";
import { Deezer } from "deezer-js";
import archiver from "archiver";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import { SPOTIFY_CONFIG, DEEZER_SETTINGS } from "../../common/data/config.js";

const BITRATE = 9;

const downloadPlaylist = async (playlistLink) => {
  const spotify = new deemix.plugins.spotify(__dirname + "/../../../");

  const dz = new Deezer();

  spotify.setCredentials(SPOTIFY_CONFIG.clientId, SPOTIFY_CONFIG.clientSecret);

  const deezerAccessToken = await deemix.utils.deezer.getAccessToken(
    process.env.DEEZER_EMAIL,
    process.env.DEEZER_PASSWORD
  );

  const arl = await deemix.utils.deezer.getArlFromAccessToken(
    deezerAccessToken
  );

  await dz.login_via_arl(arl);

  const Downloader = deemix.downloader.Downloader;

  const downloadObject = await deemix.generateDownloadObject(
    dz,
    playlistLink,
    BITRATE,
    {
      spotify,
    }
  );

  const convertedDownloadObject = await spotify.convert(
    dz,
    downloadObject,
    DEEZER_SETTINGS
  );

  const downloadJob = new Downloader(
    dz,
    convertedDownloadObject,
    DEEZER_SETTINGS
  );

  await downloadJob.start();

  const archive = archiver("zip", { zlib: { level: 9 } });

  const dir = path.join(__dirname, "/../../../downloads");

  archive.directory(dir, false);

  return archive;
};

export default downloadPlaylist;
