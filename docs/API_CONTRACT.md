# Music_emo API contract

Music_emo is developed in `mock` mode by default. The production application may use an API only when it implements this contract and the deployer has the right to use its data and media.

## Configuration

| Variable | Allowed values | Purpose |
| --- | --- | --- |
| `VITE_DATA_SOURCE` | `mock`, `api` | Selects the bundled deterministic data source or a compatible HTTP API. |
| `VITE_BASE_URL` | Relative path or trusted public API URL | API base URL in `api` mode. It is public browser configuration, never a location for a secret. |

No authentication is required for mock mode. If a future compatible API requires authentication, the browser must only attach a token to an explicitly allowlisted same-origin or trusted API origin.

## Domain resources

The client consumes these resources. Responses may include extra fields, but the fields below are the stable application contract.

### Discovery

| Resource | Required fields |
| --- | --- |
| Banner | `id`, `title`, `subtitle`, `image`, `accent` |
| Playlist | `id`, `title`, `description`, `cover`, `trackCount`, `playCount`, `tags` |
| Album | `id`, `title`, `artist`, `cover`, `year`, `trackCount` |
| Artist | `id`, `name`, `avatar`, `description` |
| Station | `id`, `title`, `host`, `cover`, `description` |
| Ranking | `id`, `title`, `description`, `cover`, `tracks` |

### Playback

| Resource | Required fields |
| --- | --- |
| Song | `id`, `title`, `artist`, `album`, `cover`, `durationMs` |
| Lyrics | ordered `[{ timeMs, text }]`; an empty list represents “lyrics unavailable”. |

`audioUrl` is optional. When absent, the application renders the complete player interface in preview/unavailable state rather than attempting a network request.

## HTTP-mode endpoints

The adapter may map another API to the domain resources, but must present the same model to UI code.

| Method | Path | Result |
| --- | --- | --- |
| `GET` | `/discovery` | banners, playlists, albums, artists, stations and rankings |
| `GET` | `/playlists/:id` | playlist and tracks |
| `GET` | `/rankings/:id` | ranking and tracks |
| `GET` | `/albums/:id` | album and tracks |
| `GET` | `/artists/:id` | artist and related tracks |
| `GET` | `/stations/:id` | station and episodes/tracks |
| `GET` | `/songs/:id` | song detail |
| `GET` | `/songs/:id/lyrics` | ordered lyric lines |

Non-2xx responses must be converted to a typed client error. UI code must never render raw remote error messages as HTML.
