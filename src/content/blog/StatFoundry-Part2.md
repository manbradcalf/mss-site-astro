---
title: "StatFoundry - Part 2"
description: "Peyton Manning is the Meanest QB in the NFL"
pubDate: 2025-08-26
author: "Ben"
tags:
  [
    "Football",
    "NFL",
    "Labs",
    "AI",
    "LLM",
    "ChatGPT",
    "RAG",
    "GraphRAG",
    "Technical",
    "User Testing",
    "StatFoundry",
    "Development",
  ]
image: "/images/blog/StatFoundryPartTwo/mean.png"
---

<img src="/images/blog/StatFoundryPartTwo/mean.png"/>

### The New Direction

It is the Spring of 2025. Everyone at work is now using ChatGPT, for better or for worse, including myself.

Unwinding after a long day spent deciphering whether pull requests or Teams messages were authored by ChatGPT or real people, I turned on the the NFL draft and quickly had an epiphany.

In hindsight, it was probably the least unique or interesting epiphany one could have given the particular moment in time.

> "What if I just had ChatGPT to do it for me?"

"It", of course, being the heavy lifting of reviving my beloved yet decrepit [Fantasy Football Factory](statfoundry-part1), so it can finally meet it's full, graph native potential.

What if I simply told ChatGPT what I wanted from this knowledge graph of the NFL I had been building?

