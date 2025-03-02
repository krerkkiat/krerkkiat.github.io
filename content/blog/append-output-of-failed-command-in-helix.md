+++
title = "Capturing the output of a failed command in helix"
date = 2025-03-02
authors = ["Krerkkiat Chusap"]

[taxonomies]
tags=["shell"]
+++

Some commands will set its exit code to a non-zero even when there are some output
we need. One of them is [typos, a spell checker written in Rust](https://github.com/crate-ci/typos), which make sense since the existence of the typos is
the failure state.

The problem occurs when I want to also use its output in helix. When I use `:append-output typos`
(`:insert-output` is also available), the command will just fail saying that the `typos` command
exit with code `2`.

A quick way to force to read the output is to pipe the output of `typos` into `tee`. `tee` can write to
a target file and standard output at the same time. Unless `pipefail` is set, the shell will
also consider the whole command to be a success.

So the final command is

```shell
:append-output typos | tee
```

For this particular problem of checking the typos in the file, however, I should just use [the LSP server
for `typos`](https://github.com/tekumara/typos-lsp).
