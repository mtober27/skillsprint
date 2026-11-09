export const technologyPaths = [
  {
    id: 'software-basics',
    topic: 'technology',
    title: 'How Software Works',
    level: 'Beginner',
    summary: 'Algorithms, the contracts between programs, and why teams save the history of a project.',
  },
  {
    id: 'cyber-hygiene',
    topic: 'technology',
    title: 'Cyber Hygiene',
    level: 'Intermediate',
    summary: 'Everyday defenses: spot a fake message, and add a second proof to your logins.',
  },
];

export const technologyLessons = [
  {
    id: 'what-algorithms',
    pathId: 'software-basics',
    title: 'An Algorithm Is a Precise Recipe',
    minutes: 5,
    objective: 'Define an algorithm as finite steps from input to output, and notice that step count can grow.',
    paragraphs: [
      'An algorithm is a finite set of steps that turns an input into an output. A recipe, a sorting method, and a route finder are algorithms when the steps are clear enough to follow without guessing. “Make it better” is not an algorithm. “Compare each pair of adjacent items, swap them if they are out of order, and repeat until a pass makes no swaps” is definite. It is also slow, and that slowness is part of understanding it.',
      'A method that is fine for 10 names can become unusable for 10 million. Good algorithm choices consider how the work grows as the input grows, not only whether the small example looks correct.',
    ],
    example: {
      title: 'Finding a name',
      body: 'Finding a name in an unsorted list of 1,000 people may take up to 1,000 checks. If the list is sorted, a binary search cuts the remaining list in half each time and finishes in about 10 checks. Same job, different algorithm, very different effort as the list gets longer.',
    },
    takeaway: 'If a person or a computer has to guess what you meant, you do not have an algorithm yet.',
    questions: [
      {
        prompt: 'Which of these is an algorithm?',
        correctIndex: 1,
        choices: [
          '“Be more productive.”',
          'A defined sequence of steps that produces an output from an input.',
          'A brand name for an app.',
          'A guess you cannot repeat.',
        ],
        explain: 'Algorithms are precise and finite. A slogan does not say which step comes next.',
      },
      {
        prompt: 'Why can the same task get much harder for some algorithms as the input grows?',
        correctIndex: 0,
        choices: [
          'The number of steps can grow quickly with the size of the data.',
          'Computers refuse any list longer than 100 items.',
          'Sorted lists cannot be searched.',
          'Binary search checks every item one by one.',
        ],
        explain:
          'Scalability is about how the step count grows. Binary search does not check every item. It halves the search each time.',
      },
      {
        prompt: 'About how many checks does binary search need to find one name in a sorted list of 1,000?',
        correctIndex: 2,
        choices: [
          'About 1,000, because every search reads the whole list.',
          'Exactly 2, because the list is split once.',
          'About 10, because the list is halved each step.',
          'Zero, because sorted lists are searched by the file name alone.',
        ],
        explain: 'Halving 1,000 repeatedly lands near 10 steps. A full scan could take up to 1,000 checks.',
      },
    ],
  },
  {
    id: 'api-contracts',
    pathId: 'software-basics',
    title: 'APIs Are Contracts Between Programs',
    minutes: 5,
    objective: 'Describe an API as an agreed request and response, not as the other program’s private internals.',
    paragraphs: [
      'An API, or application programming interface, is a promise about how one piece of software may ask another for something. The caller does not need the internal details. It needs the address, the allowed requests, and the shape of the reply. When a weather app shows the temperature, it often asks a weather service’s API and then formats the response.',
      'If that contract changes without warning, the app can break even when its own screens did not change. The stability of the request and the response is the product the caller depends on.',
    ],
    example: {
      title: 'A library catalog',
      body: 'A library’s catalog API might say: send a search by title, and receive a list with title, author, and available copies. Your app can display that list. You never see the library’s database tables. You only see the contract. If the service renames “author” to “creator” and does not tell you, your app shows a blank line.',
    },
    takeaway: 'Callers depend on the shape of the request and the reply. Internals can change. The contract should not change silently.',
    questions: [
      {
        prompt: 'What does an API mainly provide?',
        correctIndex: 1,
        choices: [
          'A visual theme for a website.',
          'An agreed way for programs to request data or actions and receive a reply.',
          'A guarantee that the internet never fails.',
          'The private source code of every server involved.',
        ],
        explain: 'An API hides internals behind a request and a response shape. It does not promise that networks never fail.',
      },
      {
        prompt: 'An app can break after an API change because:',
        correctIndex: 0,
        choices: [
          'The app depended on the old request or response contract.',
          'Screens always fail when the data is correct.',
          'APIs are unable to send text.',
          'Users edited the remote database by hand from the app icon.',
        ],
        explain: 'If the caller expected a field or a request that no longer exists, the app’s assumption is now false.',
      },
      {
        prompt: 'A catalog API returns title, author, and copies. Your app only needs those three. Which change is a contract break?',
        correctIndex: 3,
        choices: [
          'The library speeds up the database hardware.',
          'The service rewrites internal code but keeps the same fields.',
          'The app changes its own button color.',
          'The service removes the author field without a replacement you were told about.',
        ],
        explain: 'Internal speed and your button color do not change the agreed fields. Removing a field the caller uses does.',
      },
    ],
  },
  {
    id: 'version-control',
    pathId: 'software-basics',
    title: 'Version Control Remembers the Work',
    minutes: 5,
    objective: 'Explain commits and branches as save points that let teams experiment without losing the main line.',
    paragraphs: [
      'Version control, often Git, stores snapshots of a project over time. Each commit is a labeled save point with a message about why it exists. The history shows what changed and who changed it. That is how a group can edit one project without emailing files named final_v7_REAL.',
      'Branches let you try an idea without overwriting the main line. If the experiment fails, you return to a known snapshot. If it works, you merge it back. The bugfix on the main line and the experiment on the branch can both exist until you decide to combine them.',
    ],
    example: {
      title: 'Dark mode on a branch',
      body: 'You add a dark mode on a branch. Meanwhile a teammate fixes a broken button on the main line. You merge. The history shows who changed the colors and who fixed the button. You can undo the dark mode later without also undoing the button fix, because they were separate commits.',
    },
    takeaway: 'A commit is a reason plus a snapshot. A branch is a place to try something without erasing the stable line.',
    questions: [
      {
        prompt: 'A commit is:',
        correctIndex: 2,
        choices: [
          'A chat message with no record of the files.',
          'A branch that deletes older history by default.',
          'A saved snapshot of the project, usually with a message explaining the change.',
          'A type of computer used only for backups.',
        ],
        explain: 'Commits are the memory of the project: what the files were, and why that save exists.',
      },
      {
        prompt: 'Why use a branch for an experiment?',
        correctIndex: 1,
        choices: [
          'Branches make it impossible to keep backups.',
          'You can try changes without immediately overwriting the main line.',
          'Only one person is allowed to use version control.',
          'History is erased as soon as a branch is created.',
        ],
        explain: 'A branch isolates work so the stable line stays intact while you find out whether the idea holds.',
      },
      {
        prompt: 'You want to undo an experiment and keep a teammate’s bugfix. Version control helps because:',
        correctIndex: 0,
        choices: [
          'The experiment and the bugfix can be separate snapshots in the history.',
          'Undo always deletes every commit from the whole team.',
          'Bugfixes cannot be stored in the same project as design changes.',
          'Messages on commits hide which files changed.',
        ],
        explain: 'Separate commits let you reverse one change and keep another. That is the point of a shared history.',
      },
    ],
  },
  {
    id: 'phishing-defense',
    pathId: 'cyber-hygiene',
    title: 'Phishing Borrows Trust',
    minutes: 5,
    objective: 'Recognize urgency and lookalike senders, and open accounts from a path you chose yourself.',
    paragraphs: [
      'Phishing is a message built to make you reveal a password, a code, or money by pretending to be someone you trust. The clues are often urgency (“your account closes in 10 minutes”), a slightly wrong sender address, and a link that does not go where the text claims. Logos are easy to copy, so a familiar picture is not proof.',
      'Legitimate companies do not need your password by email or text. When you are unsure, open the service yourself by typing the address or by using the official app. Do not use the button inside the unexpected message.',
    ],
    example: {
      title: 'The almost-right address',
      body: 'An email from an address like support@paypa1.com says your account is limited. The button goes to a login page that looks familiar. The digit sitting in place of a letter, plus the unexpected threat, is the tell. Opening the real service yourself shows no alert. The message was borrowing the brand, not speaking for it.',
    },
    takeaway: 'Choose the path to the real site yourself. Urgency is a tactic, not proof.',
    questions: [
      {
        prompt: 'A strong habit against phishing is:',
        correctIndex: 1,
        choices: [
          'Click the link quickly so the account stays safe.',
          'Open the service yourself from a known address or the official app, not from the message.',
          'Reply with your password so the sender can confirm your identity.',
          'Trust any message that includes a familiar logo.',
        ],
        explain: 'Logos and pages can be copied. The path you choose to the real service is the defense.',
      },
      {
        prompt: 'Urgency in a suspicious message matters because:',
        correctIndex: 0,
        choices: [
          'Pressure is used to stop you from checking the sender and the link.',
          'Real problems are never time-sensitive.',
          'Banks always threaten to close accounts by email.',
          'Only slow readers are targeted.',
        ],
        explain: 'Rushing is part of the attack. A real organization can still be contacted through a path you open yourself.',
      },
      {
        prompt: 'Which action keeps the password safest?',
        correctIndex: 3,
        choices: [
          'Paste the password into a reply to prove you are the owner.',
          'Read the password aloud to a caller who cites the last four digits of your card.',
          'Type the password into a page opened from an unexpected text message.',
          'Navigate to the service yourself and sign in only if you meant to open it.',
        ],
        explain:
          'A password should be typed into a session you started. Callers and unexpected pages asking for it are using borrowed trust.',
      },
    ],
  },
  {
    id: 'two-factor',
    pathId: 'cyber-hygiene',
    title: 'Two-Factor Authentication',
    minutes: 5,
    objective: 'Explain why a second proof stops a thief who only has the password.',
    paragraphs: [
      'A password proves you know a secret. If someone steals it, the site will treat them as you. Two-factor authentication adds a second proof, usually something you have: a phone app, a hardware key, or a one-time code. A thief with only the password still cannot finish the login.',
      'Text-message codes are a real step up from a password alone. They can also be intercepted more easily than codes from an authenticator app or a hardware key, because the phone number itself can be attacked. Any second factor is worth turning on. The stronger ones are worth using where the account allows it.',
    ],
    example: {
      title: 'A leaked password that stops at the code',
      body: 'An attacker buys your password from a leak and tries your email. The site asks for a code from your authenticator app. The attacker does not have your phone, so the login stops. The leaked password was still a problem to change. The second factor kept that leak from becoming a takeover.',
    },
    takeaway: 'Pair something you know with something you have. Prefer an app or a hardware key when you can.',
    questions: [
      {
        prompt: 'Two-factor authentication adds:',
        correctIndex: 2,
        choices: [
          'A second password that you email to yourself.',
          'A longer username.',
          'A second kind of proof, often a device or a one-time code.',
          'Encryption of your monitor only.',
        ],
        explain: 'It pairs knowledge, the password, with possession, the device or key. A longer username is still one factor.',
      },
      {
        prompt: 'Why is an authenticator app often preferred over text-message codes?',
        correctIndex: 1,
        choices: [
          'Text messages cannot be delayed or redirected.',
          'App codes are harder to steal through an attack on your phone number than SMS codes.',
          'SMS is always the stronger option.',
          'An authenticator app removes the need for any password on every site.',
        ],
        explain: 'SMS can be targeted by attacks that take over the phone number. An app code stays with the device. You still keep the password.',
      },
      {
        prompt: 'An attacker has your password and nothing else. Two-factor helps because:',
        correctIndex: 0,
        choices: [
          'The login still asks for a proof the attacker does not have.',
          'Passwords stop working once two-factor is on, so the attacker’s copy is blank.',
          'Two-factor publishes your password so you notice the leak.',
          'The attacker receives the code automatically along with the password.',
        ],
        explain: 'The second step blocks the login when the attacker has only the secret. It does not make the leaked password harmless forever. You should still change it.',
      },
    ],
  },
];
