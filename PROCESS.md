# Process overview

## What I built

A redesign of [canberrarefugee.org.au](https://canberrarefugee.org.au) —
four static pages for Canberra Refugee Support, a Canberra not-for-profit
run entirely by volunteers.

Their site isn't ugly, which made this harder than I expected. The problem
is that it has ten menu items and three different places to read stories
about the families they help, and nowhere on the homepage tells you how to
contact them. It's built for people who already know CRS. Mine is built for
someone showing up for the first time — three doors instead of ten links:
volunteer, donate, or refer someone you know.

I stayed on the plain HTML/CSS/Vite setup the starter comes with. Astro is
the course default now, but I only had four pages sharing one header, and
the CLAUDE.md warns that Astro's base path is easy to get wrong on GitHub
Pages — it looks fine locally and every asset 404s on the live site. Not
worth it for the one thing it would have saved me.

## The moments that mattered

**I wrote down the facts before I wrote any prompts.**
[`0a202f8`](../../commit/0a202f8) is a fact sheet I put together by reading
CRS's own pages. While I was checking things I found three other sites with
wrong details about them — one had the wrong PO Box, one had an old email
address, one linked to a domain they don't use anymore. I wrote down each
one and why I ignored it. After that, every prompt told the agent to use
only that file. It never made anything up, including a phone number, which
CRS doesn't publish anywhere.

**The test the agent wrote would have passed on the wrong thing.**
It turned the spec into tests ([`ea0cd01`](../../commit/ea0cd01)), and the
one for "links to the real organisation" just checked that some external
link existed somewhere. My volunteer page links to Access Canberra for the
WWVP card, so that alone would have made it green without ever linking to
CRS. I changed it to check for their actual domain
([`ea0cd01...5ca97f7`](../../compare/ea0cd01...5ca97f7)).

**Putting rules in CLAUDE.md worked better than repeating myself.**
[`84e79fd`](../../commit/84e79fd) is where I wrote down the things it
couldn't work out on its own: no phone number, no street address, and don't
write the referral page as if the reader is the person who needs help,
because CRS's process is for someone else referring them. When it built the
first page it listed where every fact came from, and it spotted the PO Box
conflict without me asking.

**Opening the page found things reading the code didn't.**
The first homepage put the menu above the organisation's name, and stuck
"this is a student project" in the middle of the opening paragraph
([`24e9b7e`](../../commit/24e9b7e)). Later I noticed none of the four pages
had a link back to the homepage — you could click in and never get out
([`46710a4`](../../commit/46710a4)). Both looked fine in the diff.

**I deleted a test instead of making it pass.**
`spec/starter.test.ts` was checking for the template's
`data-testid="intro"`. I could have put the attribute back and gone green,
but the failure message says not to, and it would have meant nothing. So I
deleted it ([`4d37b79`](../../commit/4d37b79)).

**Two times I told it no.** It wanted to start a background server to look
at its own work — I already had one running, so I pointed it at
`agent-browser` instead. And when I asked it to put my real commit hashes
into the PROCESS.md template example, it pushed back: that example is about
a bug that never happened here, and real hashes would have made a made-up
story pass `check:evidence`. It was right.