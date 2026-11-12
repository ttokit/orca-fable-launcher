# Fable Launcher

Orca で `Cmd+Opt+Shift+T` を押すと、今開いている workspace に Fable（`claude-fable-5-2`）の Claude Code タブを開いて前面に出す。権限モードは Orca のエージェント起動設定に従う。

## インストール

前提: macOS で Orca を `/Applications` に入れ、Claude Code を使える状態にしておく。

1. Orca の Settings → Plugins でプラグインを有効にする（`orca plugin system on` でもよい）
2. GitHub からインストールする

   ```sh
   orca plugin install ttokit/orca-fable-launcher
   ```

3. 承認を求められるので、表示された権限を確認し、出力にある fingerprint を付けて再実行する

   ```sh
   orca plugin install ttokit/orca-fable-launcher --approve <fingerprint>
   ```

4. Orca で `Cmd+Opt+Shift+T` を押して、Fable のタブが開けば完了

更新は `orca plugin update ttokit.fable-launcher` で行う。

## 開発

clone したフォルダから入れる場合は、`orca plugin install .` を使う。

```sh
orca plugin test .
orca plugin validate .
orca plugin install .                  # ファイルや権限を変えたら再承認が要る
orca plugin logs local.fable-launcher  # 起動しないときはここを見る
```
