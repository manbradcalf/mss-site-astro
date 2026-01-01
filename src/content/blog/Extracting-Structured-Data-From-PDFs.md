---
title: "Extracting Structured Data from PDFs with Segtax"
description: "From POC to Production, how we helped  Segtax extract Settlement Statement data automatically with AI and OCR"
pubDate: 2025-12-31
author: "Ben Medcalf"
tags: ["ChatGPT", "AI", "OCR","PDFs","Data Extraction","Automation","Case Study"]
image: "/images/M Logo.svg"
---

## Table of Contents

- [The Domain: Saving Money on Taxes by Real Estate Itemization](#the-big-picture-segtax-saves-money-via-real-estate-itemization)
- [The Problem: Not Everything is Automated (yet)](#the-problem-not-everything-is-automated-yet)
- ["There's Data In Them There PDFs"](#theres-data-in-them-there-pdfs)
- [The Extraction](#the-extraction)
- [The Feedback Loop](#the-feedback-loop)
- [The Final Product](#the-final-product)
- [The Takeaways](#the-takeaways)

### The Domain: Saving Money On Taxes By Real Estate Itemization

I had the pleasure of working with [Segtax](https://www.seg.tax/), a very cool startup that is modernizing the way cost segregation studies are done. 

What's a cost-segregation study? Well, [it's a little complicated](https://en.wikipedia.org/wiki/Cost_segregation_study/), but for our purposes, we can think of it this way:

By itemizing the things that make up a piece of real estate (ex: cabinetry, flooring, electrical wiring), we can save the owner of that property money on their taxes. The output of this, the cost segregation study, is a report of these itemizations that gets submitted to the IRS. 

Traditional cost segregation studies are done manually and are thus costly to produce, both in time and money. 

Instead, by automating crucial aspects of the cost segregation process, Segtax makes it cheaper and faster and more attainable. 

But in order to do this, many documents of all shapes, sizes and purposes must be reviewed, processed and synthesized. This all happens internally with Segtax's proprietary software. The output of all of this magic is the Cost Segregation Study PDF that is delivered to the customer.

### The Problem: Not Everything is Automated (yet) 

This is where we come in. 

One of the documents that needs to be processed, the Settlement Statement.

What's a Settlement Statement? Good question: It's a Statement representing a Settlement. Got it?

But really, its essentially one big receipt representing a real estate purchase. 

These settlement statements are made up of line items which represent things like taxes owed, credits due or fees paid. Different categories of line items impact the cost segregation study in different ways.

<figure class="carousel-container" data-carousel-id="settlement">
  <div class="carousel-wrapper">
    <div class="carousel-slides">
      <img src="/images/blog/Segtax-PDF-Extraction/example1.jpg" alt="Settlement Statement Example 1" />
      <img src="/images/blog/Segtax-PDF-Extraction/example2.png" alt="Settlement Statement Example 2" />
    </div>
  </div>
  <figcaption class="carousel-caption">Example Settlement Statements</figcaption>
</figure>

The problem is that these documents are still being read with slow human eyes and interpreted by distractable human brains. 

Our mission:

>*Whenever a Settlement Statement is uploaded to the system, extract, categorize and persist the line items within it*


### The Opportunity: "There's Data In Them There PDFs"

If we can dig the line items out of the Settlement Statement PDFs and process them into something the Segtax system can use automatically, then we're golden.

Now that we know what a cost segregation study is and how the line items within a settlement statement are used within one, we can start planning our line item extraction.

For this automation, we'll need a few things.

#### What We Need

1. Something to extract the text of the settlement statement PDF
2. Something to identify the line items from the extracted text
3. Something to categorize the extracted line items

> **Note:** Because modern AI providers like ChatGPT also [include OCR capabilities](https://platform.openai.com/docs/guides/pdf-files), in some cases, all 3 steps above could be combined into 1. However, if the PDF we are extracting data from was scanned in manually from a physical document and / or the quality was lacking, these tools would often be unable to process it.
>
> By extracting the text first via our own OCR instance, and then passing the extracted text to our LLM of choice, we were able to get consistent results while gaining more control and insight into the extraction process. 

### Extracting Text from the PDF 

I chose tesseract for the OCR extraction, due to its ease of use and open source nature.

### Identifying Line Items from Extracted Text

### Categorizing Line Items using Structured Outputs

When designing a system like this, it's crucial to get the domain expert's feedback early and often. To do this, I used Anthropic's Claude to generate static html pages that displayed the PDF on one side and the line item extractions on the other.

This way, each run of the extraction pipeline output.

I couldn't expect, nor would I want to expect, our domain expert Greg to spin up a local environment just for the sake of running the automation he's paying me to write.

Instead, 


### The Final Product

### The Takeaways
