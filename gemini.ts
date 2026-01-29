import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskLevel } from "../types";

/**
 * Analyzes content for potential social engineering threats using Gemini with Search grounding.
 */
export const analyzeContent = async (type: 'url' | 'email' | 'message', content: string): Promise<AnalysisResult> => {
  // Always use process.env.API_KEY directly and create a new instance before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemPrompt = `You are an elite Cybersecurity Analyst specializing in Social Engineering and Phishing detection. 
  Your task is to analyze the provided ${type} and determine if it's a social engineering threat.
  
  CRITICAL INSTRUCTIONS FOR URL ANALYSIS:
  1. Use Google Search to check the domain's reputation, age, and if it appears on any known phishing blacklists (e.g., PhishTank, Google Safe Browsing, etc.).
  2. Analyze technical aspects: domain spoofing (look-alike domains), use of free hosting, suspicious TLDs, and path structure.
  3. Look for psychological manipulation: urgency, fear, authority, or too-good-to-be-true offers.

  Format your response as a strict JSON object with:
  - isSafe: boolean
  - riskScore: number (0-100)
  - riskLevel: "Low" | "Medium" | "High" | "Critical"
  - attackType: string (e.g., "Phishing", "Business Email Compromise", "Smishing", "None")
  - reasoning: string[] (Detailed explanation of why it is unsafe, citing search findings if applicable)
  - suspiciousPatterns: string[] (Technical findings like "Registered 2 days ago", "Mismatched SSL", "URL Shortener")
  - recommendations: string[] (Actionable steps for the user)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this ${type} for security threats: "${content}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        // Use Google Search tool to gather real-time reputation data
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            riskScore: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            attackType: { type: Type.STRING },
            reasoning: { type: Type.ARRAY, items: { type: Type.STRING } },
            suspiciousPatterns: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["isSafe", "riskScore", "riskLevel", "attackType", "reasoning", "suspiciousPatterns", "recommendations"]
        }
      }
    });

    // Directly access .text property from GenerateContentResponse
    const text = response.text || "{}";
    const result = JSON.parse(text);
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return {
      isSafe: true,
      riskScore: 0,
      riskLevel: RiskLevel.LOW,
      attackType: "Unknown",
      reasoning: ["Analysis failed due to a technical error. Treat with caution."],
      suspiciousPatterns: ["Scan timed out or encountered an API error"],
      recommendations: ["Manually verify the sender.", "Do not click links if unsure."]
    };
  }
};

/**
 * Handles chat interactions with the SAFECLICK Assistant, utilizing Search grounding for up-to-date data.
 */
export const chatWithAssistant = async (message: string, history: any[]) => {
  // Always use process.env.API_KEY directly and create a new instance before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // For chat interaction, using ai.chats.create is the correct method for maintaining history.
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the SAFECLICK Cybersecurity Assistant. 
        Your goal is to provide accurate, up-to-date information on social engineering, cyber laws, digital safety, and reporting procedures.
        Always use Google Search to verify recent trends, news, and official legal portals.
        Be professional, reassuring, and technical where necessary.
        If a user mentions a crime, always advise them to report to official authorities and provide the relevant portal links.`,
        tools: [{ googleSearch: {} }],
      },
      // Correct transformation of history to Gemini's required format.
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    });

    const response = await chat.sendMessage({ message });

    // Directly access .text property from GenerateContentResponse.
    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Extract website URLs from grounding chunks as mandated when using Google Search.
    const links = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Source',
        uri: chunk.web.uri
      }));

    return { text, links };
  } catch (error) {
    console.error("Chat error:", error);
    return { 
      text: "I'm having trouble connecting to my knowledge base right now. Please try again or refer to our Knowledge Hub.", 
      links: [] 
    };
  }
};