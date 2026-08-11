import { useEffect, useMemo, useState } from 'react';

import { musicApi } from '@/services/musicApi';
import type { DiscoveryData, Song } from '@/types/music';

type View = 'home' | 'playlists' | 'rankings' | 'artists' | 'stations';

const navigation: Array<{ id: View; label: string; description: string }> = [
  { id: 'home', label: 'Home', description: 'Curated listening' },
  { id: 'playlists', label: 'Playlists', description: 'Collections for every mood' },
  { id: 'rankings', label: 'Charts', description: 'What is moving now' },
  { id: 'artists', label: 'Artists', description: 'Voices in the catalogue' },
  { id: 'stations', label: 'Stations', description: 'Stories and selections' },
];

const formatDuration = (durationMs: number): string => {
  const totalSeconds = Math.round(durationMs / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
};

const formatPlays = (count: number): string =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count);

const Cover = ({ label, accent, size = 'card' }: { label: string; accent: string; size?: 'card' | 'hero' | 'mini' }) => (
  <div className={`cover cover--${size}`} style={{ '--cover-accent': accent } as React.CSSProperties} aria-label={label} role="img">
    <span>{label.split(' ').map((word) => word[0]).join('').slice(0, 2)}</span>
  </div>
);

const Icon = ({ name }: { name: 'play' | 'pause' | 'next' | 'previous' | 'queue' | 'sparkle' }) => {
  const paths = {
    play: <path d="M7 5.5v13l11-6.5-11-6.5Z" />,
    pause: <><path d="M7 5h3v14H7z" /><path d="M14 5h3v14h-3z" /></>,
    next: <><path d="m5 5 9 7-9 7V5Z" /><path d="M14 5h3v14h-3z" /></>,
    previous: <><path d="m19 5-9 7 9 7V5Z" /><path d="M7 5h3v14H7z" /></>,
    queue: <><path d="M5 7h14" /><path d="M5 12h10" /><path d="M5 17h8" /><circle cx="18" cy="17" r="2" /></>,
    sparkle: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

function App() {
  const [view, setView] = useState<View>('home');
  const [data, setData] = useState<DiscoveryData>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueIsOpen, setQueueIsOpen] = useState(false);

  const loadDiscovery = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      setData(await musicApi.getDiscovery());
    } catch {
      setError('Music_emo could not load the catalogue. Check the data-source configuration and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDiscovery();
  }, []);

  const recentSongs = useMemo(() => queue.slice(0, 4), [queue]);
  const activeTitle = navigation.find((item) => item.id === view)?.label ?? 'Home';

  const selectSong = (song: Song) => {
    setQueue((items) => (items.some((item) => item.id === song.id) ? items : [song, ...items]));
    setCurrentSong(song);
    setIsPlaying(Boolean(song.audioUrl));
  };

  const moveInQueue = (direction: 1 | -1) => {
    if (queue.length === 0) return;
    const index = Math.max(0, queue.findIndex((song) => song.id === currentSong?.id));
    const nextIndex = (index + direction + queue.length) % queue.length;
    setCurrentSong(queue[nextIndex]);
    setIsPlaying(Boolean(queue[nextIndex].audioUrl));
  };

  const renderSongRow = (song: Song, index?: number) => (
    <button className="song-row" key={song.id} onClick={() => selectSong(song)} type="button">
      <span className="song-row__index">{index ? String(index).padStart(2, '0') : <Icon name="play" />}</span>
      <Cover label={song.cover.alt} accent={song.cover.accent} size="mini" />
      <span className="song-row__copy"><strong>{song.title}</strong><small>{song.artist.name} · {song.album}</small></span>
      <span className="song-row__duration">{formatDuration(song.durationMs)}</span>
    </button>
  );

  const renderHome = () => {
    if (!data) return null;
    const banner = data.banners[0];
    return (
      <>
        <section className="hero" style={{ '--hero-accent': banner.image.accent } as React.CSSProperties}>
          <div className="hero__copy"><span className="eyebrow"><Icon name="sparkle" /> Featured release</span><h1>{banner.title}</h1><p>{banner.subtitle}</p><button className="button button--primary" onClick={() => selectSong(data.playlists[0].tracks[0])} type="button"><Icon name="play" /> Start listening</button></div>
          <Cover label={banner.image.alt} accent={banner.image.accent} size="hero" />
        </section>

        {recentSongs.length > 0 && <Section title="Continue listening" action="View queue" onAction={() => setQueueIsOpen(true)}><div className="song-list">{recentSongs.map((song) => renderSongRow(song))}</div></Section>}
        <Section title="Made for this moment" action="All playlists" onAction={() => setView('playlists')}><div className="card-grid">{data.playlists.map((playlist) => <article className="music-card" key={playlist.id}><Cover label={playlist.cover.alt} accent={playlist.cover.accent} /><div><span className="card-meta">{playlist.tags.join(' · ')}</span><h3>{playlist.title}</h3><p>{playlist.description}</p></div><button aria-label={`Play ${playlist.title}`} className="play-button" onClick={() => selectSong(playlist.tracks[0])} type="button"><Icon name="play" /></button></article>)}</div></Section>
        <Section title="New releases" action="Browse albums" onAction={() => setView('artists')}><div className="album-strip">{data.albums.map((album) => <article className="album-card" key={album.id}><Cover label={album.cover.alt} accent={album.cover.accent} /><h3>{album.title}</h3><p>{album.artist.name} · {album.year}</p><button className="text-button" onClick={() => selectSong(album.tracks[0])} type="button">Play album</button></article>)}</div></Section>
        <Section title="Charts worth a second listen" action="Open charts" onAction={() => setView('rankings')}><div className="chart-grid">{data.rankings.map((ranking) => <article className="chart-card" key={ranking.id}><Cover label={ranking.cover.alt} accent={ranking.cover.accent} /><div><span className="card-meta">{ranking.description}</span><h3>{ranking.title}</h3>{ranking.tracks.slice(0, 3).map((song, index) => <button key={song.id} className="chart-track" onClick={() => selectSong(song)} type="button"><span>{String(index + 1).padStart(2, '0')}</span>{song.title}<small>{song.artist.name}</small></button>)}</div></article>)}</div></Section>
      </>
    );
  };

  const renderCollection = () => {
    if (!data) return null;
    if (view === 'playlists') return <Section title="Playlists"><div className="card-grid">{data.playlists.map((item) => <article className="music-card" key={item.id}><Cover label={item.cover.alt} accent={item.cover.accent} /><div><span className="card-meta">{formatPlays(item.playCount)} plays · {item.trackCount} tracks</span><h3>{item.title}</h3><p>{item.description}</p></div><button aria-label={`Play ${item.title}`} className="play-button" onClick={() => selectSong(item.tracks[0])} type="button"><Icon name="play" /></button></article>)}</div></Section>;
    if (view === 'rankings') return <Section title="Charts"><div className="ranking-list">{data.rankings.map((ranking) => <article className="ranking-panel" key={ranking.id}><header><Cover label={ranking.cover.alt} accent={ranking.cover.accent} /><div><span className="card-meta">Updated in mock mode</span><h3>{ranking.title}</h3><p>{ranking.description}</p></div></header>{ranking.tracks.map((song, index) => renderSongRow(song, index + 1))}</article>)}</div></Section>;
    if (view === 'artists') return <Section title="Artists and releases"><div className="artist-grid">{data.artists.map((artist) => <article className="artist-card" key={artist.id}><Cover label={artist.avatar?.alt ?? artist.name} accent={artist.avatar?.accent ?? '#7567D9'} /><div><h3>{artist.name}</h3><p>{artist.description}</p><button className="text-button" onClick={() => selectSong(data.albums.find((album) => album.artist.id === artist.id)?.tracks[0] ?? data.albums[0].tracks[0])} type="button">Play latest</button></div></article>)}</div></Section>;
    return <Section title="Stations"><div className="station-grid">{data.stations.map((station) => <article className="station-card" key={station.id}><Cover label={station.cover.alt} accent={station.cover.accent} /><div><span className="card-meta">Hosted by {station.host.name}</span><h3>{station.title}</h3><p>{station.description}</p><button className="button button--quiet" onClick={() => selectSong(station.tracks[0])} type="button"><Icon name="play" /> Play station</button></div></article>)}</div></Section>;
  };

  return <div className="app-shell">
    <aside className="sidebar"><a className="brand" href="#top" onClick={() => setView('home')}><span className="brand__mark">m</span><span>music<br /><em>emo</em></span></a><nav aria-label="Primary navigation">{navigation.map((item) => <button className={view === item.id ? 'nav-item nav-item--active' : 'nav-item'} key={item.id} onClick={() => setView(item.id)} type="button"><strong>{item.label}</strong><small>{item.description}</small></button>)}</nav><div className="sidebar__footer"><span className="status-dot" />Mock catalogue<br />No account required</div></aside>
    <main id="top" className="main-content"><header className="page-toolbar"><div><p className="eyebrow">Music_emo / {import.meta.env.VITE_DATA_SOURCE ?? 'mock'} mode</p><h2>{activeTitle}</h2></div><button className="queue-toggle" onClick={() => setQueueIsOpen((open) => !open)} type="button"><Icon name="queue" /> Queue <span>{queue.length}</span></button></header>
      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} onRetry={() => void loadDiscovery()} />}
      {!isLoading && !error && (view === 'home' ? renderHome() : renderCollection())}
    </main>
    {queueIsOpen && <aside className="queue-panel" aria-label="Playback queue"><header><div><span className="eyebrow">Up next</span><h2>Queue</h2></div><button aria-label="Close queue" className="icon-button" onClick={() => setQueueIsOpen(false)} type="button">×</button></header>{queue.length ? <div className="song-list">{queue.map((song) => renderSongRow(song))}</div> : <div className="empty-state"><Icon name="queue" /><h3>Your queue is clear</h3><p>Choose a song from any collection to begin.</p></div>}</aside>}
    <footer className="player"><div className="player__track">{currentSong ? <><Cover label={currentSong.cover.alt} accent={currentSong.cover.accent} size="mini" /><div><strong>{currentSong.title}</strong><small>{currentSong.artist.name} · {currentSong.album}</small></div></> : <><span className="player__placeholder" /><div><strong>Nothing selected</strong><small>Pick a track to start a queue</small></div></>}</div><div className="player__controls"><div><button aria-label="Previous track" className="icon-button" disabled={!currentSong} onClick={() => moveInQueue(-1)} type="button"><Icon name="previous" /></button><button aria-label={isPlaying ? 'Pause' : 'Play'} className="play-button play-button--large" disabled={!currentSong} onClick={() => setIsPlaying((playing) => !playing)} type="button"><Icon name={isPlaying ? 'pause' : 'play'} /></button><button aria-label="Next track" className="icon-button" disabled={!currentSong} onClick={() => moveInQueue(1)} type="button"><Icon name="next" /></button></div><p>{currentSong?.audioUrl ? 'Audio preview ready' : currentSong ? 'Mock playback controls — no external audio requested' : 'Select a song to begin'}</p></div><button className="queue-toggle player__queue" onClick={() => setQueueIsOpen((open) => !open)} type="button"><Icon name="queue" /><span>{queue.length}</span></button></footer>
  </div>;
}

function Section({ title, action, onAction, children }: { title: string; action?: string; onAction?: () => void; children: React.ReactNode }) {
  return <section className="section"><header className="section__header"><h2>{title}</h2>{action && <button className="text-button" onClick={onAction} type="button">{action} <span aria-hidden="true">→</span></button>}</header>{children}</section>;
}

function LoadingState() {
  return <div className="loading-state" aria-live="polite"><span /><span /><span /><p>Preparing your listening room…</p></div>;
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <section className="error-state" role="alert"><span className="eyebrow">Catalogue unavailable</span><h1>There is nothing to load yet.</h1><p>{message}</p><button className="button button--primary" onClick={onRetry} type="button">Try again</button></section>;
}

export default App;
