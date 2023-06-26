const getSpotifyPlaylistId = (playlistUrl) => {
  const parts = playlistUrl.split("/");
  return parts[parts.length - 1];
};

export { getSpotifyPlaylistId };
