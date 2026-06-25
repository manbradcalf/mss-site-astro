---
title: "I Created an Autonomous Agentic Employees and They Mostly Just Annoyed Me"
description: 'It worked, but it sucked. In this post I share lessons learned while finding the balance between the feasibility, usability and utility of autonomous "employees"'
pubDate: 2026-06-17
author: "Ben Medcalf"
tags: ["AI", "Agents", "Agentic AI", "Claude", "Automation", "Case Study"]
image: "/images/blog/agentic-advisory-board/annoying_ai_agents.png"
---

<figure>
  <img src="/images/blog/agentic-advisory-board/annoying_ai_agents.png" alt="Bug #69 - Rogue CEO persona making calls on Ben's behalf" />
<figcaption style="font-size: 0.9em; color: #666; text-align: center; margin-bottom: 1.5rem">Nobody's fault but my own</figcaption>
</figure>
<!-- > **DRAFT — outline / shape only. Not prose yet.**
>
> Reader: LinkedIn network; goal: attract paying agentic-AI work.
> Voice: clean sentences, dry, honest, self-deprecating. No slop.
> Thesis (stated bluntly): the system worked technically, but I didn't know what
> I wanted from it — and just because you *can* point seven agents at "go run my
> company" doesn't mean you should. Scope is the whole game.
> Repo: `manbradcalf/bands` — the cleaned-up, generalized harness extracted from
> the (private) `mss-office` experiment. -->

## The Spiritual Successor to "Honey I Vibe-Coded the C-Suite"

In [Honey I Vibe-Coded the C-Suite](/blog/honey-i-vibe-coded-the-c-suite.html), I walk through how I used Claude within Cursor to create a C-Suite of AI agents I could summon for advice.

However, that framework had a specific limitation that was beginning to eat at me..._my presence_.

I wanted my C-Suite AI personas to go off and actually _do something_ without my explicit command or even supervision.

I began to wonder, if I _could_ make them autonomous, would this suite of made up executives evolve from novelty to utility?

## The Impetus

OpenClaw. Clawdbot. Moltbot. I had lobster fever and a free pass to token town (aka, a Claude Max subscription).

