---
title: "Why Your AI Agent Hallucinated — And How To Fix It"
description: "AI hallucinations in document workflows are almost always a retrieval problem, not a model problem. Here's what we changed."
pubDate: 2026-04-06
author: "Ben Medcalf"
tags:
  [
    "AI",
    "RAG",
    "GraphRAG",
    "Graph Databases",
    "Document Automation",
    "Hallucination",
    "Retrieval",
    "AI Agents",
  ]
image: "/images/blog/why-your-ai-agent-hallucinated/why-your-ai-agent-hallucinated.png"
---

<figure>
  <img src="/images/blog/why-your-ai-agent-hallucinated/ai-agents-hallucinating.png" alt="Your AI support agents on the way to resolve a customer complaint" />
  <figcaption>Your AI support agents on the way to resolve a customer complaint</figcaption>
</figure>

Here's a failure mode that comes up constantly in document automation work — and one we've dug into firsthand.

The AI is extracting structured data from legal documents. Accuracy looks fine in demos. In production, it's inventing clause references that don't exist.

Not because the model is bad. Because the retrieval is naive.

## What Was Actually Happening

The system was pulling context by running a standard similarity search against the full document text. When the model needed to answer "what does this clause obligate us to do?" — it got flooded with raw text from the wrong sections.

The model did exactly what you'd expect: it filled the gaps with plausible-sounding content. Clause references that almost existed. Obligations that sounded right but pointed to the wrong section. The kind of hallucination that looks fine until someone stakes a business decision on it.

The instinct on teams when this happens is to reach for the model. Try a newer one. Adjust the temperature. Add more prompt instructions telling it not to hallucinate.

None of that worked — because the problem wasn't the model.

## The Retrieval Layer Is the Bottleneck

Here's the thing about LLMs: they're extraordinarily good at reasoning over structured, well-scoped context. What they're bad at is doing your retrieval work for you.

When you give an LLM a pile of text and ask it to find the relevant piece, you've asked it to do two jobs at once: figure out what's important, and then reason about it. The first job is retrieval. The second is inference. Conflating them is where hallucinations breed.

Legal documents are a particularly bad case because they're full of internal references. A clause doesn't exist in isolation — it references other clauses, which reference definitions, which reference jurisdictions. That structure is invisible to a flat similarity search.

## What We Changed

Three changes, in order of impact:

**1. Built a document structure graph.**

Instead of treating the document as a bag of text, we modeled it as a graph: sections, clauses, and cross-references as nodes and edges. When the document said "see Section 4.2(b)," we represented that as an explicit edge in the graph — not just text that mentioned a section number.

**2. Switched from full-text retrieval to graph traversal.**

Instead of asking "what text is most similar to this query?", we asked "give me clauses this section references".

This kind of question maps neatly to a graph traversal; one where we start at a node representing our section's text and then "traverse the graph", fanning out into an interconnected web of references to other clauses or even sections.
As we walk the graph, we can either trust the LLM to accumulate the context or tell it what to look for explicitly.

Now, the model had exactly what it needs — nothing more, nothing less.

If you're looking for a house, text search gets you in the neighborhood. Traversing the graph gets you to the front door.

**3. Added a confidence-gated human-in-the-loop checkpoint.**

For extractions the model was uncertain about, we flagged them for human review before they hit downstream systems. The model already had a `confidence` field in its structured output — we just started using it to route low-confidence results to a review queue instead of auto-approving them.

## The Result

Accuracy went from "mostly working" to auditable.

Not because we swapped in a better model. Not because we rewrote the prompts. Because we stopped asking the model to guess at context it shouldn't have to guess at.

The document structure was always there. The references were always there. We just hadn't made them legible to the retrieval layer.

## The Pattern Generalizes

This isn't a legal document problem. It's a retrieval architecture problem.

Any time you're building document AI on top of data that has internal structure — contracts, technical specs, medical records, compliance documentation — you're probably leaving accuracy on the table if you're relying on flat text retrieval alone.

The graph doesn't replace the LLM. It does the structural reasoning that LLMs aren't designed to do, so the LLM can focus on what it's actually good at.

If you're building document AI and getting inconsistent results, the fix is probably upstream of the model.

---

**We work with engineering teams of all sizes at companies who are hitting accuracy ceilings with their AI pipelines.** If this pattern sounds familiar, [get in touch](/#contact) — happy to dig into what's happening in your retrieval layer.
