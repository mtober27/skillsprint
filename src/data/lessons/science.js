export const sciencePaths = [
  {
    id: 'scientific-thinking',
    topic: 'science',
    title: 'Scientific Thinking',
    level: 'Beginner',
    summary: 'What a testable claim is, and why two trends moving together are not yet a cause.',
  },
  {
    id: 'everyday-physics',
    topic: 'science',
    title: 'Everyday Physics',
    level: 'Beginner',
    summary: 'Energy you can account for, and why the daytime sky and a sunset are different colors.',
  },
];

export const scienceLessons = [
  {
    id: 'hypothesis-theory',
    pathId: 'scientific-thinking',
    title: 'Hypothesis, Theory, and Guess',
    minutes: 5,
    objective: 'Separate a testable hypothesis and a well-supported theory from an untested hunch.',
    paragraphs: [
      'In science, a hypothesis is a testable explanation or prediction. You can imagine an observation that would make it fail. If nothing could count against it, it is not doing scientific work. A guess you refuse to test is neither a hypothesis nor a theory.',
      'A theory is not a casual hunch. It is a broad explanation that has survived many tests and ties many facts together, such as the germ theory of disease. In everyday speech, “just a theory” means “only a guess.” In science, a theory is a strong framework. The words drifted apart, and the scientific meaning is the one that matters in this lesson.',
    ],
    example: {
      title: 'Light and a plant',
      body: '“This plant grows faster with more light” is a hypothesis. You can measure growth under two light levels and watch it fail if the measurements disagree. “Plants just like being happy” is not testable until you define a measurement. Germ theory is in a different class: it explains why handwashing, sterilization, and antibiotics work across many diseases, and it has been tested for a long time.',
    },
    takeaway: 'A hypothesis can be wrong in public. A scientific theory has already been right about a lot of tests.',
    questions: [
      {
        prompt: 'A scientific hypothesis must be:',
        correctIndex: 1,
        choices: [
          'Already proven for a century before anyone may state it.',
          'Testable, with some observation that could show it is wrong.',
          'Impossible to check.',
          'The same thing as a wild guess you will not examine.',
        ],
        explain: 'If nothing could count against the claim, the claim is not yet a scientific hypothesis.',
      },
      {
        prompt: 'In science, a theory is:',
        correctIndex: 0,
        choices: [
          'A broad explanation supported by repeated evidence.',
          'A weak rumor.',
          'A single idea that has never been tested.',
          'A rule that forbids new data.',
        ],
        explain: 'Everyday “theory” and scientific theory are different uses of the word. The scientific one is strong because it has survived tests.',
      },
      {
        prompt: 'Which statement is a hypothesis as this lesson uses the word?',
        correctIndex: 2,
        choices: [
          '“Plants enjoy kindness,” with no way to measure kindness or growth.',
          '“We should respect nature,” offered as a value.',
          '“Seedlings under 12 hours of light will grow taller in 14 days than seedlings under 6 hours.”',
          '“Germ theory is only a guess, so handwashing is optional.”',
        ],
        explain:
          'The light statement predicts a measurable difference. The others are either untestable, a value, or a misuse of the word theory.',
      },
    ],
  },
  {
    id: 'correlation-cause',
    pathId: 'scientific-thinking',
    title: 'Correlation Is Not Causation',
    minutes: 6,
    objective: 'Tell a pattern of two things moving together from evidence that one produces the other.',
    paragraphs: [
      'Correlation means two things move together. Causation means one produces the other. Ice cream sales and sunburns both rise in the same months. Ice cream does not cause sunburns. Summer drives both. The chart is real. The causal story is the part that can be wrong.',
      'Before you treat a correlation as a cause, ask what else changed, whether the order in time makes sense, and whether a careful comparison still shows the effect when other factors are held as steady as possible. A pattern is a clue. A lever is a stronger claim.',
    ],
    example: {
      title: 'Bookstores and test scores',
      body: 'Cities with more bookstores have higher test scores. Closing bookstores would not automatically drop scores. Wealth, schools, and available time may explain both the stores and the scores. The bookstore count is a clue, not a lever, until someone tests the lever and watches the other factors.',
    },
    takeaway: 'Moving together is a pattern. Cause is a separate claim that has to survive other explanations.',
    questions: [
      {
        prompt: 'Two trends rising together show:',
        correctIndex: 1,
        choices: [
          'Proof that the first causes the second.',
          'A correlation, which still needs a cause to be established.',
          'That measurement is useless.',
          'That the second must have caused the first.',
        ],
        explain: 'Moving together is a pattern. Cause is a stronger claim and needs more than a shared direction.',
      },
      {
        prompt: 'A third factor, like summer in the ice-cream example, can:',
        correctIndex: 0,
        choices: [
          'Create a correlation between two things that do not cause each other.',
          'Exist only when a chart is drawn by hand.',
          'Erase the measurements so the correlation was never real.',
          'Prove the data was fabricated.',
        ],
        explain: 'Shared causes produce real correlations with the wrong story attached. The numbers can be honest and the explanation still wrong.',
      },
      {
        prompt: 'Cities with more bookstores have higher test scores. The careful next step is to:',
        correctIndex: 3,
        choices: [
          'Close bookstores and expect scores to fall immediately.',
          'Treat bookstore count as a lever you already understand.',
          'Ignore the pattern because correlations are always fake.',
          'Ask which other factors could explain both the stores and the scores.',
        ],
        explain: 'The pattern deserves curiosity. It does not, by itself, tell you that bookstores are the cause.',
      },
    ],
  },
  {
    id: 'energy-work',
    pathId: 'everyday-physics',
    title: 'Energy, Work, and Heat',
    minutes: 5,
    objective: 'Describe energy as the capacity to do work, and heat as a common form that motion turns into.',
    paragraphs: [
      'In physics, work is done when a force moves something along the direction of the force. Energy is the capacity to do that work. A battery, a raised book, and a moving bicycle store or carry energy in different forms. When you brake, the motion does not vanish from the universe. It changes form, often into heat and sound.',
      'That accounting is why brakes get hot, and why a machine that claims to run forever with no energy coming in does not survive contact with friction. Real machines leak useful motion into heat. You have to keep putting energy in.',
    ],
    example: {
      title: 'The book on the shelf',
      body: 'Lift a book onto a shelf and you increase its gravitational potential energy. Knock it off and that energy becomes motion, then heat, sound, and a small dent of deformation when it hits the floor. The energy is accounted for. It did not disappear, and it will not put the book back on the shelf by itself.',
    },
    takeaway: 'Energy changes form. Friction turns motion you wanted into heat you usually did not.',
    questions: [
      {
        prompt: 'When you brake a bicycle, the motion energy mainly:',
        correctIndex: 1,
        choices: [
          'Disappears from the universe.',
          'Converts into other forms, especially heat.',
          'Becomes a new fuel that returns fully to the pedals.',
          'Doubles, because friction adds energy.',
        ],
        explain: 'Braking converts motion into heat and sound. Friction does not hand that energy back as free forward motion.',
      },
      {
        prompt: 'Why is a frictionless perpetual-motion plan not a real machine you can build and ignore?',
        correctIndex: 0,
        choices: [
          'Friction turns useful energy into heat you do not fully get back as motion.',
          'Physics forbids the existence of heat.',
          'Wheels are unable to turn.',
          'Energy increases by itself if you wait long enough.',
        ],
        explain: 'Real machines lose useful energy to heat. Something has to keep supplying energy if you want the motion to continue.',
      },
      {
        prompt: 'A book on a high shelf has more gravitational potential energy than the same book on the floor because:',
        correctIndex: 2,
        choices: [
          'The shelf paints the book with extra mass.',
          'Height destroys energy so the higher book has less.',
          'Lifting it against gravity stored energy that can become motion if it falls.',
          'Books only have energy when they are moving sideways.',
        ],
        explain: 'The lift stored energy. A fall turns that stored energy into motion, then into heat and sound at the bottom.',
      },
    ],
  },
  {
    id: 'blue-sky',
    pathId: 'everyday-physics',
    title: 'Why the Daytime Sky Looks Blue',
    minutes: 6,
    objective: 'Explain daytime blue and sunset red with scattering and the path length of sunlight.',
    paragraphs: [
      'Sunlight looks white, but it is a mix of colors. Air molecules scatter shorter wavelengths, blue and violet, more than longer red wavelengths. This is called Rayleigh scattering. Scattered blue light reaches your eyes from all over the sky, so the sky looks blue even when you are not looking at the Sun.',
      'At sunset the light travels through more air on its way to you. Much of the blue has been scattered away before it arrives, and the longer red and orange wavelengths remain on the direct path. Violet is scattered even more than blue, but human eyes are less sensitive to it, and the upper atmosphere absorbs some of it, so we perceive a blue sky rather than a violet one. The Sun itself is not cooling down each evening.',
    ],
    example: {
      title: 'Milk in a glass',
      body: 'A glass of water with a drop of milk looks bluish from the side and warmer when you look through it toward a flashlight. Particles scatter blue light aside and let the longer wavelengths continue forward. It is only a rough picture of noon versus sunset, and it matches the idea: scattered light from the side, redder light along the long path.',
    },
    takeaway: 'Blue is scattered toward you all day. Red remains when the path through air is long.',
    questions: [
      {
        prompt: 'The daytime sky looks blue mainly because:',
        correctIndex: 1,
        choices: [
          'The ocean reflects a paint-like coating onto the air.',
          'Air scatters shorter blue wavelengths toward your eyes from many directions.',
          'The Sun emits only blue light.',
          'Ozone is a blue dye spread across the horizon.',
        ],
        explain: 'Rayleigh scattering sends blue light to your eye from across the sky. The Sun’s light is a mix, not blue alone.',
      },
      {
        prompt: 'Sunsets look red because:',
        correctIndex: 0,
        choices: [
          'The longer path through air removes much of the blue, leaving longer wavelengths.',
          'The Sun’s surface cools down every evening.',
          'Scattering stops at 5 p.m.',
          'Red light is scattered more strongly than blue light.',
        ],
        explain: 'Blue is scattered out of the direct beam along the long path. Red continues toward you. The Sun is not cooling on a daily schedule to make the color.',
      },
      {
        prompt: 'A friend says sunsets are red because the Sun cools each evening. The best correction is:',
        correctIndex: 3,
        choices: [
          'Agree. Surface temperature drops to red-hot every night.',
          'Sunsets are red because the sky stops scattering after noon.',
          'Red wavelengths are shorter than blue wavelengths, so they bounce more.',
          'The Sun does not cool on that schedule. A longer path through air scatters blue away and leaves red.',
        ],
        explain:
          'The color change is about the path through the atmosphere and how wavelengths scatter, not a daily cooling of the Sun. Blue light has the shorter wavelength.',
      },
    ],
  },
];
