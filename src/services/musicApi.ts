import { mockMusicApi } from '@/services/mockMusicApi';
import type { MusicApi, MusicSource } from '@/types/music';

const source: MusicSource = import.meta.env.VITE_DATA_SOURCE === 'api' ? 'api' : 'mock';
const baseUrl = import.meta.env.VITE_BASE_URL ?? '/api';

class MusicApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = 'MusicApiError';
  }
}

const request = async <T>(path: string): Promise<T> => {
  const response = await fetch(new URL(path, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString(), {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) throw new MusicApiError(`The music API returned ${response.status}.`, response.status);
  return response.json() as Promise<T>;
};

const httpMusicApi: MusicApi = {
  getDiscovery: () => request('/discovery'),
  getPlaylist: (id) => request(`/playlists/${encodeURIComponent(id)}`),
  getRanking: (id) => request(`/rankings/${encodeURIComponent(id)}`),
  getAlbum: (id) => request(`/albums/${encodeURIComponent(id)}`),
  getArtist: (id) => request(`/artists/${encodeURIComponent(id)}`),
  getStation: (id) => request(`/stations/${encodeURIComponent(id)}`),
  getSong: (id) => request(`/songs/${encodeURIComponent(id)}`),
  getLyrics: (id) => request(`/songs/${encodeURIComponent(id)}/lyrics`),
};

export const musicApi: MusicApi = source === 'api' ? httpMusicApi : mockMusicApi;
export { MusicApiError };
