export const buildBudgetAnalysisPrompt = (budgets, currency = "USD") => {
  const budgetSummary = budgets
    .map((budget) => {
      const spent = parseFloat(budget.spent);
      const limit = parseFloat(budget.amount);

      const usage = limit > 0 ? ((spent / limit) * 100).toFixed(1) : "0";

      return `Budget ID ${budget.id} | Category: ${
        budget.category_name
      } | Limit: ${currency} ${limit.toFixed(
        2,
      )} | Spending: ${currency} ${spent.toFixed(2)} | Usage: ${usage}%`;
    })
    .join("\n");

  return `
You're a personal finance assistant.

Analyze each budget below and provide a one-sentence evaluation.

Today: ${new Date().toISOString().split("T")[0]}

Budgets:
${budgetSummary}

For each budget return:

- status: "good" (well-paced)
- status: "caution" (above 70%)
- status: "concerning" (over budget)

- message: friendly actionable feedback

Return ONLY valid JSON:

{
  "analyses": [
    {
      "budgetId": 1,
      "status": "good",
      "message": "You're staying within budget."
    }
  ]
}
`;
};
