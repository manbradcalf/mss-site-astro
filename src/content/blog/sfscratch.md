---
title: "StatFoundry - Part 3 (Draft)"
description: "From LLMs to a chunk-based, deterministic way to search NFL stats"
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

### What this is

The finale of StatFoundry’s origin story—and the moment we pivot from “have an LLM write Cypher” to a chunk-based, deterministic system we can test, reason about, and actually ship with confidence. 

### Where we left off

- We’re building StatFoundry to make searching NFL stats simple. See Part 1 and 2:
  - Part 1: scraping → graph → search UX ([recap](/blog/statfoundry-part1))
  - Part 2: LLM-powered Cypher, intent pitfalls, and user research ([i.e., Instagram polls](/blog/statfoundry-part2/#serendipitous-example))

Key takeaways:
- Graphs make it easy to unlock deeper, novel insights with multi-hop queries, queries that connect disparate pieces of information that would be otherwise awkward/expensive in SQL.
- Most casual users just Google stats out of curiosity.
- LLMs can write valid Cypher, but the intent gets fuzzier as questions get more complex; results become inconsistent.

### Why LLMs struggled here

Alone, LLMs are the wrong tool for this particular job.

LLMs excel when the expected output is human language. Fuzzy and pliable. 

They excel when a question can be answered multiple ways because the margin for error is larger.

But in deterministic systems like ours LLMs introduce problematic, [random and unnecessary noise](/blog/statfoundry-part2/#meanest-qb) when given unstructured information, like a user's question.


### Introducing "Agentic Users"

What if users structure the query themselves—guided, with strong guardrails—so we don’t have to guess intent? That gives us:
- Determinism: the system enforces valid steps.
- Explainability: every step is visible.
- Better UX: suggestions teach the dataset as you search it.

Less to guess, less to test, more to ship.

<figure>
  <img style="display:block; margin: 0 auto" src="/images/blog/StatFoundryPartTwo/fforacle2.png" alt="The original application design" />
  <figcaption style="font-size: 0.9em; color: #666; text-align: center">
    <em>The original application design was suggesting Chunks all along</em>
  </figcaption>
  
</figure>

---

### Epiphany: Chunks, not prompts

Treat the query as a composition of small, typed pieces—Chunks—instead of a one‑shot prompt. Like LEGO for queries. This pattern is domain‑agnostic: swap "Player/Game/Team" for your own entities (e.g., Customer/Order/Product; Patient/Visit/Lab), and the same mechanics apply.

Each Chunk contains:
- English template (user-facing)
- Cypher template (machine-facing)
- Requires → which aliases must exist to attach this chunk
- Provides → which aliases this chunk adds to the chain
- Slots → typed values the user fills (e.g., stat, operator, number)
- Keywords → to power suggestions

Minimal shape:

```ts
type Chunk = {
  English: string
  Cypher: string
  QueryType: "MATCH_START" | "JUNCTION" | "FILTER" | "RETURN"
  Requires: Alias[]
  Provides: Alias[]
  Slots: Slot[]
  SuggestionKeywords?: string[]
}
```

### The Chunk Chain

A tiny linked list that enforces order and builds final outputs. Works for any graph‑shaped domain where queries can be expressed as reusable steps.

```ts
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

What it guarantees:
- Validity: you can’t add a FILTER for entities you haven’t matched.
- Composability: small steps build complex, multi-hop queries.
- Reproducibility: the same steps yield the same query and results.

### Buildtime vs Runtime at a glance

Buildtime
- Ingest schema/workflows
- Generate typed Chunks, Slots, and Aliases (for any schema: sports, ecommerce, healthcare, finance)
- Index keywords for suggestions

Runtime
- Filter: given current aliases, which chunks are valid next?
- Suggest: fuse/keyword match to propose the next few chunks
- Search: compile English + Cypher deterministically

### What this buys us

- Deterministic results users can trust (critical in regulated or audited domains)
- A guided, discoverable UX for power users
- Testable building blocks (chunks) instead of brittle prompts
- Lower/controllable cost profile vs. free-form LLM calls

Applies anywhere users assemble precise, repeatable queries over connected data: marketing attribution, supply chains, fraud paths, clinical journeys—you name it. No vibe‑coding required.

### What’s next

- More chunk libraries (teams, seasons, splits, drive/play filters)
- Richer suggestions (contextual, popularity-weighted)
- Export/share queries as permalinks
- Optional AI—at buildtime only—for better suggestions, never for final query generation


