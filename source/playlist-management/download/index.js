import downloadPlaylist from "./downloadPlaylist.js";

const download = async (request, response, next) => {
  try {
    const { body } = request;

    const archive = await downloadPlaylist(body.playlistLink);

    response.status(200).attachment(`${body.downloadName}.zip`);

    archive.pipe(response);

    archive.finalize();
  } catch (error) {
    next(error);
  }
};

export default download;
