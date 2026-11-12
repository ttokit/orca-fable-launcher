import { assert, mountWorker, test } from 'orca/testing'
import * as main from './worker'

test('launches claude on Fable in the given workspace and focuses it', () => {
  const args = main.launchArgs('identity:wt2:local:x')
  const at = (flag: string) => args[args.indexOf(flag) + 1]
  assert.equal(at('--agent'), 'claude')
  assert.equal(at('--model'), 'claude-fable-5-2')
  assert.equal(at('--worktree'), 'identity:wt2:local:x')
  assert.ok(args.includes('--focus'))
})

test('does not guess when the focused workspace is ambiguous', async () => {
  const worker = await mountWorker(main)
  const ws = (id: string) => ({ id, kind: 'worktree' as const, name: 'x', path: `/w/${id}`, branch: 'main', hostId: null })
  worker.host.respond('workspace.readContext', { branch: 'main', displayName: 'x', terminals: [] })
  worker.host.respond('workspace.list', { workspaces: [ws('a'), ws('b')], truncated: false })
  assert.equal(await worker.command('fable.launch'), 'Could not identify the focused workspace (2 matches).')
  await worker.deactivate()
})
