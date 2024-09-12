const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class AiController {
  static async geminiAi(req, res, next) {
    try {
      const { messages } = req.body;
      console.log(messages, "?????");
      const prompt = messages;
      console.log(prompt, "<<<<<<");

      const result = await model.generateContent(prompt);
      res.send(result.response.text());
    } catch (error) {
      next();
    }
  }
}

module.exports = AiController;
