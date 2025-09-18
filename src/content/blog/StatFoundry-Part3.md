---
title: "StatFoundry - Part 3"
description: "Introducing the BIGRFS (Big Riffs) architecture"
pubDate: 2025-09-17
author: "Ben"
tags:
  [
    "Football",
    "NFL",
    "Labs",
    "Graph Databases",
    "Technical",
    "StatFoundry",
    "Development",
  ]
image: "/images/blog/StatFoundryPartThree/chunks\ as\ puzzle\ pieces.jpeg"
---

<figure>
  <img src="/images/blog/StatFoundryPartThree/chunks\ as\ puzzle\ pieces.jpeg" alt="Query Chunks are a lot like Puzzle Pieces" />
</figure>

### Intro

In the final entry of our StatFoundry series we will recap what we've learned and discuss how these learnings influenced the design behind the **BIGRFS** architecture, or **Buildtime Ingestion and Generation for Runtime Filters and Suggestions**, pronounced "Big Riffs". 

Believe it or not, the arconym came first.

Before we get into the nitty-gritty, let's recap.

### Wait, what are we doing again?

We're [building](/blog/statfoundry-part1) [StatFoundry](/blog/statfoundry-part2), which aims to be the easiest way to search for NFL stats on the internet.
At this point, we've tried enabling user friendly graph database searches by translating a user's question from natural language to something machine readable, like a Cypher query. This had mixed results.

### Takeaways from Parts 1 and 2

#### 1. Graph databases enable different kinds of queries.
By replacing costly, multi-table JOINS in relational databases with cheap node-to-node relationships (or edges) in graph databases, we can enable deeper, more specific queries that would be otherwise cost prohibitive or cumbersome in SQL. 

