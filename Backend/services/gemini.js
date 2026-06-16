import { ai, GEMINI_MODEL } from "../utils/geminiClient.js";
import { parseGeminiResponse } from "../utils/parseJson.js";
import { buildBudgetAlertPrompt } from "../prompts/budgetAlert.prompt.js";
import { buildSavingsTipsPrompt } from "../prompts/savingsTips.prompt.js";
import { buildTransactionAnalysisPrompt } from "../prompts/transactionAnalysis.prompt.js";
import { buildBudgetAnalysisPrompt } from "../prompts/budgetAnalysis.prompt.js";

import { buildMonthlyInsightPrompt } from "../prompts/monthlyInsights.prompt.js";
// buildMonthlyInsightPrompt
const requestGemini = async (prompt) => {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  return parseGeminiResponse(response.text);
};

export const generateMonthlyInsight = async (payload) => {
  try {
    const prompt = buildMonthlyInsightPrompt(payload);

    return await requestGemini(prompt);
  } catch (error) {
    console.error("Gemini API error (monthly insight):", error);

    throw new Error("Failed to generate monthly insight. Please try again.");
  }
};

export const generateBudgetAlert = async (payload) => {
  try {
    const prompt = buildBudgetAlertPrompt(payload);

    return await requestGemini(prompt);
  } catch (error) {
    console.error("Gemini API error (budget alert):", error);

    throw new Error("Failed to generate budget alert.");
  }
};
export const generateSavingsTips = async (payload) => {
  try {
    const prompt = buildSavingsTipsPrompt(payload);

    return await requestGemini(prompt);
  } catch (error) {
    console.error("Gemini API error (savings tips):", error);

    throw new Error("Failed to generate savings tips.");
  }
};

export const analyzeTransactionList = async ({
  transactions,
  currency = "USD",
}) => {
  try {
    const prompt = buildTransactionAnalysisPrompt(transactions, currency);

    return await requestGemini(prompt);
  } catch (error) {
    console.error("Gemini API error (analyze transactions):", error);

    throw new Error("Failed to analyze transactions.");
  }
};

export const analyzeBudgetList = async ({ budgets, currency = "USD" }) => {
  try {
    if (!Array.isArray(budgets)) {
      throw new Error(
        `Expected budgets to be an array, got: ${JSON.stringify(budgets)}`,
      );
    }

    const prompt = buildBudgetAnalysisPrompt(budgets, currency);

    return await requestGemini(prompt);
  } catch (error) {
    console.error("Gemini API error (analyze budgets):", error);

    throw new Error("Failed to analyze budgets.");
  }
};

export default {
  generateMonthlyInsight,
  generateBudgetAlert,
  generateSavingsTips,
  analyzeTransactionList,
  analyzeBudgetList,
};
