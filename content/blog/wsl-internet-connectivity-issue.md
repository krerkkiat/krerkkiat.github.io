+++
title = "WSL's Internet Connectivity Issue"
date = 2025-10-29
authors = ["Krerkkiat Chusap"]

[taxonomies]
tags = ["wsl"]
+++

Sometimes, my `ping 8.8.8.8` command running in the WSL will just hang there. Usually `wsl --shutdown` and re-open it will work in solving the issue.
However, there comes a time when I have to follow [JustSayin_thatuknow's advice on Reddit](https://www.reddit.com/r/bashonubuntuonwindows/comments/1aiejzz/comment/l4csl1p/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) to turn off `Large Send Offload Version 2 (IPv4)` and `Large Send Offload Version 2 (IPv6)` in the advanaced tab of the `Configure` of the WSL's Ethernet interface properties window. Another WSL reboot (e.g. `--shutdown` and reboot) is also needed if the changes are not working right away.

I do not know what the root cause is, but so far these stpes are working.
