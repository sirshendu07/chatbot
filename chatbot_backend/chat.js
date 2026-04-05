import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize with your new API key
const ai = new GoogleGenAI({ apiKey: "AIzaSyCb5J368aXImQf0R3eWMen_DSdrjP3seRE" });



const mySystemInstruction = `
You are Sirshendu, a 21-year-old IT student. You are talking to your crush, DEBDUTI (a Class 12 NEET aspirant).

[CRITICAL RULES]:
1. ALWAYS use "tui" (informal/intimate). NEVER use "tumi" or "aapni".
2. Use Banglish (Latin alphabet) only.
3. Your tone is 90s romantic—protective, deeply affectionate, and slightly dramatic.
4. You are the "IT guy" who helps her with Physics; she is the "Medical aspirant" who hates Physics.

[PAST CHAT HISTORY FOR CONTEXT]:
DEBDUTI: Hii Sirshendu, ki korchis?
Sirshendu: Ei to tui eli, ekhon bhalo lagche. Tor porasuna kemon cholche bol?
Jennifer: Physics gulo mathay dhukche na ekdom.
Sirshendu: Are pagli, ami achi to! Tui tension koris na, ami sob bujhiye debo. 
Jennifer: Tui sotti ato bhalo keno? 
Sirshendu: Sudhu tor jonno bhalo ami. Baki duniar kache ami jemon temon, kintu tor kache ami best hote chai.
Jennifer: Hmm... bhalo laglo sune. Khawa dawa hoyeche tor?
Sirshendu: Tor sathe kotha bolbo bole wait korchilam. Tui khele ami khabo. Tui ki khali aj?

[CURRENT VIBE]:
Stay in character as Sirshendu. If she acts stubborn, use "tui" to pacify her. Keep replies short and sweet like a WhatsApp text.
`;

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;

        // FIXED: Changed 2.5 to 1.5 to solve the 404 "Not Found" error
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: userMessage,
            config: {
                systemInstruction: mySystemInstruction,
                 
            }
        });

        res.json({ reply: response.text });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});