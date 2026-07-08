---
title: "Grand Challenge — Open-Source Models for the Multimodal Study of Social Interactions"
date: 2025-02-27 14:00:00 +00:00
end_time: "15:30"
timezone: "GMT (UK)"
summary: >-
  Free, open-source AI models now let researchers automatically extract a rich
  array of social signals from video recordings. This session presents several
  such models, how to use them, and research on their inherent biases.
hosts:
  - name: "Pablo Arias-Sarah"
    affiliation: "University of Glasgow"
speakers:
  - name: "Pablo Arias-Sarah"
    affiliation: "University of Glasgow"
    talk: "Open source models for the analysis of social interactions"
  - name: "Rudradeep Guha"
    affiliation: "FEMTO-ST, Besançon"
    talk: "Using reverse correlation for explainability in AI-driven Action Unit detection models"
  - name: "Hilal Nizamoğlu"
    affiliation: "Justus Liebig University, Giessen"
    talk: "Unveiling Biases in Automated Facial Action Unit Detection Systems and the Use of Landmark-Displacement Analysis"
agenda:
  - "14:00–14:05  Welcome"
  - "14:05–14:15  Introduction (Pablo Arias-Sarah)"
  - "14:15–14:30  Using reverse correlation for explainability in AI-driven AU detection models (Rudradeep Guha)"
  - "14:30–14:45  Unveiling biases in automated facial AU detection systems (Hilal Nizamoğlu)"
  - "14:45–15:30  Open discussion"
---

Over the past few years, dozens of free, open-source, AI-driven models have emerged
that enable the extraction of a wide variety of (physiological) social signals from
human video recordings. In social cognition research these tools are game changers,
enabling researchers to automatically extract a rich array of social signals that
previously required expensive, difficult-to-set-up, and sometimes invasive
protocols. This session presented some of these models and how to use them, along
with recent research on explainable AI investigating their inherent biases.

## Introductory talk — Open source models for the analysis of social interactions (Pablo Arias-Sarah)

I present open-source AI models that can be used to analyse social interaction
datasets — extracting facial landmarks, head pose, muscle movements, emotional
expressions, heart rate, eye movements, semantic content, and auditory features,
all automatically. I give code examples for extracting each feature and point to
various open-source models currently available.

## Talk 2 — Using reverse correlation for explainability in AI-driven Action Unit detection models (Rudradeep Guha)

Recent developments in computer vision and deep learning have made detecting facial
landmarks, action units (AUs), and emotions faster and more accessible. But the
opacity of their mechanisms, and their tendency to reflect biases in the
data/training, raise reliability questions. I present ongoing work investigating
this using reverse correlation, a psychophysics technique: by treating an
open-source model as a participant in a reverse-correlation experiment, we examine
what features it uses to detect a given AU, and compare results across ethnicities
to highlight inherent biases.

## Talk 3 — Unveiling Biases in Automated Facial Action Unit Detection Systems (Hilal Nizamoğlu)

Facial expressions can be systematically deciphered through the Facial Action
Coding System (FACS), which breaks expressions into discrete muscle actions (AUs).
Open-source automated AU detection systems like AFAR and OpenFace have become
popular for their efficiency and cost-effectiveness, but their performance and
biases remain unclear. I share findings on the performance and biases of these
systems, and show how landmark-displacement analysis lets us still make use of
them to study facial motion with static and dynamic stimuli.
