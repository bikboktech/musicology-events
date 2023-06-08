import downloadPlaylist from "./downloadPlaylist.js";
import getPlaylistData from "./getPlaylistData.js";

const download = async (request, response, next) => {
  try {
    const { body, context } = request;

    const archive = await downloadPlaylist(body.playlistLink);

    const playlistData = await getPlaylistData(
      body.playlistLink,
      context.spotifyToken
    );

    console.log(playlistData);

    const fileName = `${playlistData.name}.zip`;

    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );
    response.setHeader("Content-Type", "application/zip");

    archive.pipe(response);

    archive.finalize();
  } catch (error) {
    next(error);
  }
};

export default download;
