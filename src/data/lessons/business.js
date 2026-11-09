export const businessPaths = [
  {
    id: 'startup-foundations',
    topic: 'business',
    title: 'Startup Foundations',
    level: 'Beginner',
    summary: 'How a venture creates value, notices real demand, and sets a price people can understand.',
  },
  {
    id: 'leadership-essentials',
    topic: 'business',
    title: 'Leadership Essentials',
    level: 'Intermediate',
    summary: 'Give feedback people can use, and decide when the facts are still incomplete.',
  },
];

export const businessLessons = [
  {
    id: 'business-model',
    pathId: 'startup-foundations',
    title: 'What a Business Model Is',
    minutes: 5,
    objective: 'Describe a business model as the logic of value, delivery, and payment.',
    paragraphs: [
      'A business model is how an organization creates value, delivers it, and gets paid. It is not a slogan and it is not a pitch deck. It answers four practical questions: Who is the customer? What problem do you solve for them? How does the offer reach them? Why does the money coming in cover the cost of serving them?',
      'Two companies can sell the same kind of thing and still run different models. The difference shows up in who pays, when they pay, and what has to stay true for the work to continue.',
    ],
    example: {
      title: 'Bread today versus a monthly box',
      body: 'A neighborhood bakery earns money when someone walks in and pays for bread today. A meal-kit app charges a subscription, pays for boxes and shipping, and has to keep people subscribed after the first delivery. Both sell food. Their models are different because delivery and payment work differently.',
    },
    takeaway: 'If you cannot say who pays, and for which result, you do not have a model yet.',
    questions: [
      {
        prompt: 'Which question belongs in a business model?',
        correctIndex: 1,
        choices: [
          'Which typeface should the logo use?',
          'How does the organization get paid for the value it delivers?',
          'How many slides should a pitch deck contain?',
          'Which social network is most popular this month?',
        ],
        explain:
          'A model describes how value is created, delivered, and paid for. Logo fonts, deck length, and social trends are separate choices.',
      },
      {
        prompt: 'A sidewalk coffee cart takes cash. A second company ships beans on a monthly subscription. What is true?',
        correctIndex: 2,
        choices: [
          'They share one business model because both sell coffee.',
          'Only the subscription counts as a real business.',
          'Their models differ because delivery and payment differ.',
          'A business model applies only to software companies.',
        ],
        explain:
          'The product category can match while the way value is delivered and captured does not. That difference is the model.',
      },
      {
        prompt: 'Why is “we will be the best brand in the category” not yet a business model?',
        correctIndex: 0,
        choices: [
          'It names an ambition, not who pays or how the offer reaches them.',
          'Brands cannot charge money.',
          'Models are only written after a company is profitable.',
          'A model must be a spreadsheet with more than 40 rows.',
        ],
        explain:
          'Ambition can guide the work. A model still has to spell out the customer, the offer, the path to that customer, and the payment.',
      },
    ],
  },
  {
    id: 'product-market-fit',
    pathId: 'startup-foundations',
    title: 'Product-Market Fit in One Idea',
    minutes: 5,
    objective: 'Tell polite interest apart from evidence that a specific group keeps coming back.',
    paragraphs: [
      'A product has market fit when a specific group of people wants it enough to keep using it, and to miss it if it disappeared, without you constantly pushing. Before that, growth feels like pushing a boulder. After it, demand starts to pull.',
      'People are polite. “I like the idea” is a weak signal. Stronger signals are repeated use without a reminder, disappointment if the product goes away, and payment with money or serious time.',
    ],
    example: {
      title: 'Cool versus needed',
      body: 'A study app launches to everyone. Students call it “pretty cool” and never open it after day one. The team then narrows to nursing students preparing for one exam. Those students open it every night and ask when the next practice set drops. The second group is a fit signal. The first group offered a compliment.',
    },
    takeaway: 'Fit is repeated, voluntary use by a defined group, not a round of polite praise.',
    questions: [
      {
        prompt: 'Which signal is the strongest evidence of product-market fit?',
        correctIndex: 2,
        choices: [
          'People say the idea sounds interesting in a survey.',
          'Friends share the launch post once.',
          'A specific group returns and would be upset if the product vanished.',
          'The logo wins a design award.',
        ],
        explain:
          'Fit shows up as repeated use by a defined group. Praise, a single share, and awards can happen without that pull.',
      },
      {
        prompt: 'Why is “everyone” a weak first customer?',
        correctIndex: 0,
        choices: [
          'A vague audience hides whether any specific group truly needs the product.',
          'Large groups are legally barred from paying.',
          'Markets only exist for luxury goods.',
          'Founders should avoid talking to customers.',
        ],
        explain:
          'A sharp audience makes the pull visible. “Everyone” blends real need with polite curiosity.',
      },
      {
        prompt: 'Someone says they would “definitely buy it someday.” What should you treat that as?',
        correctIndex: 3,
        choices: [
          'Proof that the price is correct.',
          'Evidence of product-market fit.',
          'A promise you can put in a forecast as certain revenue.',
          'A weak signal until they return, pay, or spend real time.',
        ],
        explain:
          'Future intent is easy to say. Fit is observed when people come back or pay without being pushed.',
      },
    ],
  },
  {
    id: 'pricing-decision',
    pathId: 'startup-foundations',
    title: 'Pricing Is a Product Decision',
    minutes: 6,
    objective: 'Use cost as a floor and the buyer’s next-best option as the comparison that sets a range.',
    paragraphs: [
      'Price tells people who the offer is for and what to expect. Too low, and buyers may assume low quality while you cannot afford to support them. Too high, with no clear difference from alternatives, and people walk away.',
      'Costs set the floor. They do not, by themselves, set what someone will pay. Buyers compare your offer with the next option that solves the same problem. The gap between your cost and that perceived value is the range you can actually price inside.',
    ],
    example: {
      title: 'From $15 an hour to a finished article',
      body: 'A freelance editor charges $15 an hour because that covers their time. Clients treat the work as optional cleanup and send messy drafts. The editor switches to $180 per short article, includes one revision, and describes the outcome: a piece ready to publish. Fewer clients say yes. The ones who do arrive prepared, and the editor earns more for each hour of real work.',
    },
    takeaway: 'Price and packaging change who shows up, not just how much you invoice.',
    questions: [
      {
        prompt: 'What do costs tell you about price?',
        correctIndex: 1,
        choices: [
          'The price should always equal the cost.',
          'Costs set a floor. They do not by themselves set what customers will pay.',
          'Costs should be ignored completely.',
          'Higher costs always mean customers see more value.',
        ],
        explain:
          'You need price above cost to sustain the work. Willingness to pay comes from value compared with alternatives.',
      },
      {
        prompt: 'Why can raising the price and narrowing the offer sometimes help?',
        correctIndex: 0,
        choices: [
          'A clearer outcome and a serious price attract buyers who value that result.',
          'Every customer prefers to pay more.',
          'Low prices are illegal in most markets.',
          'Customers never compare alternatives.',
        ],
        explain:
          'Packaging changes expectations. A defined result at a serious price filters for buyers who want that result.',
      },
      {
        prompt: 'A tutor’s cost is $20 an hour. A competitor charges $70 and includes written feedback. What is the most accurate reading?',
        correctIndex: 3,
        choices: [
          'The right price is $20, because that is the cost.',
          'The right price is $70, because copying a competitor removes risk.',
          'Price should be set at half of cost to win volume.',
          '$20 is a floor. Buyers will judge value against the $70 alternative.',
        ],
        explain:
          'Cost stops you from pricing below what the work consumes. Buyers still decide by comparing options and outcomes.',
      },
    ],
  },
  {
    id: 'useful-feedback',
    pathId: 'leadership-essentials',
    title: 'Feedback People Can Use',
    minutes: 5,
    objective: 'Give feedback that names the behavior, the effect, and a next step.',
    paragraphs: [
      'Useful feedback names what happened, why it mattered, and what to do next. “You are bad at presentations” is a label. “In the first two minutes you listed features before the customer problem, so the room looked lost. Next time, open with the problem in one sentence.” is something a person can change.',
      'Give corrective feedback close to the event, in private, and about the work rather than the person’s character. Praise can be public. A correction in public often turns into self-defense, and the change you wanted never happens.',
    ],
    example: {
      title: 'A note a designer can act on',
      body: 'After a design review, a manager says, “The prototype buried the search box under three menus. Two testers could not find it. Pull search into the header before Friday’s test.” The designer knows what failed, why it matters, and what to change before the next session.',
    },
    takeaway: 'Behavior, effect, next step. Leave the character judgment out.',
    questions: [
      {
        prompt: 'Which comment is actionable feedback?',
        correctIndex: 2,
        choices: [
          '“This is not your best work.”',
          '“You always do this.”',
          '“The agenda had no decision at the end, so the meeting ran long. End with the owner and the date.”',
          '“Great job!” with no detail, after a failed review.',
        ],
        explain:
          'Actionable feedback points to a specific behavior, its effect, and a change. Labels and empty praise do not tell anyone what to do.',
      },
      {
        prompt: 'Why is corrective feedback usually better in private?',
        correctIndex: 1,
        choices: [
          'Public praise is never useful.',
          'A public correction often makes people defend themselves instead of listen.',
          'Private feedback should stay vague so feelings are protected.',
          'Teams should avoid talking about the work.',
        ],
        explain:
          'The goal is a change in the work. Public shame makes listening less likely. Specific private feedback still tells the truth.',
      },
      {
        prompt: 'A teammate missed a deadline. Which opening is most useful?',
        correctIndex: 0,
        choices: [
          '“The Friday draft arrived Monday, so review started late. Let’s set a Wednesday checkpoint next time.”',
          '“You are unreliable.”',
          '“Everyone misses deadlines, so it does not matter.”',
          '“I will take the project back and not mention it.”',
        ],
        explain:
          'The useful version names the slip, the consequence, and a concrete change. The label does not teach a next step.',
      },
    ],
  },
  {
    id: 'reversible-decisions',
    pathId: 'leadership-essentials',
    title: 'Deciding When You Cannot Know',
    minutes: 6,
    objective: 'Separate reversible choices from hard-to-undo choices, and count the cost of waiting.',
    paragraphs: [
      'Many decisions are made with incomplete information. Waiting for certainty is also a decision, and delay has a cost. A practical split is one-way and two-way doors. A two-way door is reversible and cheap to test, so decide quickly and learn. A one-way door is hard to undo, so slow down, name the assumptions, and ask what evidence would change your mind.',
      'Using the fast rule on a one-way door creates damage that is expensive to reverse. Using the slow rule on a two-way door wastes the chance to learn from a small test.',
    ],
    example: {
      title: 'A headline versus a lease',
      body: 'Choosing a headline for an email is a two-way door. Send a small test and keep the line that gets the result you care about. Signing a five-year office lease is closer to a one-way door. The same “just decide this afternoon” rule should not cover both.',
    },
    takeaway: 'Speed is for reversible tests. Care is for choices you cannot cheaply undo.',
    questions: [
      {
        prompt: 'A two-way door decision is one that:',
        correctIndex: 1,
        choices: [
          'Requires a 40-page report before anyone may act.',
          'Is cheap to reverse, so a small test beats a long debate.',
          'Can never be revisited once announced.',
          'Should be avoided until next quarter.',
        ],
        explain: 'Reversible choices reward speed because the cost of being wrong is limited and the test produces evidence.',
      },
      {
        prompt: 'Why does the cost of delay matter?',
        correctIndex: 0,
        choices: [
          'Not choosing still has consequences while time passes.',
          'Waiting is always free.',
          'Fast decisions are always right.',
          'Evidence should be ignored once a deadline exists.',
        ],
        explain:
          'Delay is itself a choice. In a moving situation, the cost of waiting can be larger than the cost of a reversible test.',
      },
      {
        prompt: 'Which choice should usually be treated as a one-way door?',
        correctIndex: 3,
        choices: [
          'The subject line of a single email.',
          'The order of two paragraphs on a webpage you can edit later today.',
          'A button color you can ship and change next week.',
          'A five-year contract with a large cancellation penalty.',
        ],
        explain:
          'The contract is expensive to undo. The other three can be changed after you see what happens.',
      },
    ],
  },
];
