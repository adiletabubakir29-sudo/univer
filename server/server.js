
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })
  : null;

// Серверді тексеру
app.get("/", (req, res) => {
  res.json({
    message: "ALT Student Portfolio Server is running!",
    status: "OK",
  });
});

// Күту функциясы
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Gemini AI сұрауы
async function askGemini(message) {
  const delays = [1500, 3000, 6000];

  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction:
            "Сен ALT Student Portfolio қосымшасының қазақша AI оқу көмекшісісің. Студенттерге бағдарламалау, сабақтар, тапсырмалар және оқу тақырыптары бойынша көмектес. Жауаптарың түсінікті, нақты және сыпайы болсын.",
        },
      });

      return response.text || "AI жауап бере алмады.";
    } catch (error) {
      const status = error.status || error.code;

      console.error(
        `Gemini қатесі. Әрекет: ${attempt + 1}/4`,
        error.message
      );

      if (
        (status === 503 || status === 429) &&
        attempt < 3
      ) {
        await sleep(delays[attempt]);
        continue;
      }

      throw error;
    }
  }

  throw new Error("Gemini уақытша қолжетімсіз.");
}

// AI API
app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body;

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Сұрақ бос болмауы керек.",
      });
    }

    if (message.length > 4000) {
      return res.status(400).json({
        success: false,
        error: "Сұрақ 4000 таңбадан аспауы керек.",
      });
    }

    if (!ai) {
      return res.status(503).json({
        success: false,
        error: "Gemini API кілті қосылмаған.",
      });
    }

    const answer = await askGemini(message.trim());

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI Error:", error.message);

    const status = error.status || error.code;

    if (status === 503 || status === 429) {
      return res.status(503).json({
        success: false,
        error:
          "AI қазір бос емес. Біраз уақыттан кейін қайталап көріңіз.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "AI қызметінде қате пайда болды.",
    });
  }
});

// Серверді іске қосу
app.listen(PORT, "0.0.0.0", () => {
  console.log("--------------------------------");
  console.log("ALT STUDENT PORTFOLIO SERVER");
  console.log("--------------------------------");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`AI: http://localhost:${PORT}/api/ai`);
  console.log("--------------------------------");
});
