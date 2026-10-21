/*
  Habitat Communication Styles — framework content.
  This file is the same for every client. Client-specific data lives in data/team.js.

  PAIRS: draft content describing how two styles tend to interact.
  Keys are two style ids joined by "+", in STYLE_ORDER order.
  "moves" gives one move for each style in the pair (for same-style pairs, one shared move).
*/

window.STYLE_ORDER = ["kneebouncer", "barometer", "listmaker", "doodler"];

window.STYLES = {
  kneebouncer: {
    name: "Kneebouncer",
    plural: "Kneebouncers",
    color: "#EA3736",
    onColor: "#FFFFFF",
    purpose: "Communicates to advance the conversation and get things done.",
    description:
      "Kneebouncers view communication as a way to move something forward. Meetings probably aren't their favorite way to spend time, and they're likely to be the first to tune out when a conversation drags on.",
    characteristics: [
      "Emphasizes getting to the point.",
      "Tends to speak quickly and/or in shorter sentences.",
      "Has a strong internal sense of “we’re done here.”",
      "Tends to “tune out” once they feel they have the information they need.",
      "Gets bored or frustrated in lengthy meetings and collaborative discussions."
    ],
    workingWith: [
      "Keep them engaged with targeted questions: “What do you think of that?”",
      "Show the value of slowing down to gather important information before they start a task.",
      "Set clear action plans and expectations.",
      "Then get out of the way and let them work at their preferred fast pace."
    ]
  },
  barometer: {
    name: "Barometer",
    plural: "Barometers",
    color: "#8E7432",
    onColor: "#FFFFFF",
    purpose: "Communicates to respond to and manage the emotions in the room.",
    description:
      "Barometers are experts at reading the room. They're perceptive about how other people feel, and they use their own communication to make sure everyone on the team feels seen and heard.",
    characteristics: [
      "Chooses words carefully so as not to upset others or disrupt the mood of the room.",
      "Seeks other perspectives and makes sure everyone has a chance to be heard.",
      "Uses harmonizing language (“we,” “our”).",
      "Tries to explain the behavior of others."
    ],
    workingWith: [
      "Acknowledge their concerns, then emphasize the broader context of a decision over individual issues.",
      "Use data to explain your reasoning, shifting the focus from “who” to “how” or “why.”",
      "Respect their perspective, but steer them toward actionable outcomes."
    ]
  },
  listmaker: {
    name: "Listmaker",
    plural: "Listmakers",
    color: "#10312B",
    onColor: "#FFFFFF",
    purpose: "Communicates to ensure clarity by seeking and reviewing information.",
    description:
      "Listmakers use communication to organize. They don't want to risk missing anything, so they ask for detail and try to capture everything up front, which can make it hard to separate critical from non-critical information.",
    characteristics: [
      "Provides as much information as possible to ensure nothing is missed.",
      "Asks for specific details or follows up on missed information.",
      "Frequently reviews information (internally and out loud) to ensure understanding.",
      "Thrives with an agenda and clearly identified action items or next steps."
    ],
    workingWith: [
      "Clearly distinguish between critical and non-critical information.",
      "Share agendas and materials ahead of time so they can prepare.",
      "Regularly recap main points and action items during discussions.",
      "Put their organized approach to work improving the team’s record keeping."
    ]
  },
  doodler: {
    name: "Doodler",
    plural: "Doodlers",
    color: "#F7BE00",
    onColor: "#231F20",
    purpose: "Communicates to explore concepts, alternatives, and consequences.",
    description:
      "Doodlers are abstract, improvisational thinkers. They're comfortable with ambiguity and unorganized information, and they like to wander a bit as they communicate, often reaching for analogies or asking what others might see as unrelated questions.",
    characteristics: [
      "Talks about the long-term consequences or hypothetical effects of a decision.",
      "Explores alternatives (“What if we tried this?”) while making decisions.",
      "Speaks in stories, examples, metaphors, or analogies.",
      "May wander around, physically and figuratively, while thinking."
    ],
    workingWith: [
      "Set clear goals, deadlines, and deliverables.",
      "Guide discussions toward action, not hypothetical scenarios.",
      "Give them time to process, but don’t let conversations drift into endless abstraction."
    ]
  }
};

