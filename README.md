# Music_emo

[![CI](https://github.com/starr-starr/Music_emo/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/starr-starr/Music_emo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A public React and TypeScript music-discovery interface built as a learning project. It demonstrates component composition, client-side routing, Redux Toolkit state management, responsive styling, and integration with a separately hosted music-data API.

> **Status:** active learning project. The application is not affiliated with, endorsed by, or a replacement for any music-streaming service. It is for educational and personal development use.

## What is included

- A Vite + React + TypeScript frontend
- Discover, playlist, ranking, album, artist, radio, and player views
- Redux Toolkit stores for discovery and playback state
- Configurable API base URL through `VITE_BASE_URL`

## Quick start

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- An API server compatible with the endpoints requested by this client

### Run locally

```bash
git clone https://github.com/starr-starr/Music_emo.git
cd Music_emo
npm ci
npm run dev
```

The development server runs on `http://localhost:3001` and proxies `/api` requests to `http://localhost:3000`. Start a compatible API server yourself, or change `VITE_BASE_URL` to the URL of an API you control.

For a production deployment, configure `VITE_BASE_URL` for your API or arrange for the hosting platform to proxy `/api`. No API server, music catalogue, account system, or credentials are included in this repository.

## Available scripts

```bash
npm run dev       # start the Vite development server
npm run build     # type-check and produce a production build
npm run lint      # run ESLint checks
npm run preview   # preview the production build
```

## Project boundaries and attribution

This repository contains an independently maintained frontend implementation. It is not an official client of any third-party music service. Do not use it to bypass a service's authentication, subscription, copyright, rate-limit, or terms-of-service requirements.

Some image assets may depict third-party brands or interfaces and may be subject to separate rights. See [ASSET_NOTICE.md](ASSET_NOTICE.md) before redistributing or deploying the project. Historical development referenced the [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) project; it is not bundled, guaranteed compatible, or endorsed here.

## Contributing and support

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and use the issue templates for bugs and feature requests. For non-security questions, open a GitHub issue. For potential security issues, follow [SECURITY.md](SECURITY.md).

The planned maintenance direction is recorded in [MAINTAINERS.md](MAINTAINERS.md).

## License

The original source code is released under the [MIT License](LICENSE). This license does not grant rights to third-party trademarks, service content, or assets excluded in [ASSET_NOTICE.md](ASSET_NOTICE.md).
