/*
  Client data. To reuse this site for another client, replace this file.
  - Scores per style, in the order: kneebouncer, barometer, listmaker, doodler (each person's four add up to 140).
  - Top styles, ties, counts and team averages are calculated automatically.
  - "pattern" is written by hand for each team: it is interpretation, so review it per client.
*/

window.TEAM = {
  client: "Central Bank of the Ozarks",
  date: "October 2026",
  // Path to the client's logo file in assets/ (SVG or PNG). Leave empty to show their name as text.
  logo: "assets/central-bank-logo.svg",
  people: [
    { name: "Blake Will", scores: [37, 35, 35, 33] },
    { name: "Diane Homan", scores: [29, 39, 36, 36] },
    { name: "Kimberly White", scores: [25, 45, 39, 31] },
    { name: "Amy Sharp", scores: [30, 38, 40, 32] },
    { name: "Jamie Clark", scores: [35, 28, 39, 38] },
    { name: "Andrew Tasset", scores: [29, 33, 37, 41] },
    { name: "Mandy Anthes", scores: [30, 31, 44, 35] },
    { name: "James Patrick Nacy", scores: [30, 33, 42, 35] },
    { name: "Joselyn Baldner", scores: [35, 35, 32, 38] },
    { name: "Shawn Barbour", scores: [34, 34, 39, 33] },
    { name: "Tatyana Osenniy", scores: [36, 35, 33, 36] },
    { name: "Steve Gassel", scores: [29, 38, 43, 30] }
  ],
  pattern: {
    headline: "Half of this team leads with Listmaker.",
    insights: [
      {
        title: "Our strength",
        body: "We prepare well, follow through, and rarely let details slip. People can count on us to get it right."
      },
      {
        title: "Watch for",
        body: "Over-preparing, treating everything as critical, and waiting for complete information before we decide."
      },
      {
        title: "Our quietest voice",
        body: "Kneebouncer is our lowest average. Who on the team helps us decide and move, and do we make room for them?"
      }
    ],
    meetingTips: [
      "Send agendas and materials ahead of time, and mark what's critical versus background.",
      "Put the decision you need, and its deadline, at the top of every agenda.",
      "Before closing a decision, ask how it will land with the people it affects.",
      "Time-box brainstorming, then pick one idea, an owner, and a date.",
      "End every meeting with a recap of decisions and next steps."
    ],
    questions: [
      "Where are we over-preparing right now?",
      "What decision have we been waiting on more information for, and do we really need it?",
      "Whose perspective do we tend to hear last?"
    ]
  }
};
