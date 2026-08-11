# Contributing to Music_emo

Thanks for considering a contribution. Small, focused pull requests are easiest to review.

## Before you start

1. Search existing issues and pull requests to avoid duplicate work.
2. Open an issue for substantial changes so the approach can be discussed first.
3. Do not submit credentials, copyrighted music, private API data, or third-party assets without redistribution rights.

## Local workflow

```bash
npm ci
npm run build
npm run lint
```

Use Node.js 18+ and npm 9+. The frontend needs a compatible API server; see the [README](README.md) for configuration details.

## Pull requests

- Keep each pull request scoped to one concern.
- Describe the user-facing impact and any API or configuration changes.
- Run `npm run build` before requesting review.
- Run `npm run lint` and either resolve findings or explain pre-existing warnings that are unrelated to your change.
- Update documentation when behavior, setup, or project boundaries change.

By contributing, you agree that your contribution is licensed under the repository's [MIT License](LICENSE), except for material that you explicitly identify as subject to different terms.
