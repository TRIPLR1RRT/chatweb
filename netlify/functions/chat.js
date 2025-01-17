const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Use environment variables for security
  })
);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { message } = JSON.parse(event.body); // Extract user input from the request

    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Replace with "gpt-4" if preferred
      messages: [{ role: "user", content: message }],
    });

    const aiResponse = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ response: aiResponse }),
    };
  } catch (error) {
    console.error("Error with OpenAI API:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch AI response." }),
    };
  }
};
