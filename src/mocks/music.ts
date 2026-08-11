import type {
  Album,
  Artist,
  Banner,
  DiscoveryData,
  ImageAsset,
  LyricLine,
  Playlist,
  Ranking,
  Song,
  Station,
} from '@/types/music';

const image = (alt: string, accent: string): ImageAsset => ({ alt, accent });

const artists: Artist[] = [
  { id: 'artist-aurora', name: 'Aurora Lane', description: 'Electronic songwriter and producer.', avatar: image('Aurora Lane', '#7567D9') },
  { id: 'artist-noah', name: 'Noah Field', description: 'Warm acoustic stories for quiet afternoons.', avatar: image('Noah Field', '#E08369') },
  { id: 'artist-mira', name: 'Mira Sol', description: 'A voice between city lights and slow mornings.', avatar: image('Mira Sol', '#42A49B') },
  { id: 'artist-jun', name: 'Jun Park', description: 'Beat-maker exploring soft rhythm and texture.', avatar: image('Jun Park', '#D5953E') },
];

const songs: Song[] = [
  { id: 'song-first-light', title: 'First Light', artist: artists[0], album: 'Afterglow', cover: image('Afterglow cover', '#7567D9'), durationMs: 224000 },
  { id: 'song-between', title: 'Between the Lines', artist: artists[1], album: 'Paper Skies', cover: image('Paper Skies cover', '#E08369'), durationMs: 198000 },
  { id: 'song-bloom', title: 'Slow Bloom', artist: artists[2], album: 'Small Hours', cover: image('Small Hours cover', '#42A49B'), durationMs: 241000 },
  { id: 'song-drift', title: 'Night Drift', artist: artists[3], album: 'Soft Focus', cover: image('Soft Focus cover', '#D5953E'), durationMs: 213000 },
  { id: 'song-window', title: 'Open Window', artist: artists[0], album: 'Afterglow', cover: image('Afterglow cover', '#7567D9'), durationMs: 187000 },
  { id: 'song-tender', title: 'Tender Weather', artist: artists[1], album: 'Paper Skies', cover: image('Paper Skies cover', '#E08369'), durationMs: 236000 },
];

const playlists: Playlist[] = [
  { id: 'playlist-daybreak', title: 'Daybreak', description: 'Soft electronics for a clear start.', cover: image('Daybreak playlist', '#7567D9'), trackCount: 6, playCount: 12400, tags: ['Focus', 'Electronic'], tracks: [songs[0], songs[2], songs[4]] },
  { id: 'playlist-unhurried', title: 'Unhurried', description: 'Songs that leave room to breathe.', cover: image('Unhurried playlist', '#E08369'), trackCount: 5, playCount: 9800, tags: ['Acoustic', 'Calm'], tracks: [songs[1], songs[5], songs[2]] },
  { id: 'playlist-nightwalk', title: 'Night Walk', description: 'Small rhythms for late streets.', cover: image('Night Walk playlist', '#42A49B'), trackCount: 6, playCount: 7300, tags: ['Indie', 'Late night'], tracks: [songs[3], songs[0], songs[4]] },
  { id: 'playlist-color', title: 'Color Study', description: 'Bright texture, gentle momentum.', cover: image('Color Study playlist', '#D5953E'), trackCount: 4, playCount: 5100, tags: ['Alternative', 'New'], tracks: [songs[2], songs[3], songs[1]] },
];

const albums: Album[] = [
  { id: 'album-afterglow', title: 'Afterglow', artist: artists[0], cover: image('Afterglow album', '#7567D9'), year: 2026, tracks: [songs[0], songs[4]] },
  { id: 'album-paper-skies', title: 'Paper Skies', artist: artists[1], cover: image('Paper Skies album', '#E08369'), year: 2025, tracks: [songs[1], songs[5]] },
  { id: 'album-small-hours', title: 'Small Hours', artist: artists[2], cover: image('Small Hours album', '#42A49B'), year: 2026, tracks: [songs[2]] },
  { id: 'album-soft-focus', title: 'Soft Focus', artist: artists[3], cover: image('Soft Focus album', '#D5953E'), year: 2025, tracks: [songs[3]] },
];

const rankings: Ranking[] = [
  { id: 'ranking-now', title: 'Listening Now', description: 'The most replayed tracks in this demo catalogue.', cover: image('Listening Now ranking', '#7567D9'), tracks: [songs[0], songs[2], songs[1], songs[3], songs[4]] },
  { id: 'ranking-new', title: 'Fresh Signals', description: 'Recent additions with quiet energy.', cover: image('Fresh Signals ranking', '#42A49B'), tracks: [songs[2], songs[4], songs[5], songs[0]] },
];

const stations: Station[] = [
  { id: 'station-studio', title: 'Studio Notes', host: artists[3], cover: image('Studio Notes station', '#D5953E'), description: 'Process, texture, and small discoveries.', tracks: [songs[3], songs[0], songs[2]] },
  { id: 'station-sunday', title: 'Sunday Room', host: artists[1], cover: image('Sunday Room station', '#E08369'), description: 'Unhurried songs and short conversations.', tracks: [songs[1], songs[5], songs[4]] },
];

const banners: Banner[] = [
  { id: 'banner-afterglow', title: 'Afterglow', subtitle: 'A soft new collection from Aurora Lane', image: image('Afterglow feature', '#7567D9') },
  { id: 'banner-daybreak', title: 'Daybreak', subtitle: 'A focused set for clear mornings', image: image('Daybreak feature', '#E08369') },
];

export const mockDiscovery: DiscoveryData = { banners, playlists, albums, artists, stations, rankings };

export const mockLyrics: Record<string, LyricLine[]> = {
  'song-first-light': [
    { timeMs: 0, text: 'The room begins to glow' },
    { timeMs: 18000, text: 'A quiet color at the window' },
    { timeMs: 42000, text: 'We take the morning slow' },
  ],
  'song-between': [
    { timeMs: 0, text: 'Leave a little space' },
    { timeMs: 24000, text: 'For the words between the lines' },
  ],
};

export const findMockSong = (id: string): Song | undefined => songs.find((song) => song.id === id);
