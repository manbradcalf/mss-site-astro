---
title: "Googling for a Super Bowl"
description: "What happens when you apply Google's PageRank algorithm to the NFL? Turns out, graphs can tell you things win-loss records can't."
pubDate: 2026-02-06
author: "Ben Medcalf"
tags: ["Football", "NFL", "Graph Databases", "PageRank", "Technical", "Labs"]
image: "/images/blog/googling-for-a-super-bowl/hero.png"
---

<figure style="text-align:center">
<img src="/images/blog/googling-for-a-super-bowl/hero.png" alt="NFL PageRank Graph" />
<figcaption style="font-size: 0.9em; color: #666; text-align: center; margin-bottom: 1.5rem">The 2025 NFL Season, Presented By PageRank</figcaption>
</figure>

Every football fan has heard it: _"They haven't beat anyone."_

It's the go-to dismissal of a team with a good record and a weak schedule. But who has the time to back that up with quantifiable data? Well, as it turns out, I do.

## PageRank 101

Let's start with a brief internet history lesson.

Some of you may remember Yahoo.com. Some of you may even remember [the yodel](https://www.youtube.com/watch?v=iC1a8xXQQDo). You could find whatever you wanted on Yahoo! This is because Yahoo paid a bunch of humans to manually index the internet, tagging what pages were important and which ones were not, by hand.

As you can imagine, that isn't terribly efficient, and as the internet started to explode in size and complexity during the late 90s and early 2000s, their solution didn't scale.

Enter Google and their revolutionary [PageRank algorithm](https://en.wikipedia.org/wiki/PageRank).

Rather than relying on humans to index the entire internet with subjective judgement calls regarding a webpage's "relevance" to any given keyword, what if you could instead determine a webpage's keyword relevance by analyzing the topology of the internet itself with computers?

<figure>
<img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Page_rank_animation.gif" alt="PageRank in action" />
<figcaption style="font-size: 0.9em; color: #666; text-align: center; margin-bottom: 1.5rem">PageRank in action</figcaption>
</figure>

In the original Brin & Page paper, PageRank achieves this by modeling the internet as an interconnected graph of nodes (webpages) and edges (links) that share a fixed amount of "votes" or "influence". It then iteratively "walks the graph" and redistributes the love. Its path is influenced by the number of links pointing to a node and the importance of where those links come from.

You can do this in any domain if you are able to model it as a graph in a way that encodes a network of influence. You can also add weights to the edges, signaling to the algorithm that some node-to-node connections are more important than others. In our graph, we do precisely this by weighing each game result by the margin of victory. Blowouts matter.

By treating football teams like Google treats webpages, we can rank them the same way — by quantity (wins) _and_ quality (who).

For example, in Google Search, a few links from the New York Times are worth more than many from MedcalfSoftwareSolutions.com. Likewise, in the 2025 NFL season, two blowout wins over the New York Jets are worth less than one comeback win over the Seattle Seahawks.

## The NFL PageRank Graph(s)

So...I actually have 50 graphs. 2 graphs for each of the last 25 seasons.

Each graph below is a snapshot of a given season at a distinct point in time, going back to 2001.

### The distinct points in time

- **Reg Season**: Only include regular season games.
- **Reg + Playoffs (thru Conf)**: Where we are at time of writing, Feb 6 2026, 2 days before the Super Bowl. Teams continue to collect influence by beating good playoff teams.

<iframe src="/interactive/pagerank/index.html" width="100%" height="900" style="border:none; border-radius:12px; margin: 2rem 0; min-height: 1400px;" loading="lazy"></iframe>
<style>
  @media (min-width: 768px) {
    iframe[src*="pagerank"] { min-height: 900px !important; }
  }
</style>

<p style="text-align:center; margin-top: -0.5rem;"><a href="/interactive/pagerank/index.html" target="_blank">Open full-screen demo ↗</a></p>

### Interpreting a Season's PageRank Graph

Each node is a team, and each edge represents a game result weighted by the margin of victory. Votes, influence, credit, whatever you want to call it, flow to the victor. When a team loses to another team, they give away their influence proportional to the margin of victory. In graph terms, edges point from the loser to the victor, weighted by margin of victory.

Run PageRank across the graph, and you get a power ranking for that season that accounts for transitive strength of schedule — not just who you beat, but who _they_ beat, and who _they_ beat, all the way through the league.

## Can PageRank predict Super Bowls?

Sort of. Using regular season data alone, the model picks the higher-ranked Super Bowl team as the winner. It gets it right **42% of the time** (10 of 24). That's worse than a coin flip.

But add playoff results through the conference championship, and it jumps to **62% (15 of 24)**. That's not because playoff PageRank is a better power ranking — it's arguably worse, since teams haven't played the same number of games. Teams that advance further have more opportunities to accumulate PageRank, so the ranking is inherently biased toward deeper playoff runs. But as a prediction tool, the extra signal from playoff wins against good teams is clearly useful.

### How does that compare?

For a model that only knows point margins and graph structure — no rosters, no injuries, no home field — 62% holds up surprisingly well:

- **Vegas favorites** win the Super Bowl about [65% of the time](https://www.oddsshark.com/nfl/super-bowl/betting-odds-history) (37-20 all-time). That's the entire sports betting market's collective wisdom, and PageRank is within three points of it.
- **ESPN's FPI** and **FiveThirtyEight's Elo** both report [65-73% accuracy](https://fan-insider.com/espns-football-power-index-your-ultimate-guide-key-insights/) — but those numbers are measured across regular season games, where favorites win more predictably. Super Bowls are two good teams. Much harder to call.

PageRank is essentially matching the house on the hardest game of the year, using nothing but the shape of the graph.

## The 2007 Patriots broke the algorithm

This is my favorite finding.

The 2007 Patriots went 16-0. Undefeated. In the _LOST-TO_ graph, edges flow from losers to winners. The Patriots never lost — so they have zero outgoing edges. They're what graph theory calls a _sink node_. Score flows in, nothing flows out.

In Brin and Page's original PageRank paper, this is handled explicitly: you redistribute the dangling node's score evenly to all other nodes each iteration. It's like the random walker hitting a dead end and teleporting somewhere else.

Neo4j's Graph Data Science library skips this step. It's a performance optimization — sink nodes are rare in most real-world graphs. Web pages almost always link _somewhere_.

But an undefeated football team? That's a natural sink. And the result is dramatic: the total PageRank across all 32 teams in 2007 sums to **~19 instead of ~32**. Nearly 40% of the league's score just disappeared into the Patriots black hole.

Every other 32-team season in the dataset sums to ~30.76. The 2007 Patriots literally broke Neo4j's PageRank.

### The inverse doesn't break anything

You'd think the 2008 Lions (0-16) would cause the opposite problem. They're a pure _source_ node — 16 outgoing edges, zero incoming. They lost to everyone and beat nobody.

But the 2008 season total is a perfectly normal 30.76. Source nodes don't trap score; they _pump_ it into the system. The Lions just get the minimum teleportation baseline (~0.15) and rank dead last. They're actually _good_ for the graph — feeding score to everyone who beat them.

The asymmetry is elegant: sinks break PageRank, sources don't.

## The findings

**The 2004 Ravens were 9-7 and ranked #1 — with the highest PageRank in the dataset.** A score of 4.073, more than four times the league average. How? They beat the 15-1 Steelers by 17 points. Pittsburgh was a massive node — ranked #2 with a 3.933 — and Baltimore took a 17-point chunk of that. One dominant win over the most dominant team in the league pumped an enormous amount of score through the graph. PageRank working exactly as designed: rewarding quality over quantity.

**The 2010 Browns were 5-11 and ranked #2.** Peyton Hillis and the Cleveland Browns won five games that year. One of them was a 34-14 demolition of the Patriots, who finished the season ranked #1 with the highest score in that year's graph (3.746). That single win catapulted a terrible team to the second-highest PageRank in the league. The year before? #25. The year after? Dead last. PageRank doesn't care about your record — it cares about _who_ you beat and by _how much_.

<figure style="margin:8px; text-align:center">
<img src="https://upload.wikimedia.org/wikipedia/en/b/bc/Madden_12_official_cover.jpg" alt="Peyton Hillis on the cover of Madden NFL 12" />
<figcaption style="font-size: 0.9em; color: #666; text-align: center; margin-bottom: 1.5rem">Peyton Hillis on the cover of Madden NFL 12. The 2010 Browns went 5-11 but ranked #2 in PageRank.</figcaption>
</figure>

**The 2015 Falcons were 8-8 and ranked #2.** They beat the 14-0 Panthers by 7, spoiling Carolina's undefeated season. One upset over the best team in the league transferred a massive chunk of PageRank. The transitive property at work — beat the team that beat everyone, and you inherit a share of everyone they beat too.

**Baltimore is the algorithm's favorite franchise.** The Ravens finished #1 in regular season PageRank six times (2004, 2006, 2011, 2019, 2023, 2024) — more than any other team. No other franchise has more than four. And yet, Baltimore has zero Super Bowl appearances from the #1 position. The model keeps crowning them, and they keep letting the model down.

**The 2022 Chiefs won the Super Bowl ranked #11.** 14-3 record, but their wins just weren't impressive by PageRank standards. They won anyway, because Mahomes. Sometimes the algorithm can't account for a generational talent just deciding to win.

**2025: the NFC West dominates.** LA Rams and Seattle are 1-2, with San Francisco at #4. Three-quarters of a division in the top four is unusual.

## What's next

The 2004 Ravens, the 2010 Browns, and the 2015 Falcons all expose the same blind spot: a single blowout win over the right opponent can inflate a mediocre team's PageRank beyond what feels reasonable. The model is technically correct — they _did_ beat those teams by those margins — but it's missing context that would help separate signal from noise.

**Backup QB wins.** Did the 2010 Browns beat the _real_ Patriots, or did they catch a bad week? Beating the 12-4 Chiefs without Mahomes isn't the same as beating them with him. If the starting QB didn't play, reduce the edge weight. The win still counts, just worth less.

**Late-season games against resting starters.** The 2009 Panthers beat both New Orleans and Minnesota in the final weeks — but both teams had likely clinched playoff spots and were resting starters. Those wins inflate Carolina's PageRank artificially. Same discounting approach: detect "rubber match" situations and reduce edge weights.

**Context bonuses.** Division wins should be worth slightly more (teams know each other, game-plan harder). Road wins too (winning away is harder). Small multipliers that stack.

All of these use the same pattern: `edge_weight = margin * multiplier`. The infrastructure is there. It's a matter of sourcing the data — clinch dates, snap counts, game location — and tuning the multipliers against 25 seasons of Super Bowl results.

## The takeaway

Win-loss records lie. Point differential lies less, but still can't see _who_ you beat. PageRank captures something neither of those can: the recursive, transitive strength that flows through a season's worth of results.

So now, when someone tells me "Yeah, but the Vikings haven't beat anyone this year!", I have the data to back them up...

All game data sourced from [nflverse](https://github.com/nflverse) — an incredible open-source project that makes NFL data accessible to everyone. Thank you to the maintainers and contributors.

<div style="background: #fdf8ec; border: 1px solid #e0c868; border-radius: 12px; padding: 20px 24px; margin-top: 2rem;">
<strong style="font-size: 1.1rem;">A Vikings fan's prediction of the Sam Darnold vs Drake Maye Super Bowl</strong>
<br/><br/>
<strong>SEA 27</strong> - NE 24<br/>
<strong>Moneyline:</strong> Seattle (SEA -238 / NE +195)<br/>
<strong>ATS:</strong> NE +4.5<br/>
<strong>Props:</strong> There will be a DST TD
</div>
