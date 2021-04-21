export default [
    {
        date: "3.29.2021",
        messages: ['First Release: Experimental Version. Some features may be incomplete.']
    },
    {
        date: "3.30.2021",
        messages: ['Adds some new component generators', 'Adds some Snippet generators for Slide TOCs/Downloadable Slides', 'Adds copy/reset buttons to a few sections.']
    },
    {
        date: "3.31.2021",
        messages: ['Enables First-Response and test-and-teach Generators (Experimental).', 'Adds some additional error handling, bad tickets will cause less silent failures.']
    },
    {
        date: "4.05.2021",
        messages: ['Enables Format-Learning Objectives.', 'Fixes CB not finding Article/Activity Title', 'Fixes CB Clinical Implications section', 'Adds nbsp below media code', `Hides content below contributors if peer reviewer isn't checked.`, `Fixes the order of references, abbrevs, and content in curbside TOCs.`, `Removes "Main Content" from transcript.`, `Fixes some issues finding collection page titles.`]
    },
    {
        date: "4.06.2021",
        messages: [`Adds Video Lecture Generator.`, `Adds TownHall Enduring Generator.`, `Fixes a bug that was preventing submission unless transcript was checked in certain generators.`]
    },
    {
        date: "4.13.2021",
        messages: [`Updates Clinical Brief goal statement to pull from the prodticket instead of a default statement.`, `Updates Clinical Brief to include IPCE additional credit section in activity xml.`, `Adds missing TOC label to References XML section.`, `Transcripts now include "This is a verbatim transcript..." or "This transcript has been edited..." depending on ticket contents.`, `Clinical Brief no longer includes an empty abbreviations section if none exists.`, `Fixes an issue with Learning Objectives where "participants will" was being included in the objectives.`]
    },
    {
        date: "4.14.2021",
        messages: [`Adds a fix for QnA Learning Objectives formatting.`]
    },
    {
        date: "4.15.2021",
        messages: [`Changes the Study Highlights section of clinical-brief articles so that tables are no longer removed.`]
    },
    {
        date: "4.16.2021",
        messages: [`Fixes an issue with learning objectives that was sometimes breaking the program when lines started with special characters.`, `Added google analytics to help log errors.`]
    },
    {
        date: "4.20.2021",
        messages: [`Adds missing 'Post-assessment' option to clinical-brief generator.`,`Fixes an issue in the medscape provider statement that wasn't replacing & with the html entity.`, `Adds a missing blank space after the earn credit button`, `Adds more exceptions for parsing learning objective formatting.`]
    },
    {
        date: "4.21.2021",
        messages: [`Adds a new editor for viewing and formatting (indentation) output files and strings`]
    },
]