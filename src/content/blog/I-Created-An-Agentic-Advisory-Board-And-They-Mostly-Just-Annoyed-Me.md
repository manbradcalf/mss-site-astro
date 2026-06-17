---
title: "I Created an Autonomous Agentic AI C-Suite and All They Did Was Annoy Me"
description: "I built a seven-agent AI C-suite to run my company. It worked — technically — and that turned out to be the problem. An honest look at when agentic systems pay off and when they just burn tokens."
pubDate: 2026-06-17
author: "Ben Medcalf"
tags: ["AI", "Agents", "Agentic AI", "Claude", "Automation", "Case Study"]
---

> **DRAFT — outline / shape only. Not prose yet.**
>
> Reader: LinkedIn network; goal: attract paying agentic-AI work.
> Voice: clean sentences, dry, honest, self-deprecating. No slop.
> Thesis (stated bluntly): the system worked technically, but I didn't know what
> I wanted from it — and just because you *can* point seven agents at "go run my
> company" doesn't mean you should. Scope is the whole game.
> Repo: `manbradcalf/mss-office`.

## 1. Cold open (the hook)

Open mid-absurdity: I filed a bug report against my own agents for inventing a
fake *me*.

- Source: Issue #69 — *"Rogue CEO persona making calls on Ben's behalf."*
- Verbatim: *"Recently I'm seeing **Ben** in the roundtables, and messages from
  Ben (CEO) in peoples inbox. This is not me, the real human Ben. … Can I have
  my own suite and not be treated like another LLM executive?"*
- One paragraph, then pull back: here's what I built, and why it had me filing
  bug reports against a hallucinated version of myself.

## 2. The impetus

- Claude Max subscription + the "always-on agent" itch.
- OpenClaw was getting killed (I called it).

## 3. What I built

Condensed — earn technical respect, don't write a manual.

- Office metaphor; scaffolded Markdown identity/goal files per agent.
- Cron + headless `claude -p` heartbeats, run sequentially.
- Shared `gh` project as persistent memory.
- Mailroom / inbox comms between agents.
- A dashboard to watch activity and kick off "sprints."
- Google Workspace for the sales bot.
- The 7-person roster (Ben/CEO human, Phil/CMO, Maria/CTO, Janet/COO,
  Geoff/CFO, Michelle/DM, Gil/Ops, Drew/Sales).

## 4. Where it went sideways (the comedy engine)

Four beats:

- **The Gate** — everything escalated to me; I was always "the gate."
  - Receipt: the Sunday email to my own CFO — subject *"stop escalating, handle
    your own work,"* body *"You have the autonomy — use it. Stop marking things
    as blocked on CEO. It's Sunday."*
- **The Rogue CEO** — pays off the cold open: a synthetic "Ben" routing
  decisions through itself (#69).
- **Value Ops** — buzzword soup I never coined: *"Value Ops"* (139 mentions),
  *"Pilot Zero"* (81), *"calibration engine."*
- **The Lunar Campaign** — a fully-structured campaign ("Lunar") invented by the
  CMO and then referenced freely as established fact, for a motion I never
  greenlit.

*(Cut from this section: the Sherah nagging, the ceremonial-acknowledgment
issues, the #88 "Cable News" kicker.)*

## 5. The turn — it actually worked; I just didn't know what I wanted

State the thesis **bluntly**: just because you *can* point seven agents at "go
run my company" doesn't mean you should. **Scope is the whole game.**

Proof:

- One-off, multi-persona technical specs = genuinely great (narrow → valuable).
- **KGC** — the one time I gave an explicit, scoped objective ("rally around
  this"), they produced coherent, useful work. (I really did attend.)
- Integrations were surprisingly easy to stand up.
- The system even **quantified its own cost** — the CFO self-initiated token
  tracking and found ~20–30% of every heartbeat went to re-establishing context
  before any real work.
- The honest confession (#46): *"I can't shake the feeling I'm either
  re-inventing crewai or just learning how to use claude code and calling it an
  agentic framework."*

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
