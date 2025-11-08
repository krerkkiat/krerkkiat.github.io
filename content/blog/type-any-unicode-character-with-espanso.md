+++
title = "Type any Unicode character with Espanso"
date = 2025-11-08
authors = ["Krerkkiat Chusap"]

[taxonomies]
tags=["espanso", "random-thought", "problem"]
+++

Couple days ago while I was adding bookmarks to [the PDF books by Ajarn Supee](https://www.ajsupee.com/showbooks), I have to type in
a Sansakrit character, Yamakkan (`U+0E4F`). It is not on the Thai keyboard layout. After a couple fail attempts at using the `Alt+X` method, I gave up and turn to Espanso.

[Espanso](https://espanso.org/) is a text expansion application written in Rust. I used it some times ago while working as a Research Assistant in designing an ontology (See [gh:krerkkiat/espanso-ontology](https://github.com/krerkkiat/espanso-ontology)).

In this case, we will use Espanso's matching rule to type in the Yamakkan character. We can start by running

```shell
espanso edit
```

to open its match file in an editor. Then we can add a new matching rule.

```yaml
matches:
  - trigger: ":yamakkan"
    replace: "\u0e4e"
```

Then when I type `:yamakkan` it will get replaced with the Yamakkan character.
