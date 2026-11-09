export const communicationPaths = [
  {
    id: 'clear-speaking',
    topic: 'communication',
    title: 'Clear Speaking',
    level: 'Beginner',
    summary: 'Put the point first, then listen long enough to hear the point you missed.',
  },
  {
    id: 'writing-that-lands',
    topic: 'communication',
    title: 'Writing That Lands',
    level: 'Beginner',
    summary: 'Use plain language for a real reader, and aim persuasion at a reason that reader already holds.',
  },
];

export const communicationLessons = [
  {
    id: 'message-spine',
    pathId: 'clear-speaking',
    title: 'Structure a Message People Can Follow',
    minutes: 5,
    objective: 'Open with the point, why it matters, and the action, before the tour of details.',
    paragraphs: [
      'Listeners get lost when a talk is a tour of everything you know, in the order you found it. Give them a spine first: the point, why it matters to this audience, and the action or decision. Details come after the spine. If you are interrupted after thirty seconds, the destination should already have landed.',
      'One reliable shape is situation, meaning, action. State what is going on in a sentence. Say why this audience should care. Offer the next step. Background still matters. It should serve a point the room has already heard.',
    ],
    example: {
      title: 'A contract decision in three sentences',
      body: 'A weak opening wanders through tabs, vendor history, and a budget line that might move. A strong opening says: “We should delay the vendor contract one week. The security review is unfinished, and signing now risks a tool we cannot audit. I need a decision in Thursday’s meeting.” The room knows the ask even if the details get cut short.',
    },
    takeaway: 'Point, stake, action. Then the evidence. Not the other way around.',
    questions: [
      {
        prompt: 'A message spine is:',
        correctIndex: 2,
        choices: [
          'Every detail you collected, in the order you found it.',
          'A joke used to delay the ask.',
          'The point, why it matters, and the action, stated early.',
          'The appendix of a report.',
        ],
        explain: 'Structure puts the decision before the tour so a short interruption still leaves the audience with the ask.',
      },
      {
        prompt: 'Why put the point before the background?',
        correctIndex: 1,
        choices: [
          'Background is always irrelevant.',
          'People may only hear the opening, and they need the destination in order to hold the details.',
          'Meetings ban questions after the first minute.',
          'Short messages are always rude, so the point should be hidden.',
        ],
        explain: 'Context still belongs in the message. It lands better once the audience knows what it is for.',
      },
      {
        prompt: 'Which opening best matches the lesson?',
        correctIndex: 0,
        choices: [
          '“Delay the contract one week. The security review is unfinished, and I need a decision Thursday.”',
          '“I looked at a lot of tabs, and also the logo might change, and budgets are complicated.”',
          '“Before I say what I need, here are twelve facts in the order I found them.”',
          '“Something about the vendor, I think, unless the timeline moves.”',
        ],
        explain: 'The first opening states the action, the reason, and the moment of decision. The others withhold the destination.',
      },
    ],
  },
  {
    id: 'active-listening',
    pathId: 'clear-speaking',
    title: 'Active Listening Is a Skill',
    minutes: 5,
    objective: 'Check another person’s meaning before you load a reply.',
    paragraphs: [
      'Active listening means you work to understand the other person’s meaning before you assemble your answer. The moves are simple and less common than they sound: let them finish, summarize what you heard in a sentence, and ask a question about their point. Summarizing is not agreement. It is a check.',
      '“So the deadline is the problem, not the design” lets them correct you. If you skip that check, you may spend the afternoon solving a problem they do not have. Planning your counterargument while they are still talking is the usual way this skill fails.',
    ],
    example: {
      title: '“Fine, I guess”',
      body: 'A teammate says the launch plan is “fine, I guess” and goes quiet. A poor reply jumps straight to a new timeline. A listening reply says, “It sounds like you have a reservation you have not named. Is it the scope, or is it the date?” Then you wait. The summary invites a correction instead of a debate about a guess.',
    },
    takeaway: 'A one-sentence summary is a test of understanding. It is not a verdict.',
    questions: [
      {
        prompt: 'Summarizing what you heard is useful because:',
        correctIndex: 1,
        choices: [
          'It ends the conversation.',
          'It checks meaning and lets the other person correct you.',
          'It proves you agree with them.',
          'It replaces the need to ask any question.',
        ],
        explain: 'A summary is a test. Agreement is a separate choice you can make after the meaning is clear.',
      },
      {
        prompt: 'Active listening fails when you:',
        correctIndex: 0,
        choices: [
          'Plan your counterargument while the other person is still talking.',
          'Ask a short clarifying question after they finish.',
          'Let them finish the sentence.',
          'Repeat their concern in your own words and pause.',
        ],
        explain: 'The skill is attention to their meaning before your reply. Drafting the rebuttal early steals that attention.',
      },
      {
        prompt: 'A teammate sounds unsure and then goes quiet. Which response fits the lesson?',
        correctIndex: 3,
        choices: [
          'Fill the silence with a new plan so nobody feels awkward.',
          'Say “You clearly agree” and move on.',
          'Explain why their concern is wrong before they name it.',
          'Name the hesitation you heard and ask whether it is scope or timing.',
        ],
        explain: 'The check gives them a chance to correct your guess. Jumping to a plan solves a problem you may have invented.',
      },
    ],
  },
  {
    id: 'plain-language',
    pathId: 'writing-that-lands',
    title: 'Plain Language Respects the Reader',
    minutes: 5,
    objective: 'Make the actor and the action visible in words the reader already has.',
    paragraphs: [
      'Plain language uses words your reader already knows, sentences they can say aloud, and a concrete subject. It is not the same thing as removing precision. Jargon is fine when the audience shares it and it is the shortest accurate term. Jargon is noise when it hides a simple request.',
      'Replace “leverage synergies to operationalize the initiative” with “use the two teams’ lists so the project starts Monday.” Read the sentence aloud. If you run out of breath, or you cannot point at the verb and the person who does it, rewrite it.',
    ],
    example: {
      title: 'Before July',
      body: 'Before: “It is incumbent upon stakeholders to facilitate alignment prior to Q3.” After: “Project leads need to agree on the goal before July.” The request is the same. The second version names the people, the action, and a date someone can put on a calendar.',
    },
    takeaway: 'If a reader cannot see who does what by when, the sentence is not finished.',
    questions: [
      {
        prompt: 'Plain language mainly means:',
        correctIndex: 2,
        choices: [
          'Removing every precise term, even for expert readers who share them.',
          'Writing as few words as possible, even if the request disappears.',
          'Making the actor and the action easy to see in words the reader knows.',
          'Replacing every noun with a longer noun from a thesaurus.',
        ],
        explain: 'Clarity is the goal. Shared technical terms can stay when they are the shortest accurate words for that audience.',
      },
      {
        prompt: '“Leverage synergies to operationalize the initiative” is weak because:',
        correctIndex: 1,
        choices: [
          'It is too short to be serious.',
          'The verb and the concrete action are hidden.',
          'Readers should never see a date.',
          'Teams are required to avoid names.',
        ],
        explain: 'The sentence sounds active and specifies nothing. A rewrite should show who does what.',
      },
      {
        prompt: 'Which revision best matches the lesson?',
        correctIndex: 0,
        choices: [
          '“Project leads need to agree on the goal before July.”',
          '“Stakeholders shall facilitate pre-Q3 alignment.”',
          '“Synergy.”',
          '“It is incumbent upon all parties to do better.”',
        ],
        explain: 'The first sentence names people, an action, and a time. The others keep the fog or delete the request entirely.',
      },
    ],
  },
  {
    id: 'persuasive-case',
    pathId: 'writing-that-lands',
    title: 'Persuasion Needs Their Reason',
    minutes: 6,
    objective: 'Build a case from credibility, the audience’s stake, evidence, and a step they can actually take.',
    paragraphs: [
      'Persuasion is not volume. People move when they see a reason that matters in their world, a proof they trust, and a step that feels possible. An old split still helps: ethos is why you are credible, pathos is what is at stake for them, and logos is the evidence and the reasons. You usually need all three. A stack of facts with no stake sits unread. A stake with no evidence sounds like pressure.',
      'Lead with their stake, not your effort. “I worked all weekend” is about you. “If we ship this bug, refund requests will hit the team you manage” is about them. Then make the next step small enough to accept.',
    ],
    example: {
      title: 'A one-semester pilot',
      body: 'Asking a busy principal for a later school start works better with local traffic counts and a one-semester pilot than with a speech about how much you care. The traffic counts are the evidence. The pilot is a possible step that lowers the principal’s risk. Caring may be real. It is a weak substitute for a reason the principal already has to weigh.',
    },
    takeaway: 'Their stake, credible proof, and a doable step. Your effort is not the argument.',
    questions: [
      {
        prompt: 'A persuasive case for a specific audience should lead with:',
        correctIndex: 1,
        choices: [
          'How hard you worked.',
          'What is at stake for that audience, plus evidence and a doable step.',
          'The longest list of features you can assemble.',
          'A request with no reason attached.',
        ],
        explain: 'Their stake gives the facts a place to land. Effort and feature lists stay secondary unless the audience asked for them.',
      },
      {
        prompt: 'Ethos, pathos, and logos refer to:',
        correctIndex: 0,
        choices: [
          'Credibility, the audience’s stake, and reasoned evidence.',
          'Fonts, colors, and page margins.',
          'Three required meeting types.',
          'A rule that forbids argument.',
        ],
        explain: 'The three are classic parts of a case: why you should be believed, why they should care, and what the evidence shows.',
      },
      {
        prompt: 'Which line is aimed at the listener’s stake?',
        correctIndex: 3,
        choices: [
          '“I stayed late all weekend on this.”',
          '“Trust me, this matters to me a lot.”',
          '“Here are 40 features in alphabetical order.”',
          '“If this bug ships, refund requests land on the team you manage.”',
        ],
        explain: 'The last line names a consequence for the listener’s team. The others center the speaker or dump detail without a stake.',
      },
    ],
  },
];