window.PAIRS = {
  "kneebouncer+kneebouncer": {
    connect: "You both want momentum: short meetings, quick decisions, and visible progress.",
    friction: "You can move so fast together that you skip input you needed, or compete over who drives.",
    moves: {
      kneebouncer: "Build in one deliberate pause before committing: “What are we missing, and who else needs to weigh in?”"
    }
  },
  "kneebouncer+barometer": {
    connect: "The Kneebouncer brings decisiveness; the Barometer brings buy-in. Together you get action that people actually support.",
    friction: "Speed can feel dismissive to a Barometer, and attention to how people feel can feel like a slowdown to a Kneebouncer.",
    moves: {
      kneebouncer: "Before you move, ask “Who does this affect?” and acknowledge their concern in a sentence.",
      barometer: "Lead with the bottom line, then the people impact. Frame concerns as risks to the outcome."
    }
  },
  "kneebouncer+listmaker": {
    connect: "You both care about getting things done and leaving with clear next steps.",
    friction: "The Kneebouncer wants to start now; the Listmaker wants complete information first. Short messages leave Listmakers with gaps, and long ones lose Kneebouncers.",
    moves: {
      kneebouncer: "Share the critical details up front and confirm next steps in writing.",
      listmaker: "Lead with the headline and the decision you need. Offer the details as backup, not the opener."
    }
  },
  "kneebouncer+doodler": {
    connect: "You both bring energy. The Doodler generates options and the Kneebouncer moves on the best one.",
    friction: "Exploring can feel like stalling to a Kneebouncer, and urgency can shut down a Doodler's ideas too early.",
    moves: {
      kneebouncer: "Give exploration a time box (“Ten minutes of ideas, then we pick”) instead of cutting it off.",
      doodler: "Tie your ideas to the decision at hand, and say which option you'd choose."
    }
  },
  "barometer+barometer": {
    connect: "High trust and a warm working relationship. Everyone feels heard.",
    friction: "You may both avoid the hard conversation, and waiting for consensus can slow decisions down.",
    moves: {
      barometer: "Name the tension out loud and agree up front how you'll decide when you don't fully agree."
    }
  },
  "barometer+listmaker": {
    connect: "You're both thorough and considerate. Together you build careful, well-supported plans.",
    friction: "The Barometer focuses on who is affected; the Listmaker focuses on what needs to happen. Each can miss what the other sees.",
    moves: {
      barometer: "Bring specifics to support people concerns: who, how many, and what it means for the plan.",
      listmaker: "Ask how a plan will land with people, not just whether it's complete."
    }
  },
  "barometer+doodler": {
    connect: "You're both open and collaborative, and you enjoy talking things through. Great partners on culture and vision.",
    friction: "Conversations can circle without landing. Lots of good discussion, few decisions.",
    moves: {
      barometer: "Help the conversation land: summarize where people are and propose a next step.",
      doodler: "Check how your ideas affect the people involved, then name one concrete next step."
    }
  },
  "listmaker+listmaker": {
    connect: "Shared standards and thorough follow-through. Nothing falls through the cracks.",
    friction: "You can over-prepare together and treat everything as critical, which slows decisions.",
    moves: {
      listmaker: "Agree up front what's critical versus nice to know, and what “good enough” looks like."
    }
  },
  "listmaker+doodler": {
    connect: "The Doodler imagines what could be; the Listmaker makes it real. You complement each other well.",
    friction: "Tangents can frustrate a Listmaker, and structure can feel confining to a Doodler.",
    moves: {
      listmaker: "Keep a “parking lot” for ideas instead of shutting them down, and ask about the bigger picture.",
      doodler: "Bring ideas with a concrete example and a next step, and respect the agenda."
    }
  },
  "doodler+doodler": {
    connect: "Creative, big-picture, energizing conversations. You're great at brainstorming together.",
    friction: "Plenty of ideas, less follow-through. Deadlines can slip.",
    moves: {
      doodler: "Before the brainstorm ends, pick one idea, an owner, and a deadline."
    }
  }
};
