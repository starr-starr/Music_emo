import { findMockSong, mockDiscovery, mockLyrics } from '@/mocks/music';
import type { MusicApi } from '@/types/music';

const respond = async <T>(value: T): Promise<T> => {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 120));
  return value;
};

export const mockMusicApi: MusicApi = {
  getDiscovery: () => respond(mockDiscovery),
  getPlaylist: (id) => respond(mockDiscovery.playlists.find((item) => item.id === id)),
  getRanking: (id) => respond(mockDiscovery.rankings.find((item) => item.id === id)),
  getAlbum: (id) => respond(mockDiscovery.albums.find((item) => item.id === id)),
  getArtist: (id) => respond(mockDiscovery.artists.find((item) => item.id === id)),
  getStation: (id) => respond(mockDiscovery.stations.find((item) => item.id === id)),
  getSong: (id) => respond(findMockSong(id)),
  getLyrics: (songId) => respond(mockLyrics[songId] ?? []),
};
