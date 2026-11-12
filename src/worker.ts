import { execFile } from 'node:child_process'
import type { OrcaWorkerApi } from 'orca/worker'

// Why: the plugin API's terminal.create opens an orphaned PTY with no visible tab, so launch through the CLI,
// which registers the tab as a claude agent and focuses it. `--worktree active` resolves from the cwd ("/" in a worker),
// so the focused workspace is passed explicitly. The permission mode comes from Orca's agent launch settings.
export const ORCA_CLI = '/Applications/Orca.app/Contents/Resources/bin/orca'

export function launchArgs(workspaceId: string): string[] {
  return ['agent', 'launch', '--agent', 'claude', '--worktree', workspaceId, '--model', 'claude-fable-5-2', '--surface', 'terminal', '--focus', '--json']
}

export default function activate(orca: OrcaWorkerApi): void {
  orca.commands.register('fable.launch', async () => {
    const context = await orca.host.call('workspace.readContext', {})
    if (!context) return 'No focused workspace.'
    // Why: readContext returns no workspace id; workspace.list ids are `identity:<key>`, a valid CLI selector.
    const { workspaces } = await orca.host.call('workspace.list', {})
    const matches = workspaces.filter((w) => w.name === context.displayName && w.branch === context.branch)
    if (matches.length !== 1) return `Could not identify the focused workspace (${matches.length} matches).`
    return new Promise<string | undefined>((resolve) => {
      execFile(ORCA_CLI, launchArgs(matches[0].id), (error, stdout, stderr) => {
        if (!error) return resolve(undefined)
        orca.log(`launch failed: ${error.message} ${stderr} ${stdout}`)
        resolve(`Fable launch failed: ${stderr || stdout || error.message}`)
      })
    })
  })
}
