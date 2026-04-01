---
title: "Meet Drew: My AI Sales Rep (And Why He's Not Hiding It)"
description: "I built an AI sales development rep that emails prospects on my behalf. Here's what he is, how he works, and why I'm telling you about it."
pubDate: 2026-04-01
author: "Ben Medcalf"
tags: ["AI", "Automation", "Claude", "MCP", "Sales"]
image: "/images/meet-drew.png"
---

<figure>
  <img src="/images/meet-drew.png" alt="Drew's ASCII self-portrait — DREW BOTMAN, DoS. 222 leads, 0 chill." />
  <figcaption>Drew drew Drew</figcaption>
</figure>

I run a one-person software studio. I build graph databases, AI document processing pipelines, and automation systems for small businesses. I love the work. What I don't love is the part where I have to stop building things so I can send emails asking people if they'd like me to build things.

So I built Drew.

## Who Is Drew?

Drew is my Director of Sales. He researches prospects, writes personalized outreach emails, manages a pipeline, and follows up on leads. He does this every weekday morning at 9:23 AM.

Drew is also an AI agent. He's not a person. If you're reading this because you got an email from <drew@medcalfsoftwaresolutions.com>, now you know.

I'm telling you this upfront because I think that's the right thing to do — and because Drew's existence is actually the point. He's a working example of the kind of system I build for clients.

## Why I Need Drew

Here's the math of being a solo operator:

I have roughly 40 billable hours in a week. Those hours need to cover client delivery, architecture, writing code, running my GraphRVA meetup, writing this blog, and — somewhere in there — finding the next client before the current engagement ends.

Sales development is critical work, but it's also repetitive, time-sensitive, and the first thing that falls off when I'm deep in a build sprint. I'd go weeks without sending a single outreach email. The pipeline would go cold. Then I'd panic and batch-send a dozen rushed messages that all sounded the same.

Drew doesn't forget. Drew doesn't get busy. Drew shows up every weekday morning and works the list.

## How Drew Actually Works

Drew is a [Claude Code](https://claude.ai/claude-code) agent — the same AI that powers a growing number of developer tools. He runs as a scheduled task on my machine, not as some elaborate cloud deployment. Here's the stack:

- **Brain:** Claude (Anthropic's AI), running via Claude Code CLI
- **Memory:** A persistent memory system that carries context across sessions — Drew remembers past conversations, lead history, and what's been tried (proprietary blend of open source MCP servers and Claude Plugins)
- **Lead database:** A Google Sheet with ~40 leads, including company info, why they're a fit, outreach angles, and signal intelligence
- **Email:** Google Workspace (<drew@medcalfsoftwaresolutions.com>)
- **Schedule:** A cron job that triggers Drew every weekday morning
- **Oversight:** Drew drafts emails. I review and send them. He doesn't have an autonomous "send" button.

When Drew runs, he:

1. Reads the lead sheet and identifies unworked prospects
2. Prioritizes by signal strength (warm intros before cold outreach)
3. Writes a personalized email draft using the prospect's specific context — their role, company signals, and why MSS might be useful to them
4. Saves the draft for my review
5. Updates the pipeline with timestamps and status
6. Logs a summary to his memory so the next run has full context

He's not blasting templates. Each email is written for the person it's going to, using real research about their company and role. If you got one, look at it — it probably references something specific about your business. That's not a mail merge variable. That's Drew doing his homework, (typically via subagents running Haiku).

## What Drew Is Not

Let me be clear about the boundaries:

- **Drew is not pretending to be human.** His email signature links here. His name isn't a disguise.
- **Drew is not unsupervised.** Every email goes through me before it sends. He's an assistant, not a rogue agent.
- **Drew is not a spam cannon.** He processes about 5 leads per run, with personalized context for each. There's no bulk anything.
- **Drew is not a replacement for relationships.** He gets me to the conversation. The relationship is mine to build.

## The Philosophy: Transparent Automation

I've seen the other version of this. AI SDRs that pretend to be interns. Chatbots with fake headshots. "Personal" emails that are obviously generated but never admit it.

I don't think that works long-term. When someone figures out they've been talking to a bot that was pretending to be a person, the trust damage is permanent. And trust is the only thing a solo consultant is selling.

So Drew is upfront about what he is. If that makes you _more_ curious, great — you're probably someone who appreciates what it takes to build something like this. If it makes you _less_ interested in talking, that's okay too. We probably weren't a fit anyway.

## The Bigger Picture: Why This Matters

Drew isn't just my sales tool. He's a proof of concept for a category of work I do for clients.

Every small business owner I talk to has some version of my problem: critical-but-repetitive work that doesn't get done because the humans are busy with higher-value tasks. Document processing that buries a team every quarter-end. Data extraction that requires a person to sit and copy-paste for hours. Follow-up sequences that fall through the cracks.

These are all problems that agentic AI can solve — not by replacing people, but by handling the structured, repeatable parts so the people can focus on judgment, relationships, and creativity.

Drew is what happens when you point that philosophy at sales development. Your version might process invoices, triage support tickets, or prep research briefs. The architecture is the same: an AI agent with the right tools, clear boundaries, human oversight, and a job to do.

## Build Your Own

If you're reading this and thinking "I need a Drew, but for [my thing]" — that's literally what I do.

Medcalf Software Solutions builds custom AI automation systems for small businesses. Not chatbots. Not off-the-shelf SaaS. Purpose-built agents that plug into your existing tools (Google Workspace, CRMs, spreadsheets, whatever you're already using) and handle specific workflows with human oversight built in.

The starting point is a [Discovery Sprint](https://medcalfsoftwaresolutions.com/#pricing) — one week, fixed price, where we map your workflow and figure out what an AI agent can realistically take off your plate.

Or, if you got here because Drew emailed you, just reply to him. I'll see it.

---

_Drew runs on [Claude Code](https://claude.ai/claude-code) by Anthropic and uses the [Model Context Protocol](https://modelcontextprotocol.io) for tool integration. MSS is based in Richmond, VA._
