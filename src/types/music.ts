export type MusicSource = 'mock' | 'api';

export interface ImageAsset {
  src?: string;
  alt: string;
  accent: string;
}

export interface Artist {
  id: string;
  name: string;
  avatar?: ImageAsset;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album: string;
  cover: ImageAsset;
  durationMs: number;
  audioUrl?: string;
}

export interface LyricLine {
  timeMs: number;
  text: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: ImageAsset;
  trackCount: number;
  playCount: number;
  tags: string[];
  tracks: Song[];
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  cover: ImageAsset;
  year: number;
  tracks: Song[];
}

export interface Station {
  id: string;
  title: string;
  host: Artist;
  cover: ImageAsset;
  description: string;
  tracks: Song[];
}

export interface Ranking {
  id: string;
  title: string;
  description: string;
  cover: ImageAsset;
  tracks: Song[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: ImageAsset;
}

export interface DiscoveryData {
  banners: Banner[];
  playlists: Playlist[];
  albums: Album[];
  artists: Artist[];
  stations: Station[];
  rankings: Ranking[];
}

export interface MusicApi {
  getDiscovery(): Promise<DiscoveryData>;
  getPlaylist(id: string): Promise<Playlist | undefined>;
  getRanking(id: string): Promise<Ranking | undefined>;
  getAlbum(id: string): Promise<Album | undefined>;
  getArtist(id: string): Promise<Artist | undefined>;
  getStation(id: string): Promise<Station | undefined>;
  getSong(id: string): Promise<Song | undefined>;
  getLyrics(songId: string): Promise<LyricLine[]>;
}
