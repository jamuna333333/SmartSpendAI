export const buildSavingsTipsPrompt = ({
  topCategories,
  monthlyIncome,
  currency = "USD",
}) => {
  const categoryText =
    topCategories.length > 0
      ? topCategories
          .map(
            (category) =>
              `- ${category.category}: ${currency} ${category.amount.toFixed(
                2,
              )} across ${category.transactionCount} transactions`,
          )
          .join("\n")
      : "- No spending data available";

  return `
Generate personalized savings tips for a user.

Monthly Income (last 30 days): ${currency} ${monthlyIncome.toFixed(2)}

Top spending categories (last 30 days):
${categoryText}

Return ONLY valid JSON (no markdown):

{
  "overallTip": "Top-level 1-sentence advice",
  "tips": [
    {
      "category": "Category this targets",
      "title": "Short tip title",
      "detail": "2-3 sentence actionable suggestion",
      "estimatedSavings": 0
    }
  ]
}

Requirements:
- Provide exactly 4 tips.
- Each tip must reference an actual category from the data.
- Include a realistic estimated monthly savings amount.
- Keep suggestions actionable and practical.
`;
};
