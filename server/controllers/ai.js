const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class AiController {
  static async geminiAi(req, res, next) {
    try {
      const prompt = "Give me tutorial how to play Valorant";

      if (!prompt) {
        return res.status(400).json({ error: "Prompt cannot be empty" });
      }
      const result = await model.generateContent(prompt);
      if (
        result &&
        result.response &&
        typeof result.response.text === "function"
      ) {
        res.send(await result.response.text());
      } else {
        res
          .status(500)
          .json({ error: "Unexpected response format from AI model" });
      }
    } catch (error) {
      console.error("Error in geminiAi controller:", error);

      next(error);
    }
  }
}

module.exports = AiController;
