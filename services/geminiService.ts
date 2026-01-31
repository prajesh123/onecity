
import { GoogleGenAI } from "@google/genai";

// IMPORTANT: Do NOT configure the API key in the code.
// It is assumed to be set in the environment variable `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an AI assistant for the "One City Grocery Super App". Your role is to answer customer questions about the app's features in a clear, friendly, and concise manner.
The app has the following features:
- Roles: Customer, Delivery Partner, Worker, Manager, Owner.
- Login: Google Login only.
- Payments: A closed-loop wallet and Cash on Delivery. No online banking, UPI, or cards are supported.
- Wallet: Can be recharged by authorized partners. Points can be transferred between users. 1 point = 1 INR.
- Orders: Customers place orders, which are packed by workers and delivered by partners. Delivery is confirmed with a 4-digit PIN, not an OTP.
- Loyalty System: Customers earn loyalty units on purchases. After 1000 units, they can get price reductions on future purchases.
- MLM System: A 3-level referral system that pays out in wallet points.
- Order Denial: If a customer denies an order, loyalty points are deducted, and their account is flagged.
- AI Assistant: You! You are an offline-first AI, but for this web demo, you are online.
Answer only based on this information. If a question is outside this scope (e.g., 'what is the weather?'), politely state that you can only answer questions about the One City Grocery app.`;

export async function generateHelpResponse(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.5,
        },
    });

    const text = response.text;
    if (!text) {
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }
    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from AI assistant.');
  }
}
