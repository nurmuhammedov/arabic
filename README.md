# arabic

React 19 + Vite client for a Quranic Arabic vocabulary trainer, installable as
a PWA. Students study with spaced repetition and work through the ṣarf, ḥurūf,
naḥw and pattern curricula; admins curate the shared dictionary.

Deployed at **[arab-tilim.vercel.app](https://arab-tilim.vercel.app)**. The API
lives in [`nurmuhammedov/arabic-server`](https://github.com/nurmuhammedov/arabic-server).

## Start here

The project handbook — architecture, decisions, the traps that fail silently,
and what is left to do — is **`HANDBOOK.md` in the server repository**. Read it
before changing anything here. Section 6 covers this client specifically.

## Running it

Needs Node 22+ and pnpm 10+. Start the API first, then:

```
pnpm install
pnpm dev            # port 7070, reachable from a phone on the same network
```

`VITE_BASE_URL` is left empty on purpose: over HTTPS the client asks for a
relative `/api` path, which Vercel rewrites to the API, so the browser only
ever sees one origin and the auth cookies stay first-party. Setting it — here
or in the Vercel dashboard — breaks that.

## Testing the PWA

`pnpm dev` serves no service worker, so nothing is installable from it. Use:

```
pnpm build && pnpm preview
```

Installing also requires HTTPS, which a LAN address cannot give. For phone
testing, tunnel it:

```
cloudflared tunnel --url http://localhost:7070
```

Tunnel domains are already allowed in `vite.config.ts`.

## Checks

```
pnpm run typecheck
pnpm run lint
pnpm run build
```

All three must stay clean. `typecheck` does not cover `vite.config.ts`; the
build does.
