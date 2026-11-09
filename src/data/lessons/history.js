export const historyPaths = [
  {
    id: 'turning-points',
    topic: 'history',
    title: 'Turning Points',
    level: 'Beginner',
    summary: 'Two shifts that changed the price of ideas and the pace of production.',
  },
  {
    id: 'reading-history',
    topic: 'history',
    title: 'How to Read History',
    level: 'Intermediate',
    summary: 'Use primary and secondary sources together, and check a viewpoint instead of pretending it is absent.',
  },
];

export const historyLessons = [
  {
    id: 'printing-press',
    pathId: 'turning-points',
    title: 'The Printing Press Changed the Price of Ideas',
    minutes: 5,
    objective: 'Explain how movable type made identical texts cheaper and easier to argue with.',
    paragraphs: [
      'Before movable type spread in Europe, copying a book meant writing it by hand. A single volume could take months, so books stayed rare and expensive. Around the 1450s, Johannes Gutenberg’s press in Mainz used reusable metal type. A page could be set once and printed many times. Pamphlets, Bibles, and scientific notes spread faster, and with fewer differences introduced by each copyist.',
      'The press did not create literacy overnight. It made texts cheap enough for literacy to matter more. Authority over a single official copy weakened because more people could read the same text and dispute it. Disagreement could travel with the copies.',
    ],
    example: {
      title: 'One pamphlet, many readers',
      body: 'A handwritten news sheet reaches a few cities, and each copy can drift. A printed pamphlet can leave a shop in the hundreds, carrying the same claims to readers who have never met the author. Those readers can answer it with another pamphlet. The argument scales with the print run.',
    },
    takeaway: 'The press mattered because identical texts became fast and cheap, not because it ended disagreement.',
    questions: [
      {
        prompt: 'The press mattered most because it:',
        correctIndex: 1,
        choices: [
          'Ended all public disagreement.',
          'Made identical texts far cheaper and faster to reproduce.',
          'Replaced the need for anyone to learn to read.',
          'Was the first way humans had ever stored words.',
        ],
        explain: 'Hand copying already stored words. The change was scale, speed, cost, and consistency.',
      },
      {
        prompt: 'A social effect of cheaper identical texts was:',
        correctIndex: 0,
        choices: [
          'More readers could see the same claims and dispute them.',
          'Fewer people could challenge an official version.',
          'Books became unique one-of-one art objects only.',
          'Scientific notes stopped circulating.',
        ],
        explain: 'Shared copies let criticism travel, not only official messages. The technology did not silence argument.',
      },
      {
        prompt: 'Which detail matches the lesson?',
        correctIndex: 2,
        choices: [
          'Gutenberg worked in the 1750s, after the steam engine.',
          'Each printed page had to be carved again for every single copy.',
          'Reusable type let a page be set once and printed many times.',
          'Printing made literacy universal within a year.',
        ],
        explain:
          'Reusable metal type is the mechanical point. Literacy took far longer than a year, and the 1450s are the right century, not the 1750s.',
      },
    ],
  },
  {
    id: 'industrial-shift',
    pathId: 'turning-points',
    title: 'The Industrial Revolution Was a Power Shift',
    minutes: 6,
    objective: 'Describe factory machine power as both a rise in output and a shift in who bore the costs.',
    paragraphs: [
      'The Industrial Revolution, beginning in Britain in the late 1700s, replaced a great deal of human, animal, and small-scale water power with coal-fired machines. Factories gathered workers and machines in one place. Cloth, iron, and later travel by railroad got cheaper. Output per worker rose.',
      'The gains were uneven. Factory hours were long, cities grew faster than housing and sanitation, and wealth pooled around people who owned the machines and the mills. It is a story about productivity and a story about who lived with the noise, the hours, and the crowded streets. Both belong in the same account.',
    ],
    example: {
      title: 'The weaver and the mill',
      body: 'A hand weaver controls the pace at home and produces a limited length of cloth. A spinning mill runs many spindles from one steam engine. The price of cloth falls and more people can buy it. The weaver’s old advantage disappears unless they move into the new system. Cheaper cloth and a disrupted trade are the same event seen from two sides.',
    },
    takeaway: 'Output rose and prices fell. Hours, cities, and ownership of the machines shaped who benefited.',
    questions: [
      {
        prompt: 'A core change in the Industrial Revolution was:',
        correctIndex: 1,
        choices: [
          'The end of all farm work in a single year.',
          'Machine power, especially coal and steam, raising output in factories.',
          'The invention of the internet.',
          'A return to household-only production for cloth.',
        ],
        explain: 'Centralized machine production changed scale and cost. Farms did not vanish overnight, and digital networks came much later.',
      },
      {
        prompt: 'Why is this period not only a story of progress?',
        correctIndex: 0,
        choices: [
          'Growth came with long hours and cities that outran housing and sanitation.',
          'Output per worker fell across the board.',
          'Nothing became cheaper to buy.',
          'Steam engines removed inequality within a decade.',
        ],
        explain: 'Productivity rose while the costs fell heavily on workers and on urban living conditions. Cheaper goods and harsh conditions both happened.',
      },
      {
        prompt: 'The hand weaver example is meant to show that:',
        correctIndex: 3,
        choices: [
          'Cloth became more expensive for every buyer.',
          'Household tools always outproduce a steam mill.',
          'Factories avoided hiring people.',
          'Cheaper goods and the loss of an old way of working can be the same change.',
        ],
        explain: 'The mill raises output and lowers price. It also removes the weaver’s previous advantage. One change, two consequences.',
      },
    ],
  },
  {
    id: 'primary-sources',
    pathId: 'reading-history',
    title: 'Primary and Secondary Sources',
    minutes: 5,
    objective: 'Use a trace from the time and a later argument about that trace for different jobs.',
    paragraphs: [
      'A primary source comes from the time you are studying: a letter, a law, a photograph, a diary, a speech, a tool. A secondary source is later analysis: a textbook chapter, a documentary, a historian’s argument. Primary sources are not automatically true. People lie, forget, boast, and write for an audience. Secondary sources are not automatically junk. Good ones show their evidence and weigh conflicting traces.',
      'Research uses both. The primary source is the trace. The secondary source is an argument about many traces. You cite each for the job it can actually do.',
    ],
    example: {
      title: 'One letter and a book',
      body: 'A soldier’s 1916 letter is a primary source about his fear and his unit’s food. It is weak evidence for the whole war’s strategy. A historian’s book that compares thousands of such letters can discuss morale. You would cite the letter for that soldier’s words and the book for the broader claim, then check how the book uses letters that disagree.',
    },
    takeaway: 'Closeness in time is not the same thing as the whole truth. Later analysis is not the same thing as fiction.',
    questions: [
      {
        prompt: 'Which is a primary source for studying a 1963 protest?',
        correctIndex: 2,
        choices: [
          'A textbook chapter written in 2015.',
          'A podcast interview with a historian in 2024.',
          'A photograph taken at the protest that day.',
          'An encyclopedia summary written this year.',
        ],
        explain: 'Primary means from the time of the event. It does not mean the witness saw everything or reported it without a purpose.',
      },
      {
        prompt: 'Why treat a primary source carefully?',
        correctIndex: 1,
        choices: [
          'Old documents are impossible to read.',
          'Authors have purposes, limits, and audiences, so the source is evidence, not the whole truth.',
          'Secondary sources are always fiction.',
          'Only objects buried in the ground count as evidence.',
        ],
        explain: 'A letter can be honest and still partial. Care means asking what the author could know and why they wrote.',
      },
      {
        prompt: 'A soldier’s letter is strong evidence for which claim?',
        correctIndex: 0,
        choices: [
          'What that soldier said about his own conditions.',
          'The entire strategy of every army in the war.',
          'The average mood of all civilians on the home front.',
          'A historian’s later ranking of the war’s causes, by itself.',
        ],
        explain: 'The letter attests to that person’s account. Broader claims need many sources and an argument that shows its work.',
      },
    ],
  },
  {
    id: 'reading-bias',
    pathId: 'reading-history',
    title: 'Bias in Historical Accounts',
    minutes: 6,
    objective: 'Identify a viewpoint and cross-check claims instead of discarding every source that has one.',
    paragraphs: [
      'Bias is a tilt in what someone notices, leaves out, or emphasizes. Every account has a viewpoint, including a careful one. The useful question is not “Is there bias?” but “What tilt, and how do I check it?” Look for who created the source, who they hoped would read it, what they omit, and whether other sources agree on the basic facts.',
      'Officials may inflate victories. Opponents may inflate cruelty. Agreement on a date and a place across hostile sources is often stronger than a vivid story told by only one side. Adjectives travel easily. A shared date is harder for enemies to invent together by accident.',
    ],
    example: {
      title: 'Two papers and a strike',
      body: 'Two newspapers cover a strike. One calls it an attack on order and quotes the factory owner. The other calls it a fight for wages and quotes the workers. The date and the wage demand may match. The moral language may not. A careful reader takes the matched facts and treats the adjectives as argument.',
    },
    takeaway: 'Viewpoint is expected. Comparison is the method. Shared facts across hostile sources earn more trust.',
    questions: [
      {
        prompt: 'A practical way to handle bias is to:',
        correctIndex: 1,
        choices: [
          'Discard every source that has a viewpoint.',
          'Identify the viewpoint and cross-check claims against other sources.',
          'Trust the longest account.',
          'Assume official sources have no tilt.',
        ],
        explain: 'Viewpoint is expected. Throwing out every tilted source would leave you with nothing. Comparison is the method.',
      },
      {
        prompt: 'Facts that appear in hostile sources are useful because:',
        correctIndex: 0,
        choices: [
          'Writers with opposite aims had less shared reason to invent the same detail.',
          'Hostility itself proves that every sentence is true.',
          'Newspapers never make errors.',
          'Adjectives are more reliable than dates.',
        ],
        explain: 'Independent agreement is stronger than one vivid narrative. It is not magic proof, and errors can still be copied.',
      },
      {
        prompt: 'Two rival chronicles agree on the date of a battle and disagree on who started it. What is the stronger takeaway?',
        correctIndex: 3,
        choices: [
          'The date is useless because the blame differs.',
          'The longer chronicle’s blame is automatically correct.',
          'Both the date and the blame are equally well supported.',
          'The shared date is stronger than either side’s blame until more evidence arrives.',
        ],
        explain: 'Enemies gain little by inventing the same date and a lot by assigning blame. Treat the matched fact and the argument differently.',
      },
    ],
  },
];
