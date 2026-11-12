# Fable Launcher

`Cmd+Opt+Shift+T` opens a Claude Code tab on Fable (`claude-fable-5-2`) in the focused Orca workspace and focuses it.

The worker finds the focused workspace via `workspace.readContext` + `workspace.list`, then runs
`orca agent launch --agent claude --model claude-fable-5-2 --surface terminal --focus`.
The permission mode follows Orca's agent launch settings.

## Develop

```sh
orca plugin test .
orca plugin validate .
orca plugin install .          # re-approve when files or access change
orca plugin logs local.fable-launcher
```
