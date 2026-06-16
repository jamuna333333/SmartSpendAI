export const buildBudgetAlertPrompt = ({
  categoryName,
  budgetAmount,
  spentAmount,
  daysIntoPeriod,
  totalPeriodDays,
  currency = "USD",
}) => {
  const percentUsed = ((spentAmount / budgetAmount) * 100).toFixed(1);

  const daysLeft = totalPeriodDays - daysIntoPeriod;

  return `
A user is tracking a budget. Generate a helpful alert.

Category: ${categoryName}
Budget: ${currency} ${budgetAmount.toFixed(2)}
Spent so far: ${currency} ${spentAmount.toFixed(2)} (${percentUsed}% used)
Days into period: ${daysIntoPeriod} of ${totalPeriodDays}
Days remaining: ${daysLeft}

Return ONLY valid JSON (no markdown):

{
  "severity": "info|warning|critical",
  "title": "Short alert title",
  "message": "1-2 sentence empathetic message referencing actual numbers",
  "suggestions": [
    "Specific action 1",
    "Specific action 2",
    "Specific action 3"
  ]
}

Severity guide:
- info: under 70% spent
- warning: 70-100% spent
- critical: over 100% spent
`;
};