Would it then just... write the perfect [Cypher](https://en.wikipedia.org/wiki/Cypher_(query_language)) query?

### Introducing: The Fantasy Football Oracle

Fueled by the possibilities that an LLM could bring to my abandoned passion project, I sketched up a UI one night. The world was my oyster.

<figure class="carousel-container" data-carousel-id="fforacle">
  <div class="carousel-wrapper">
    <div class="carousel-slides">
      <img src="/images/blog/StatFoundryPartTwo/fforacle1.png" alt="FF Oracle Screenshot 1" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle2.png" alt="FF Oracle Screenshot 2" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle3.png" alt="FF Oracle Screenshot 3" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle4.png" alt="FF Oracle Screenshot 4" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle5.png" alt="FF Oracle Screenshot 5" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle6.png" alt="FF Oracle Screenshot 6" />
      <img src="/images/blog/StatFoundryPartTwo/fforacle7.png" alt="FF Oracle Screenshot 7" />
    </div>
  </div>
  <figcaption class="carousel-caption">The original Fantasy Football Oracle design. Type, Get Suggestions, Select, Repeat</figcaption>
</figure>

The idea was simple: "Google for deep-dive football stats", with one important tweak.

Instead of executing a search when you select a suggestion, you can optionally just add the suggestion to your query to get more relevant suggestions.

#### The Search UX

1. Type something
2. Get Suggestions
3. Select a suggestion
4. Edit a suggestion <i>(optional: for numeric info like stats)</i>
5. Repeat
6. Search with the query you built via The Oracle's suggestions

The UX emulated a pattern I thought would be very familiar to anyone who has used Google.

So...everybody?

But I was getting way ahead of myself. I had to validate my idea before I built it. 

Let's just start with the search bar.  We'll tackle suggestions later...

<a id="instagram-user-research"></a>
### User Research: Instagram Edition

I've always enjoyed user research.

I was lucky enough to spend most of my career on teams that took user research very seriously.

After seeing real users in your target demographic take all but 10 minutes of a Zoom call to unwittingly expose just how little you understand about _your own application_, it becomes an essential part of any development process.

All that to say, I had a blast doing some DIY user research on Instagram.

I asked the following 4 questions over the course of a couple days and got a not-insignificant amount of responses (30-50 per question). To increase feedback, the questions were asked about "Sports" statistics in general, not specifical the "NFL".

<figure class="carousel-container" data-carousel-id="survey">
  <div class="carousel-wrapper">
    <div class="carousel-slides">
      <img src="/images/blog/StatFoundryPartTwo/why are you looking up stats.PNG" alt="Why are you looking up stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/what kind of stats.PNG" alt="What kind of stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/How do you get your stats.PNG" alt="How do you get your stats survey question" />
      <img src="/images/blog/StatFoundryPartTwo/how easy is it avg.jpeg" alt="Average difficulty score for finding stats" />
    </div>
  </div>
  <figcaption class="carousel-caption">Quick and dirty user research using Instagram Stories</figcaption>
</figure>

### Takeaway: Curious Lads just Google it, baby!

In hindsight, I thought this was a lot more validating for my Football Oracle design than it actually was.

- Yes, the single search bar was a familiar UX pattern
- Yes, people look up stats simply out of curiosity.

While this boded well for my design -- a simple Search Bar driven UX, I completely overlooked the slider that said _"You know, finding stats is not so bad actually..."._

And crucially, these weren't _really_ the users I should target.

My goal was never to build for the "Everyone Who Follows Me On Instagram" demographic.

But it didn't matter. I had made up my mind. I was going to do this thing, and knowing that most people are simply Curious Lads who just Google it, baby, was enough validation for me to build the Oracle.

<i>Authors note: Eventually, I moved off the "Oracle" branding. This was partially due to domain availability as well as the fact that "Oracle" is actually a pretty bad confusing metaphor for what the app does, which is explicitly **not** to predict the future, but to drudge up the past instead. </i>

### From RAGs to Riches?

So I got my OpenAI API key and I was off to the races.

Before I even knew what [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) was, I had a dead simple, no frills RAG pipeline, injecting my entire (relatively small) Neo4j schema into my ChatGPT prompts.

```mermaid
sequenceDiagram
    participant React UI
    participant FastAPI
    participant Neo4j
    participant OpenAI

    Note over React UI,FastAPI: App Startup
    React UI->>FastAPI: GET /schema
    FastAPI->>Neo4j: Fetch schema
    Neo4j-->>FastAPI: Return schema
    FastAPI-->>React UI: Cache schema

    Note over React UI,FastAPI: Search Flow
    React UI->>FastAPI: POST /search (with search text)
    FastAPI->>OpenAI: Send prompt (schema + user text)
    OpenAI-->>FastAPI: Return generated Cypher query
    FastAPI->>Neo4j: Execute Cypher query
    Neo4j-->>FastAPI: Return query results
    FastAPI-->>React UI: Return results
```

It was really cool, amazing even! I could ask it multi-hop queries in plan English, like 

> "Which Super Bowl was won by a QB who played for the Packers, Jets and Vikings but was drafted by Atlanta?"

and it would _usually_ return several lines of valid Cypher, neatly traversing Player, Game, Team and Draft nodes to provide real answers backed by real data!

<figure>
<img src="/images/blog/StatFoundryPartTwo/SBGraph.png"/>
<figcaption className="carousel-caption">Don't you just love a graph?</figcaption>
</figure>


_But_, if I asked a question more than once, it would return a slightly different query... _sometimes_. 

I was starting to question the scalability of this. 

If I had thousands of users how would I ensure they all have the same experience? Not to mention the token economics of using ChatGPT at scale like this...

At the end of the day, even though I had provided ChatGPT with the schema along with a note explicitly stating that this was _THE ONLY SCHEMA_ it still hallucinated labels, relationships, and worst of all, my intent.

<a id="serendipitous-example"></a>

#### Serendipitous Example of Intent Hallucination:

_Just now_, I asked ChatGPT (well, Claude technically) to write Cypher for the prompt we just mentioned.

The response looks great at first and it would run and return seemingly valid data. 

However, it wouldn't return the correct answer, Super Bowl XXXI, because it wouldn't find the correct QB, Brett Favre. 

Even those unfamiliar with Cypher syntax may be able to spot the flaw below.

Again, here's the prompt:

>“Which Super Bowl was won by a QB who played for the Packers, Jets and Vikings but was drafted by Atlanta?”

```cypher
// Find QBs drafted by Atlanta who played for specific teams and won a Super Bowl
MATCH (qb:Player)-[d:DRAFTED_BY]->(falcons:Team {name: 'ATL'})
WHERE qb.position = 'QB'
MATCH (qb)-[p:PLAYED_FOR]->(team:Team)
WHERE team.name IN ['GB', 'NYJ', 'MIN']
WITH qb, count(DISTINCT team.name) as teamsPlayed
WHERE teamsPlayed = 3
MATCH (qb)-[:WON]->(game:Game)
RETURN qb.name, game.name, game.date
```

Tecnically, Brett Favre _also_ played for ATL. But that was implied, not explicity stated.

ChatGPT, for whatever reason, decided to look for QBs who played for 3 teams and 3 teams only. GB, NYJ and MIN.


### User Testing

Now that the prototype was up and running, I asked a friend of mine try it out.

I'm glad I did, because the absurdity of the questions he'd ask confirmed my new apprehensions.

The question that tore the wool from my eyes:

> "Who is the meanest quarterback in the NFL?"

<a id="meanest-qb"></a>
### Peyton Manning - the MOAT

<img src="/images/blog/StatFoundryPartTwo/mean.png"/>

And sure enough, like the good little LLM it is, ChatGPT dutifully generated a Cypher query despite all common sense.

I wish I could find the Cypher query that was generated, but I can tell you it was at least 40 lines long and had several aggregations.

I _think_ it interpreted "meanest" as "the most mean", AKA average.

Naturally it decided to determine who the most average quarterback in the NFL was by determining which QB has the highest average ("meanest") passing touchdowns, presumably over a season, but we can't quite really be sure.

It also did not once check for [unsportsmanlike conduct](https://www.youtube.com/watch?v=DttfyOeU3vw) penalties or [sideline tirades](https://youtu.be/onLrDX83AyE?t=47).

I know this because I hadn't indexed that data (yet)

### Takeaways

- Writing valid and schema-correct Cypher is only half the battle
- Extracting intent is _much_ harder.
- Validating intent is even harder than that. 
- If there is a million ways to ask one question, then there is also a million ways to misinterpret it.

### Lingering Questions
- What if we implicitly meant "meanest, _currently active_ QB"?
- How explicit do we need the users to be?
- How explicit do the users expect _they_ need to be?
- Should we expect users to know how to optimize their prompts for us?
  - No, probably
- How do we guide users toward "askable" questions?
- Can you sanitize input for...intent?
- At what point does the prompt engineering effort outweight the benefits of using an LLM?
- How do we balance flexibility with accuracy?
- How do we catch less obvious hallucinations?
- How do we validate the LLM's interpretation of the data?
  - Since then, I have heard good things about [BAML](https://boundaryml.com/)?

### Answers: Back to the Foundry

When they zig, Medcalf Software Solutions zags.

No more AI. Just chunks. Of Queries. And chains. And chains of chunks of queries chained together.

Stick around for Part 3 where I pivot to good old deterministic systems and design quite possibly the first **Dynamically Generated Schema Aware DSL For User Friendly Graph Native Query Composition**

Or _DGSASSLFUFGNQC_ for short.

I never said I was good at branding.

