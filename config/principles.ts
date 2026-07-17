export interface Principle {
  title: string;
  body: string;
  receipt: string;
  receiptHref: string;
}

/** Each principle links to the work that proves it — principles without receipts are posters. */
export const principles: Principle[] = [
  {
    title: "Correctness is a retention strategy.",
    body: "Users don't leave when a feature is missing; they leave when the numbers stop being trustworthy — FinBot's double-entry ledger exists so balances can't drift.",
    receipt: "FinBot",
    receiptHref: "/projects/finbot",
  },
  {
    title: "Instrument existing behavior instead of demanding new behavior.",
    body: "People already narrate their spending in chat, so the product became a chat instead of another app to open.",
    receipt: "FinBot",
    receiptHref: "/projects/finbot",
  },
  {
    title: "Never automate what you can't audit.",
    body: "Every FIFA Mania post passed a mandatory human gate, and Perfios HITL workflows keep humans on the decisions that carry risk.",
    receipt: "FIFA Mania · Perfios",
    receiptHref: "/projects/fifa-mania",
  },
  {
    title: "Constraints shape better products than budgets.",
    body: "16GB of memory and 100 API calls a day produced a cheaper, more reliable architecture than cloud spend would have.",
    receipt: "FIFA Mania",
    receiptHref: "/projects/fifa-mania",
  },
  {
    title: "Scope the truthful version.",
    body: "When live positional data was unaffordable, I shipped clearly-labelled stylized recreations instead of faking fidelity; when 6 agents wouldn't fit, I shipped the 4 that carried the wedge.",
    receipt: "FIFA Mania · Prep Copilot",
    receiptHref: "/projects/prep-copilot",
  },
];
