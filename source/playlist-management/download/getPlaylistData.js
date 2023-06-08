import fetch from "node-fetch";
import { getSpotifyPlaylistId } from "../../common/utils/spotify.js";

const getPlaylistData = async (playlistLink, token) => {
  const playlistId = getSpotifyPlaylistId(playlistLink);

  const playlistResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  const playlistData = await playlistResponse.json();

  return playlistData;
};

export default getPlaylistData;
