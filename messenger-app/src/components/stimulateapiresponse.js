// Function to simulate an API response with a trash message
const simulateApiResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is just trash. Why are you even reading this? 😜");
      }, 2000); // Simulates a delay for the API response
    });
  };
  