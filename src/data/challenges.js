const pool = [
  {
    id: 'needs-or-wants',
    difficulty: 'easy',
    topic: 'finance',
    title: 'Needs or wants',
    minutes: 3,
    intro: 'Sort one expense with the 50/30/20 idea. Needs keep life and work going. Wants are chosen.',
    questions: [
      {
        prompt: 'Which expense is a need in the budget lesson?',
        correctIndex: 0,
        choices: [
          'The rent you pay to keep your housing.',
          'A limited-edition poster.',
          'A second streaming service you rarely open.',
          'Concert tickets for next month.',
        ],
        explain: 'Housing is a need in the template. The poster, extra streaming, and tickets are wants you can time or skip.',
      },
      {
        prompt: 'A want belongs mainly in which slice of the template?',
        correctIndex: 2,
        choices: ['The 20% savings slice.', 'The 50% needs slice.', 'The 30% wants slice.', 'None. Wants are excluded from a budget.'],
        explain: 'The template gives wants their own 30% so they stay visible instead of quietly eating the savings.',
      },
    ],
  },
  {
    id: 'spot-the-source',
    difficulty: 'easy',
    topic: 'history',
    title: 'Spot the source',
    minutes: 3,
    intro: 'A primary source is a trace from the time. A later explanation is secondary, even when it is careful.',
    questions: [
      {
        prompt: 'Which item is a primary source for a 1969 concert?',
        correctIndex: 1,
        choices: [
          'A 2020 documentary about the tour.',
          'A ticket stub from the night of the show.',
          'A textbook paragraph written last year.',
          'A classroom lecture delivered yesterday.',
        ],
        explain: 'The stub comes from the event. The documentary, textbook, and lecture are later accounts.',
      },
      {
        prompt: 'A primary source is still limited because:',
        correctIndex: 0,
        choices: [
          'The author saw only part of the event and wrote with a purpose.',
          'Anything old is automatically false.',
          'Historians are not allowed to read letters.',
          'Secondary sources never cite evidence.',
        ],
        explain: 'Closeness in time does not remove a partial view. Read the trace, then compare it.',
      },
    ],
  },
  {
    id: 'password-habit',
    difficulty: 'easy',
    topic: 'technology',
    title: 'Password habit',
    minutes: 3,
    intro: 'A password is a secret you type into a session you started. Unexpected requests are borrowing trust.',
    questions: [
      {
        prompt: 'Someone messages you a link and asks for your bank password “to unlock a refund.” What should you do?',
        correctIndex: 3,
        choices: [
          'Send the password so the refund is not delayed.',
          'Click the link and type the password if the logo looks right.',
          'Forward the password to a friend to check it.',
          'Ignore the link and open the bank yourself from its known address or app.',
        ],
        explain: 'Refunds are handled inside the account you open yourself. A logo does not make a surprise link safe.',
      },
      {
        prompt: 'Two-factor authentication helps when a password leaks because:',
        correctIndex: 1,
        choices: [
          'The leaked password is erased from the attacker’s copy.',
          'The login still requires a second proof the attacker may not have.',
          'Banks stop using passwords entirely the same day.',
          'The attacker receives your codes by design.',
        ],
        explain: 'The second factor blocks a login that has only the password. You should still change the leaked password.',
      },
    ],
  },
  {
    id: 'listening-check',
    difficulty: 'easy',
    topic: 'communication',
    title: 'The listening check',
    minutes: 3,
    intro: 'A summary is a test of what you heard. It is not the same thing as agreeing.',
    questions: [
      {
        prompt: 'Which reply checks the other person’s meaning?',
        correctIndex: 2,
        choices: [
          '“Anyway, here is my plan.”',
          '“You obviously agree with me.”',
          '“So the date is the issue, not the design. Did I get that right?”',
          '“Let me answer while you are still explaining.”',
        ],
        explain: 'The third reply summarizes and invites a correction. The others skip the check.',
      },
      {
        prompt: 'Active listening is:',
        correctIndex: 0,
        choices: [
          'Working to understand their point before you build your reply.',
          'Staying silent no matter what they ask.',
          'Agreeing with every request.',
          'Waiting for a pause so you can change the subject.',
        ],
        explain: 'The skill is understanding first. Agreement and the next plan come after the meaning is clear.',
      },
    ],
  },
  {
    id: 'interest-versus-simple',
    difficulty: 'medium',
    topic: 'finance',
    title: 'Interest versus simple growth',
    minutes: 4,
    intro: 'Simple interest adds the same dollars each year. Compound interest adds a return on earlier returns too.',
    questions: [
      {
        prompt: '$100 at 8% simple interest for 10 years ends near:',
        correctIndex: 1,
        choices: ['$108.', '$180.', '$216.', '$800.'],
        explain: 'Simple interest adds $8 a year, ten times: $100 + $80 = $180. Compounding would land near $216.',
      },
      {
        prompt: 'Why is the compound result larger than the simple result in that example?',
        correctIndex: 0,
        choices: [
          'Each year’s return is calculated on a balance that already includes earlier returns.',
          'Simple interest uses a higher rate by definition.',
          'Compound interest doubles the rate every year.',
          'The original $100 is replaced with $1,000 at year five.',
        ],
        explain: 'The rate stays 8%. The base grows, so later years add more than $8.',
      },
    ],
  },
  {
    id: 'shared-cause',
    difficulty: 'medium',
    topic: 'science',
    title: 'A shared cause',
    minutes: 4,
    intro: 'Two lines rising together are a pattern. A third factor can push both.',
    questions: [
      {
        prompt: 'Ice cream sales and sunburns rise in the same months. The best reading is:',
        correctIndex: 2,
        choices: [
          'Ice cream causes sunburns.',
          'Sunburns cause people to buy ice cream as medicine.',
          'A shared factor, the season, can drive both trends.',
          'The measurements must be fake.',
        ],
        explain: 'The correlation can be real while the causal arrow between ice cream and sunburns is wrong. Summer drives both.',
      },
      {
        prompt: 'Before calling a correlation a cause, you should ask:',
        correctIndex: 1,
        choices: [
          'Whether the chart uses your favorite color.',
          'What else changed, and whether the effect remains when those factors are steadier.',
          'Whether the larger number is always the cause.',
          'Whether anyone has already made a decision, in which case the question is closed.',
        ],
        explain: 'Other factors and the order of events are the usual holes in a causal story built from a pattern alone.',
      },
    ],
  },
  {
    id: 'which-door',
    difficulty: 'medium',
    topic: 'business',
    title: 'Which door is it?',
    minutes: 4,
    intro: 'Reversible tests can move fast. Costly-to-undo choices deserve slower assumptions.',
    questions: [
      {
        prompt: 'Which choice is the clearest two-way door?',
        correctIndex: 0,
        choices: [
          'The subject line of one email you can resend tomorrow.',
          'A five-year lease with a large exit penalty.',
          'Selling the company.',
          'A contract that cannot be cancelled.',
        ],
        explain: 'The subject line is cheap to change after you see the result. The other three are expensive or impossible to undo.',
      },
      {
        prompt: 'Using a slow, high-evidence process on a two-way door usually:',
        correctIndex: 3,
        choices: [
          'Removes every risk.',
          'Is required by the definition of a reversible test.',
          'Makes the small test more accurate than shipping it.',
          'Spends time you could have used to learn from a small test.',
        ],
        explain: 'When reversal is cheap, a small test often teaches more than a long debate about the same uncertainty.',
      },
    ],
  },
  {
    id: 'silent-contract',
    difficulty: 'medium',
    topic: 'technology',
    title: 'A silent contract change',
    minutes: 4,
    intro: 'An API is the request and the reply two programs agreed on. Internals can change. That agreement should not change in secret.',
    questions: [
      {
        prompt: 'Your app reads a field called author. The service removes author and does not tell you. What broke?',
        correctIndex: 1,
        choices: [
          'The app’s button color.',
          'The response contract your app relied on.',
          'The idea of searching.',
          'Nothing, because internal database speed improved.',
        ],
        explain: 'The caller depended on a field in the reply. Removing it without a migration breaks that promise.',
      },
      {
        prompt: 'Which change can stay inside the service without breaking callers?',
        correctIndex: 0,
        choices: [
          'A faster database that still returns the same fields.',
          'Renaming every response field overnight.',
          'Deleting the endpoint callers use.',
          'Requiring a new secret header and not documenting it.',
        ],
        explain: 'Callers do not see the database. They see fields, addresses, and required headers. Those are the contract.',
      },
    ],
  },
  {
    id: 'overlap-trap',
    difficulty: 'hard',
    topic: 'finance',
    title: 'The overlap trap',
    minutes: 4,
    intro: 'Count independent risks, not fund names. Overlapping holdings move together.',
    questions: [
      {
        prompt: 'Eight funds all track the same large-cap index. In a drop of that index, you should expect:',
        correctIndex: 2,
        choices: [
          'Only one fund to fall, because the others diversify it.',
          'No change, because an index cannot fall.',
          'All eight to fall together, because they hold the same market.',
          'The funds to behave like cash.',
        ],
        explain: 'The labels differ and the exposure does not. A shared index is one big risk, repeated.',
      },
      {
        prompt: 'Diversification’s real tradeoff is:',
        correctIndex: 1,
        choices: [
          'You eliminate the chance of loss.',
          'You are less likely to own only the single best performer.',
          'You must avoid stocks entirely.',
          'You are guaranteed a gain every year.',
        ],
        explain: 'Spreading drivers of return trims the single-winner outcome and the single-failure outcome. It does not erase risk.',
      },
    ],
  },
  {
    id: 'sunset-correction',
    difficulty: 'hard',
    topic: 'science',
    title: 'Sunset correction',
    minutes: 4,
    intro: 'Color at sunset is about the path through air and which wavelengths scatter, not a daily cooling of the Sun.',
    questions: [
      {
        prompt: 'Why does a longer path through the atmosphere change the color you see near sunset?',
        correctIndex: 0,
        choices: [
          'Shorter blue wavelengths scatter away, so longer red wavelengths remain in the direct beam.',
          'The Sun’s surface temperature falls to red-hot every evening.',
          'Air stops interacting with light after noon.',
          'Red light has a shorter wavelength than blue light and scatters more.',
        ],
        explain: 'Blue light scatters more than red. A longer path removes much of that blue from the beam aimed at you. Red is the longer wavelength.',
      },
      {
        prompt: 'Violet scatters even more than blue. We still describe the daytime sky as blue partly because:',
        correctIndex: 3,
        choices: [
          'Violet light is not in sunlight.',
          'Human eyes see violet more strongly than blue.',
          'The ocean paints the sky after sunrise.',
          'Eyes are less sensitive to violet, and the upper atmosphere absorbs some of it.',
        ],
        explain: 'Scattering favors violet even more than blue. Perception and absorption shift what we actually see toward blue.',
      },
    ],
  },
  {
    id: 'hostile-agreement',
    difficulty: 'hard',
    topic: 'history',
    title: 'Hostile agreement',
    minutes: 4,
    intro: 'When opponents agree on a detail, that detail is often stronger than either side’s adjectives.',
    questions: [
      {
        prompt: 'Two rival papers agree on the wage demand and the date of a strike. They disagree about who was at fault. What is the stronger evidence?',
        correctIndex: 1,
        choices: [
          'The most emotional headline.',
          'The date and the wage demand that both sides report.',
          'Whichever paper is longer.',
          'The adjectives, because they carry the moral point.',
        ],
        explain: 'Writers with opposite aims have less reason to invent the same date and the same number. Blame language is the argument.',
      },
      {
        prompt: 'The useful question about bias is:',
        correctIndex: 0,
        choices: [
          'What is the tilt, and which other sources check it?',
          'How do I find a source with no viewpoint at all?',
          'Which account uses the most adjectives?',
          'Can I discard every source once I notice a purpose?',
        ],
        explain: 'Viewpoint is expected. Naming it and comparing claims is the method. A viewpoint-free source is not a realistic standard.',
      },
    ],
  },
  {
    id: 'price-floor',
    difficulty: 'hard',
    topic: 'business',
    title: 'Floor and alternative',
    minutes: 4,
    intro: 'Cost tells you what you cannot sustainably go below. Buyers compare you with the next real option.',
    questions: [
      {
        prompt: 'A service costs you $20 to deliver. A rival charges $70 and includes a result yours does not. What is accurate?',
        correctIndex: 2,
        choices: [
          'Your price must be $20 or the math is wrong.',
          'Your price must be $70 or buyers will be confused.',
          '$20 is a floor. Buyers will judge your offer against the $70 alternative and its result.',
          'Price has no relationship to either cost or alternatives.',
        ],
        explain: 'Cost keeps the offer sustainable. The rival anchors what buyers think the outcome is worth.',
      },
      {
        prompt: 'Narrowing an offer and raising the price can improve the work because:',
        correctIndex: 1,
        choices: [
          'All buyers want to pay the highest number available.',
          'The clearer result attracts people who value it, and the price has to support the care required.',
          'Low prices are a legal problem.',
          'Alternatives stop mattering once a price is printed.',
        ],
        explain: 'Packaging changes who says yes and whether you can afford to deliver the promised result.',
      },
    ],
  },
];

function normalize(challenge, index) {
  return {
    ...challenge,
    questions: challenge.questions.map((question, questionIndex) => ({
      id: `${challenge.id}-q${questionIndex + 1}`,
      prompt: question.prompt,
      explain: question.explain,
      choices: question.choices.map((text, choiceIndex) => ({
        id: `${challenge.id}-q${questionIndex + 1}-c${choiceIndex + 1}`,
        text,
        correct: choiceIndex === question.correctIndex,
      })),
    })),
    order: index,
  };
}

export const challengePool = pool.map(normalize);
