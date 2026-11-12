# Fable Launcher

A guard (`src/worker.ts`) on the `terminal.send` hook: before Orca, the CLI or a plugin types text into a terminal, the worker can refuse it with `{ deny }` or pass it on. `"onError": "deny"` in `orca-plugin.json` makes a crash or timeout refuse the send too. `orca plugin test .` runs `src/worker.test.ts` with `orca/testing`; with the folder loaded, `orca plugin dev hook . terminal.send --data '{"terminalId":"t1","text":"rm -rf /","enter":true,"inputKind":"driving"}'` prints what the chain decides.

## Develop

```sh
orca plugin validate .
orca plugin dev watch .    # loads this folder into Orca and prints its logs and reloads; Ctrl-C unloads it
```

Orca names the publisher after where the plugin is installed from: the GitHub or GitLab owner of
its repository, or `local` for a folder. See
https://github.com/stablyai/orca/blob/main/docs/reference/plugin-authoring.md.