#### 2. Google is the default for searching stats
The most commonly used method of searching for stats online that users (i.e., [my friends](/blog/statfoundry-part2/#instagram-user-research)) reported was simply Googling them. 

The most common motive? Curiosity.

#### 3. A question's intent can get lost in translation

[A user's intent can be lost](/blog/statfoundry-part2/#serendipitous-example) when ChatGPT translated an English question into a Cypher query, _even though_ it was provided with the entire database schema and with examples as context.

Simple queries work great, but when translating the more complicated, multi-hop queries that make graph databases special, and by extension, our app, it is not reliable enough. 

As the complexity grows, so too do the opportunities for the LLM to hallucinate.

### Epiphany #1: Stats are not fuzzy

I was eager to use AI to supercharge my as-of-yet unnamed Graph Based NFL Search App and make a trillion dollars in the white-hot sports technology market. 

However, I quickly found that LLMs are much better at working with human language, where the end-user's expectations are more fluid, than programming languages, where the machine's expectations are rigid.

#### Human Languages are fuzzy.

By nature human language is fuzzy, expressive and pliable. 

This pliability is exactly what allowed us humble humans to build the world we live in today. A beautiful world where, for hours on end, you stare at a piece of glass littered with exuberant claims, emojis, bulleted lists and em-dashes while expecting it to help you get a job. 

It's non-deterministic nature enabled the evolution of language, which in turn enabled the evolution of thought, which got us all the way to the point this part of the blog where you're thinking "WTF is Ben talking about?"

But human language is _not_ deterministic. As LLMs are meant to imitate language, they inherit this fuzziness by design. This is why you might be seeing ontologies and knowledge graphs popping up more and more as they are great tools at building determinism into the amiguity of human language. BUT I DIGRESS

#### Programming Languages _are not_.

Asking an LLM to translate English to Spanish is one thing. Asking it to translate a Human Language to a Programming Language is another. Anyone who has vibe-coded can attest to this.

Yes, it compiles. Yes, it might even run! 

For an application like ours, there _is not_ room for multiple interpretations of statistical facts. 

Not only are numbers are much less pliable than language, they are particularly rigid for the person looking up stats. Users have different, much narrower expectations when asking a machine for a table of numbers than a summarization of a movie plot. They expect certain numbers to be formatted certain ways and to match exactly across all sources, otherwise, what's the point?

In the world of sports, stats are the the facts that make the game work. Not only are they deterministic, the are the determinators. They are the atomic units that _determine_ a win from loss, be it a game, parlay, or world record attempt.

Thus LLMs, trained to be highly powered, language predicting, educated-guess-machines, are not particularly well suited for the role of the silver bullet in our sports statistic search app.

The more I tried to wrangle an LLM into my stats search application, I felt I was slipping more and more into the "solution in search of a problem" trap. 

I decided to explore some "old-school", LLM-free solutions... 

### Introducing Agentic Users

> What if, instead of AI, the users wrote the queries?


If we give users tools to write their own queries, we can essentially "offload" the burden of intent deduction to the user. That's a win for us. Less to worry about! Less to test.

Also, now that we've given the user some of their agency back, we can _utilize_ this agency to enable things like the dynamic suggestions originally sketched up before I got distracted by LLMs as the plug and play solution to "google for stats".

<figure>
  <img style="margin: 0" src="/images/blog/StatFoundryPartTwo/fforacle2.png" alt="StatFoundry Data Flow" />
  <figcaption style="font-size: 0.9em; color: #666; text-align: center">
    <em>The original application design</em>
  </figcaption>
</figure>


---



These suggestions enable the user to explore the database _while_ querying it. This is something we could never do if we just made a better and better NLP pipeline for raw text. 

So where does this lead us? How do we enable suggestions? How do we ensure the suggestions are valid? How do these suggestions ultimately compile into valid Cypher, without the aid of an LLM?

### The Epiphany: Chunks!

No, not chunks of text. Chunks of queries. 



#### Wait, what's a Query Chunk?

### Benefits of Chunks

Instead translating an entire question all at once, instead of expcting the user to essentially "one-shot" the query, what if we broke it down into steps, steps we could treat deterministically and chain together like multi-shot prompts. Steps we could audit, test, attach metadata to, analyze, etc?

Much like the Graph Database said "Aha! What if I made the relationships first class citizens?"

We say "Aha! What if we made the query itself a first class citizen?"

What if we started treating the query like a composable input rather than a non-deterministic output? If we do that, we gain some important benefits.

- UX and Engagement win: A user can now explore the dataset simply by typing and seeing suggestions.
- Technical win: Our query system is now deterministic. We define the rules for the chunks. We can test the chunks. We own the query completion system. 

### Chunks

They are the building blocks of our query building system. They are the legos. 

Objects that represent a segment (or chunk) of a composable query.

Contains 4 things:
1. a templated human readable representation of the segment
2. a templated machine readable representation of the segment
3. rules to determine which other segments can or can't be linked to this segment
4. a mechanism to fill in the english and cypher string templates
5. a mechanism to enable suggestions of chunks to link

```typescript
export type Chunk = {
  English: string; //templated human readable representation 
  Cypher: string; //templated machine readable representation
  QueryType: QueryType; // determines what can or cannot be linked
  Requires: Alias[]; // determines what can or cannot be linked 
  Provides: Alias[]; // determines what can or cannot be linked
  Slots: Slot[]; // mechanism to fill in templates
  SuggestionKeywords?: string[]; // mechanism to enable suggestions
};

```

### Aliases
```typescript
type Alias = {
  Name: string;
  AliasType: AliasType;
};

// In our system, these map to Node Labels in Neo4j
enum AliasType {
  Player = "Player",
  Team = "Team",
  Game = "Game",
  Season = "Season",
  PlayerGame = "PlayerGame",
  PlayerSeason = "PlayerSeason",
  Play = "Play",
  // ...
}
```

Chunks can't be added to the query unless the aliases in their `Requires` property exist in the ChunkChain's `Aliases` property. 

As the query is built, the `List<Aliases>` that a chunk exposes via the `Provides` property are aggregated and stored in the `ChunkChain`'s `Aliases` property so that they can be accessed by Chunks that `Requires` them later on.

### QueryTypes
```typescript
enum QueryType {
  MATCH_START = "MATCH_START",
  JUNCTION = "JUNCTION", 
  FILTER = "FILTER",
  RETURN = "RETURN",
}
```

### Slots
```typescript
type Slot = {
  Name: string;
  Value: any;
  SlotValueTypes: SlotType[];
};

// we use this enum to determine what we allow the user to fill slots with
export enum SlotType {
  // entity properties
  SelectPlayerProperty = "SelectPlayerProperty",
  SelectPlayerPosition = "SelectPlayerPosition",
  SelectTeamProperty = "SelectTeamProperty",
  SelectGameProperty = "SelectGameProperty",
  SelectSeasonProperty = "SelectSeasonProperty",
  // compound properties
  SelectPlayerGameProperty = "SelectPlayerGameProperty",
  SelectTeamGameProperty = "SelectTeamGameProperty",
  SelectPlayerSeasonProperty = "SelectPlayerSeasonProperty",
  SelectTeamSeasonProperty = "SelectTeamSeasonProperty",
  // filter properties
  Filter = "Filter",
  FilterCondition = "FilterCondition",
  FilterValue = "FilterValue",
  SelectPassingStats = "SelectPassingStats",
  SelectPassingStatsGame = "SelectPassingStatsGame",
  SelectPassingStatsSeason = "SelectPassingStatsSeason",
  SelectFlexStats = "SelectFlexStats",
  SelectFlexStatsGame = "SelectFlexStatsGame",
  SelectFlexStatsSeason = "SelectFlexStatsSeason",
  SelectPlayStats = "SelectPlayStats",
}
```

### The Chunk Chain

```typescript
export class ChunkChain {
  Head: ChunkNode | null; 
  Tail: ChunkNode | null; 
  Aliases: Alias[]; // the types (aliases) of entities we have available to use 
  English: string; // the merged segments of english
  Cypher: string; // the merged segments of cypher

  append(chunk: Chunk): ChunkNode;
  pop(): ChunkNode | null; 
  toArray(): Chunk[]; // utility
  insertAt(index: number, chunk: Chunk): ChunkNode; // for mid-chain updates
  compile(): ChunkChain; // takes in segments of cypher and english and builds the final string
  updateChunkAtIndex(index: number, newChunk: Chunk): ChunkChain; // for mid-chain updates
  getNextValidChunksFromChunks(chunksToCheck: Chunk[]): Chunk[]; // the "Filter" mechanism
}

// Do i need this?
export function isValidNextChunk(chunk: Chunk, currentAliases: Alias[]): boolean; // the Filter itself. maybe a duplicate
```

### BIG: Buildtime Ingestion and Generation

#### Workflow Ingestion Overview
#### Buildtime Chunk and Type Generation

### RFS: Runtime Filters and Suggestions
#### GetValidChunks(generatedChunkLibrary)
#### Suggest via fuse + keywords 
But options are plentiful due to modularization of chunks

### Problems

### Future Enhancements