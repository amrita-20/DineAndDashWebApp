import {
  SecretsManagerClient,
  GetSecretValueCommand
} from "@aws-sdk/client-secrets-manager";

const secretName = "abc/xyz"; // Replace with your secret name
const region = "ap-southeast-1"; // Replace with your AWS region

// Create the Secrets Manager client
const client = new SecretsManagerClient({ region });

// Function to load secrets
async function loadSecrets(): Promise<void> {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT", // Optional
      })
    );

    const secretString = response.SecretString;

    if (!secretString) {
      throw new Error("SecretString is undefined.");
    }

    // Parse if the secret is a JSON string
    let parsedSecret: Record<string, string> | string;
try {
    parsedSecret = JSON.parse(secretString);
  } catch {
    parsedSecret = secretString; // Plain string fallback
  }

  // Inject secrets into process.env
  if (typeof parsedSecret === "object") {
    for (const [key, value] of Object.entries(parsedSecret)) {
      process.env[key.toUpperCase()] = value;
    }
  } else {
    process.env.SECRET = parsedSecret;
  }

  console.log("Secrets loaded into process.env");
} catch (error) {
  console.error("Error retrieving secrets from AWS Secrets Manager:", error);
  throw error;
}
}

// Main function to start the application
(async (): Promise<void> => {
try {
  await loadSecrets(); // Load secrets before starting the app

  // Import and start the main app logic
  const app = await import("./index");
  if (typeof app.start === "function") {
    app.start(); // Or adjust based on your app's entry point
  } else {
    console.error("The 'start' function is not defined in './index'.");
  }
} catch (error) {
  console.error("Failed to start the application:", error);
}
})();