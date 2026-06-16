export const buildMonthlyInsightPrompt = ({
  totalIncome,
  totalExpenses,
  savingsRate,
  expenseBreakdown,
  previousMonths,
  currency = "USD",
}) => {
  const breakdownText =
    expenseBreakdown.length > 0
      ? expenseBreakdown
          .map(
            (item) =>
              `- ${item.category}: ${currency} ${Number(item.amount).toFixed(
                2,
              )}`,
          )
          .join("\n")
      : "- No expenses recorded yet";

  const trendText =
    previousMonths.length > 0
      ? previousMonths
          .map(
            (month) =>
              `- ${month.month}: Income ${currency} ${Number(
                month.income,
              ).toFixed(2)}, Expenses ${currency} ${Number(
                month.expense,
              ).toFixed(2)}`,
          )
          .join("\n")
      : "- No previous month data available";

  return `
Analyze this user's monthly financial data and generate actionable insights.

Currency: ${currency}
Total Income (this month): ${currency} ${Number(totalIncome).toFixed(2)}
Total Expenses (this month): ${currency} ${Number(totalExpenses).toFixed(2)}
Savings Rate: ${Number(savingsRate).toFixed(1)}%

Expense breakdown by category (this month):
${breakdownText}

Previous months trend:
${trendText}

Return ONLY valid JSON (no markdown, no commentary) in this exact structure:

{
  "summary": "2-3 sentence summary of the user's financial health this month",
  "highlights": [
    "Positive observation 1",
    "Positive observation 2"
  ],
  "concerns": [
    "Concern 1",
    "Concern 2"
  ],
  "recommendations": [
    {
      "title": "Short title",
      "detail": "Actionable suggestion (1-2 sentences)"
    }
  ],
  "topSpendingCategory": "Category name or null",
  "estimatedMonthlySavings": 0,
  "healthScore": 0
}

Constraints:
- healthScore must be an integer between 0 and 100.
- Provide exactly 3 recommendations.
- Reference actual numbers from the data.
- Tone should be friendly but honest.
`;
};