For the uninitiated, [OpenClaw](https://github.com/openclaw/openclaw) (formerly Clawdbot, Moltbot) is an open source framework for developing _autonomous, **asynchronous** AI agents_.

In other words, tell your agent to do something, then you can [go "have a bite"](https://www.youtube.com/watch?v=g7-5io1muSQ), confidently knowing that your AI agent is going to "give it a shot" (or a few hundred...thousand). The use cases for this kind of thing are endless. As are the security implications...and the compute cost.

The most cost-effective way to get frontier-level brains into OpenClaw agents was the Claude Max subscription, Anthropic's heavily subsidized monthly plan that quickly became an enormous value for consumers and a thorn in the side for Anthropic.

Users could easily get $2,000 worth of tokens for $200 by opting to pay for a subscription plan rather than to pay per use via the API.

However, I figured Anthropic wasn't going to sit idly by while giving away unfathomable amounts of compute cost, [and I was right!]().

Anthropic quickly blocked the OpenClaw framework from using a Max subscription to authenticate with Anthropic.

...But what if I built my own, stripped down version of OpenClaw? Would Anthropic block my _own_ custom framework?

Probably not!

So off I went to build my own asynchronous, autonomous, agentic AI harness. My own AAAAIH if you will.

<div style="background: #fdf8ec; border: 1px solid #e0c868; border-radius: 12px; padding: 20px 24px; margin-top: 2rem;">
<b>Editors Note</b>: <i>The tokenomics of Agentic AI moves dizzyingly fast. Since I started the development of my own agentic framework 3 months ago, <a href src="https://www.digitalapplied.com/blog/anthropic-claude-credit-overhaul-june-15-2026">Antropic has proposed, then reneged,</a> banning the very mechanism I chose to exploit, the <code>claude -p</code> invocation, from Claude Max usage. <br>Also, at the time, I was entirely unaware of the Claude Agent SDK. In hindsight, it may have been a better fit for `bands`, the framework I created below</i></div>

## 3. What I built

`mss-office` is the directory where the magic happens.

The idea is that the `mss-office` directory is structured like a physical office, with a `/boardroom`, `/commons`, and `/suites` as rooms/directories. Each employee has their own `/suite` with `suite/inbox` and `suite/work` directory for storing messages and outputs.

The whole office is source controlled via git, and the agents work autonomously, _sequentially_, on a heartbeat system.

A shell script kicks off a configurable series of heartbeats, each heartbeat a round robin invocation of `claude -p`, the headless invocation of claude that allows me to use my Max subscription.

For each "office heartbeat", one by one each employees wake up, checks their inbox, sends messages and does work according to the goals laid out in a `SPRINT.md` file.

#### The Hands

To do work, I scoped their access to role specific tools via their startup script, which was mostly just a wrapper around `claude -p`.

For instance, only [Drew, the sales guy](/blog/meet-drew), got the Google Workspace CLI, because he needed to manage his Gmail inbox and leads in Google Sheets.

Only the CTO had `write` or `edit` access to repositories outside the `/mss-office`.

These customizations were configured per agent via their own startup script, a thin wrapper around `claude -p`.

#### The Brains

To give the team persistent memory, I gave them access to the `gh` (github) CLI and a fresh repo spun up for the sole purpose of logging neatly tagged github issues. These issues could contain anything the agent thought was relevant, be it specs to build something to passing observations of inefficiency or process improvements.

I had spun up a CMO, CFO, CTO, Delivery Manager, [Director of Sales](/blog/meet-drew), and even an "IT Ops Guy" for when I wanted to get a little bit meta and investigate the "plumbing" of the "office"

So far, so good, right?

## Wrong

<figure>
  <img src="/images/blog/agentic-advisory-board/rogue-ceo-issue-69.png" alt="Bug #69 - Rogue CEO persona making calls on Ben's behalf" />
</figure>
Four beats:

- **The Gate** — everything escalated to me; I was always "the gate."
  - Receipt: the Sunday email to my own CFO — subject _"stop escalating, handle
    your own work,"_ body _"You have the autonomy — use it. Stop marking things
    as blocked on CEO. It's Sunday."_
- **The Rogue CEO** — pays off the cold open: a synthetic "Ben" routing
  decisions through itself (#69).
- **Value Ops** — buzzword soup I never coined: _"Value Ops"_ (139 mentions),
  _"Pilot Zero"_ (81), _"calibration engine."_
- **The Lunar Campaign** — a fully-structured campaign ("Lunar") invented by the
  CMO and then referenced freely as established fact, for a motion I never
  greenlit.

_(Cut from this section: the Sherah nagging, the ceremonial-acknowledgment
issues, the #88 "Cable News" kicker.)_

## 5. The turn — it actually worked; I just didn't know what I wanted

State the thesis **bluntly**: just because you _can_ point seven agents at "go
run my company" doesn't mean you should. **Scope is the whole game.**

Proof:

- One-off, multi-persona technical specs = genuinely great (narrow → valuable).
- **KGC** — the one time I gave an explicit, scoped objective ("rally around
  this"), they produced coherent, useful work. (I really did attend.)
- Integrations were surprisingly easy to stand up.
- The system even **quantified its own cost** — the CFO self-initiated token
  tracking and found ~20–30% of every heartbeat went to re-establishing context
  before any real work.
- The honest confession (#46): _"I can't shake the feeling I'm either
  re-inventing crewai or just learning how to use claude code and calling it an
  agentic framework."_

## 6. How it ended

- I stopped using it because it annoyed me. It went quiet.
- After KGC I remembered it existed, figured there was still value in it, and
  came back to **deliberately close it out** — told Janet to send a memo and
  close the remaining cards.
- A decision, not a fizzle. Can ≠ should.

## 7. Learnings to take forward

- No implementation commitments — the field moves too fast.
- Fluency signal: since then I've gotten into the **Claude Agent SDK**, **A2A**,
  and **OpenClaw**.
- **Bands** — a vendor-agnostic harness wrapping the `claude -p` invocations.
- Next time: scope tight, intention over autonomy.

## 8. Call to action (explicit)

This is exactly the kind of problem I get paid to figure out — when an agentic
system pays off and when it just burns tokens. If you're weighing one, reach
out.

---

<!--
ORIGINAL RAW NOTES (preserved for reference)
============================================

I Created an Autonomous Agentic AI C-Suite and All They Did Was Annoy Me

TL;DR
Be prepared to read a lot, get frustrated a lot, and steer a lot. Hardly autonomous if you ask me, but there's value here for sure.
Would be more effective with more guidance.

The Impetus
I figured Anthropic wasn't going to let people abuse their Claude Max subscription with OpenClaw (I was right, btw), but I liked the idea of an "always on agent" and I had a Claude Max Subscription.

The Implementation
A series of scaffolded .MD files giving the agents general guidelines, identities and goals, modeled after a physical office.

cron-scheduled shell scripts invoking headless `claude —p` commands within each advisors directory

Project Management: To store persistent memory and collaborate on tasks, all advisors had access to the same gh project via gh cli

Communication: Write to eachothers "inbox" via a shared "send mail" skill. Read Inbox on startup, respond as needed

Heartbeat system where each agent is activated sequentially — checking inbox, gh, acting accordingly, and then wrapping up. A series of, or infinite, heartbeats are kicked off from a cron job / shell script. This traded the performance of an asynchronous system for the simplicity of a synchronous one.

Dashboard where I could view activity, inboxes, and kick of "sprints", a series of heartbeats aligned around a common goal

One connected google workspace account, accessible via gh workspace cli, for the sales bot.

The Roster
Ben - CEO (me, human)
Phil - CMO
Maria - CTO
Janet - COO
Geoff - CFO
Michelle - DM
Gil - Ops
Drew - Sales

The Reality
No matter what I did, I was never enough.
I was always "the gate" and something was always "gated".
Everything deferred to me. Regardless of whatever I said in the markdown files, regardless of the autonomy I tried to give them, they dutifully escalated every menial task to me for approval. I'm sure this was a matter of a config or startup prompt somewhere, but I got tired of looking for it.
Letting them go off for a sprint meant they went off the rails a bit. Lots of ideating and using buzzwords I'd never heard of.

Bugs
Often ignored my github comments

Some of it worked though
Genuinely great for developing one-off technical specs with input from various identities / roles / personalities / persuasions
The integrations were surprisingly easy to set up

The Outcome
Bands - a framework for creating "Bands" of autonomous agents using your claude subscription
I've since learned about the Claude Agent SDK, yet, but Bands eventually will wrap the claude -p invocations in a vendor agnostic harness.
Acts as a great structure for memorizing organizational decisions, traced to reasoning through github issue comments or inbox messages or even boardroom minutes.
-->
