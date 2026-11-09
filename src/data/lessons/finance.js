export const financePaths = [
  {
    id: 'money-basics',
    topic: 'finance',
    title: 'Money Basics',
    level: 'Beginner',
    summary: 'Interest, a simple budget split, and the cash buffer that keeps a crisis from becoming debt.',
  },
  {
    id: 'investing-literacy',
    topic: 'finance',
    title: 'Investing Literacy',
    level: 'Intermediate',
    summary: 'What stocks and bonds are for, and why owning “more stuff” is not the same as spreading risk.',
  },
];

export const financeLessons = [
  {
    id: 'compound-interest',
    pathId: 'money-basics',
    title: 'How Compound Interest Grows',
    minutes: 6,
    objective: 'Explain why a balance can grow faster than rate times years, and why early years look slow.',
    paragraphs: [
      'Compound interest means you earn a return on your original money and on the returns already earned. The early years often look slow. Later years do more of the work because the base is larger. Three inputs drive the result: how much you add, the rate, and time. Time is the input people underestimate, because the curve bends late.',
      'This is not a promise that every account grows. Fees, pauses, and losses can interrupt it. The idea to keep is the shape: the same rate produces more dollars once the balance is larger.',
    ],
    example: {
      title: '$100 at 8% for ten years',
      body: 'One hundred dollars growing at 8% a year becomes about $108 after year one and about $216 after ten years, not $180. The extra above $180 comes from interest earning interest. Simple interest would add $8 a year and stop at $180. Compounding applies each new rate to the updated balance.',
    },
    takeaway: 'The base, the rate, and the years all matter. The base is small at the start, so the dollars look small too.',
    questions: [
      {
        prompt: 'Compound interest means:',
        correctIndex: 1,
        choices: [
          'You earn a return only on the original amount.',
          'You earn a return on the original amount and on earlier returns.',
          'Your balance doubles every year at any positive rate.',
          'Interest applies only to loans, never to savings.',
        ],
        explain: 'Compounding applies the rate to a growing balance. Doubling every year would require a 100% rate.',
      },
      {
        prompt: 'Why do the early years of compounding often look slow in dollars?',
        correctIndex: 0,
        choices: [
          'The base is still small, so each year’s growth is small in dollars.',
          'Banks are required to pause interest for new accounts.',
          'Time reduces the rate automatically.',
          'Compounding is legally forbidden before year 20.',
        ],
        explain: 'A modest rate on a small balance produces a modest dollar gain. The same rate on a larger balance produces more dollars.',
      },
      {
        prompt: '$100 grows at 8% compounded for 10 years. Which result matches the lesson’s example?',
        correctIndex: 2,
        choices: [
          'About $108, because growth stops after year one.',
          'About $180, because you add $8 ten times and nothing more.',
          'About $216, because interest also earns interest.',
          'Exactly $800, because 8% times 100 years was the formula.',
        ],
        explain:
          'Simple interest would land near $180. Compounding at 8% for ten years turns $100 into about $216. The $800 figure mixes the rate with the wrong horizon.',
      },
    ],
  },
  {
    id: 'budget-split',
    pathId: 'money-basics',
    title: 'The 50/30/20 Budget',
    minutes: 5,
    objective: 'Use the 50/30/20 split as a diagnostic template for needs, wants, and saving.',
    paragraphs: [
      'A budget is a plan for money you already receive. The 50/30/20 split is a starting template, not a law: about 50% of after-tax income for needs, 30% for wants, and 20% for savings and extra debt payments. Needs include housing, food, transport, and minimum debt payments.',
      'If rent already eats more than half of take-home pay, the template has done its job. It shows the squeeze. You then cut wants, raise income, change housing, or some mix. The point is to decide on purpose instead of wondering where the month went.',
    ],
    example: {
      title: 'A $3,000 take-home paycheck',
      body: 'Sam takes home $3,000. The template points to $1,500 for needs, $900 for wants, and $600 for savings. Rent and groceries already total $1,800, so needs are $300 over the target. The gap is visible. Sam can change housing, trim wants and savings for now, or raise income. The percentages did the diagnostic work.',
    },
    takeaway: 'The split is a flashlight, not a moral score. When it does not fit, the gap tells you where to act.',
    questions: [
      {
        prompt: 'In the 50/30/20 template, the 20% is mainly for:',
        correctIndex: 2,
        choices: [
          'Wants such as dining out.',
          'Taxes that were already withheld.',
          'Savings and extra debt payoff.',
          'Rent only.',
        ],
        explain: 'Needs are the 50 and wants are the 30. The 20 is the portion aimed at the future and at paying debt faster than the minimum.',
      },
      {
        prompt: 'If needs already exceed 50%, the template is useful because:',
        correctIndex: 1,
        choices: [
          'It proves the person is bad with money.',
          'It shows the gap so housing, income, or other categories can change on purpose.',
          'It must be followed to the dollar or the budget fails.',
          'It only works for high incomes.',
        ],
        explain: 'The split is a starting diagnostic. A mismatch is information, not a verdict about character.',
      },
      {
        prompt: 'On a $3,000 take-home pay, the template’s savings target is:',
        correctIndex: 0,
        choices: [
          '$600.',
          '$900.',
          '$1,500.',
          '$3,000.',
        ],
        explain: 'Twenty percent of $3,000 is $600. $900 is the wants target and $1,500 is the needs target.',
      },
    ],
  },
  {
    id: 'emergency-fund',
    pathId: 'money-basics',
    title: 'Why an Emergency Fund Comes First',
    minutes: 5,
    objective: 'Explain the job of cash reserves and why that job is stability, not maximum return.',
    paragraphs: [
      'An emergency fund is cash you can reach quickly for a true surprise: a job loss, a medical bill, or a repair you need in order to work. It is not a vacation fund and it is not your long-term investment account. A common target is three to six months of essential expenses.',
      'The job of this money is stability. A boring savings account is appropriate even when the interest is low. High-return investments can fall in the same month you need the cash. The “return” on an emergency fund is the high-interest debt and the forced sale you get to skip.',
    ],
    example: {
      title: 'The $900 repair',
      body: 'Riley invests every spare dollar and keeps $40 in checking. The car needs a $900 repair. Riley puts it on a card at a high interest rate. A $900 fund would have given up some investment growth and avoided the card interest. The fund’s payoff is the crisis that stays small.',
    },
    takeaway: 'Money you might need suddenly should still be there when the month is a bad one.',
    questions: [
      {
        prompt: 'The main job of an emergency fund is:',
        correctIndex: 1,
        choices: [
          'To maximize long-term investment return.',
          'To cover essential surprises without high-interest debt.',
          'To pay for planned vacations.',
          'To replace a retirement account.',
        ],
        explain: 'Access and stability matter more than yield for this bucket. Retirement money has a different job and a different timeline.',
      },
      {
        prompt: 'Why not park the whole emergency fund in a volatile investment?',
        correctIndex: 0,
        choices: [
          'The value can drop in the same month you need to spend the money.',
          'Investing personal savings is illegal.',
          'Cash accounts always pay a higher return than markets.',
          'Emergencies never happen to people who invest.',
        ],
        explain: 'Money you may need soon should not depend on a market being up that week.',
      },
      {
        prompt: 'Which expense fits the emergency fund’s job?',
        correctIndex: 3,
        choices: [
          'A vacation you have been planning since spring.',
          'A new phone because the current one feels old.',
          'Concert tickets that go on sale Friday.',
          'A car repair you need in order to get to work.',
        ],
        explain: 'The fund is for unplanned essentials. Planned wants belong in the wants category, saved for on purpose.',
      },
    ],
  },
  {
    id: 'stocks-and-bonds',
    pathId: 'investing-literacy',
    title: 'Stocks and Bonds Do Different Jobs',
    minutes: 6,
    objective: 'Distinguish ownership from lending, and match each to a time horizon.',
    paragraphs: [
      'A stock is a slice of ownership in a company. Its price moves with the business and with what buyers will pay, so the ride can be rough. Historically, that ownership has come with higher long-run swings and higher long-run potential than loans. A bond is a loan. You lend money, and the issuer promises interest and repayment. Bonds can still lose value, especially if interest rates rise or the issuer gets into trouble, but they are built as a steadier claim than ownership.',
      'Holding both is about jobs. Stocks are for growth you can wait for. Bonds and cash are ballast for money you may need sooner. The mix follows the calendar: when you need the money, not a slogan about being aggressive or careful.',
    ],
    example: {
      title: 'Forty years versus next year',
      body: 'A 25-year-old saving for retirement decades away can hold mostly stocks because there is time to recover from drops before the money is spent. A person who must spend from the portfolio next year leans more on bonds and cash so a bad stock year does not force a sale at a low price.',
    },
    takeaway: 'Stocks are ownership. Bonds are loans. The calendar decides how much of each job you need.',
    questions: [
      {
        prompt: 'A bond is best described as:',
        correctIndex: 2,
        choices: [
          'Ownership of a company.',
          'A guaranteed way to double money.',
          'A loan to a government or company, with a promise of interest and repayment.',
          'The same claim as a stock, with a different ticker symbol.',
        ],
        explain: 'Bonds are debt. Stocks are equity. The promises and the risks are different, and bonds are not a guarantee against loss.',
      },
      {
        prompt: 'Why might a long retirement timeline allow a higher stock allocation?',
        correctIndex: 1,
        choices: [
          'Stocks cannot fall over long periods.',
          'There is more time to ride out declines before the money is needed.',
          'Bonds are only issued to companies, never to people.',
          'Age has no relationship to when you need the money.',
        ],
        explain: 'Time horizon is about when you need to spend. It is not a promise that stocks rise every year.',
      },
      {
        prompt: 'Which statement is accurate?',
        correctIndex: 0,
        choices: [
          'Bonds can lose value, especially if rates rise or the issuer is in trouble.',
          'Bond prices never move after they are issued.',
          'A stock is a loan you must repay to the company.',
          'Cash and stocks serve the same job in a portfolio.',
        ],
        explain:
          'Bonds are steadier claims than stocks, and they still carry interest-rate risk and credit risk. They are not frozen prices.',
      },
    ],
  },
  {
    id: 'diversification',
    pathId: 'investing-literacy',
    title: 'Diversification Is Not Owning More Stuff',
    minutes: 6,
    objective: 'Judge diversification by how holdings move together, not by how many accounts you have.',
    paragraphs: [
      'Diversification means spreading risk across investments that do not all move together. Owning ten funds that hold the same giant companies is not ten risks. It is closer to one risk with extra paperwork. The benefit shows up when one holding has a bad year and others do not fall as hard, so the whole portfolio swings less.',
      'You give up some chance of holding only the single hottest winner. You also give up some chance that a single failure wrecks the plan. Counting tickers without looking at overlap does not buy that tradeoff.',
    ],
    example: {
      title: 'Eight copies of the same market',
      body: 'In a year when energy stocks soar and software stocks drop, a portfolio that holds both falls less than an all-software portfolio. The energy slice did not need to be a genius pick. It needed to be different. Eight funds that all track the same large-cap index rise and fall together. The count looks diversified. The exposure is not.',
    },
    takeaway: 'Different drivers of return matter. A longer list of overlapping funds does not.',
    questions: [
      {
        prompt: 'Which portfolio is more diversified?',
        correctIndex: 1,
        choices: [
          'Five funds that all track the same large technology companies.',
          'A mix of stocks and bonds across industries and regions.',
          'One company you know well, bought in ten separate accounts.',
          'The same stock purchased on ten different days.',
        ],
        explain: 'Diversification depends on different drivers of return, not on the number of accounts or purchase dates.',
      },
      {
        prompt: 'You own eight funds. All eight track the S&P 500. Against a drop in US large-cap stocks, this is:',
        correctIndex: 0,
        choices: [
          'Poorly diversified. The funds overlap, so the same drop hits all eight.',
          'Extremely diversified, because eight is a large number.',
          'Risk-free, because indexes cannot fall.',
          'The same thing as holding bonds.',
        ],
        explain: 'Overlap is the issue. If the underlying holdings match, adding another fund does not add a new risk driver.',
      },
      {
        prompt: 'The tradeoff of diversification is that:',
        correctIndex: 3,
        choices: [
          'It removes all risk of loss.',
          'It guarantees a profit every calendar year.',
          'It only works with bonds.',
          'You are less likely to capture the full gain of the single best holding.',
        ],
        explain: 'Spreading risk trims both the worst outcome and the chance that one winner is your entire result.',
      },
    ],
  },
];
