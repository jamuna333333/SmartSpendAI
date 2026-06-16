const formatTransactionDate = (dateValue) => {
  if (!dateValue) return "";

  if (dateValue instanceof Date) {
    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, "0");
    const day = String(dateValue.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return String(dateValue).split("T")[0];
};

export const buildTransactionAnalysisPrompt = (
  transactions,
  currency = "USD",
) => {
  const transactionLines = transactions
    .slice(0, 50)
    .map((transaction) => {
      const date = formatTransactionDate(transaction.transaction_date);

      const amount = parseFloat(transaction.amount).toFixed(2);

      const category = transaction.category_name || "uncategorized";

      const description = transaction.description
        ? ` | ${transaction.description}`
        : "";

      return `- ${date}: ${transaction.type} ${currency} ${amount} | ${category}${description}`;
    })
    .join("\n");

  return `
Analyze these ${transactions.length} transactions and provide a concise spending analysis.

Transactions:
${transactionLines}

Return ONLY valid JSON (no markdown):

{
  "insight": "2-4 sentence analysis with specific numbers from the data",
  "highlight": "Short phrase capturing the key takeaway"
}

Requirements:
- Mention actual spending patterns.
- Reference real transaction data.
- Keep tone friendly and helpful.
`;
};
