---
title: "The modern NLP landscape: a primer"
date: 2026-04-01
tags: ["nlp", "ml"]
summary: "From TF-IDF to fine-tuned transformers — a structured overview of what the compute tiers look like today, and when to reach for each one."
---

From TF-IDF and bag-of-words all the way up to fine-tuned transformers and 70B parameter models, the NLP landscape in 2026 spans an enormous range of compute requirements and capabilities.

## Tier 1 — Classical ML

Still the right choice when you have lots of labeled data and need fast, interpretable results. TF-IDF + logistic regression is hard to beat for simple classification tasks.

## Tier 3 — Pretrained encoders

BERT, RoBERTa, DeBERTa — fine-tune on your task in minutes on a single GPU. The default choice for classification, NER, and semantic search.
