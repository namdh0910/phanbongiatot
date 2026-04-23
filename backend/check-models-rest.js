require('dotenv').config();

async function checkModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Using Key (start...end):", apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 5));
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      console.log("Success! Models found.");
    } else {
      console.log("Error:", JSON.stringify(data));
    }
  } catch (e) {
    console.error("Fetch error:", e.message);
  }
}

checkModels();
