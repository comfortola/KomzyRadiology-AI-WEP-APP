// services/ollamaService.ts
import { Mode } from '../types';

const MISTRAL_PROFESSIONAL_RESPONSE = `As a Mistral 7B model via Ollama, here's my take on your query.

**Disclaimer**: This is for informational purposes. Always consult with a qualified radiologist.

Based on the findings you described, the primary differential is typically [Most likely condition]. However, we must also consider:
- [Second condition], which often presents similarly but might show [differentiating feature].
- [Third, less common condition], especially if the patient has a history of [relevant history].

For a definitive diagnosis, a [recommended imaging modality or test] would be the next logical step.

This analysis is based on general patterns and does not constitute a specific medical opinion.`;

const MISTRAL_PATIENT_RESPONSE = `(Simulated response from Mistral 7B via Ollama)

**Important**: I am an AI assistant and this is not medical advice. Please talk to your doctor about any health questions you have.

Regarding your question, I can provide some general information. 

[A simplified, non-technical explanation related to the user's query about a procedure or concept would go here].

It's very important to follow the instructions given by your healthcare team, as they know your specific situation best.`;


/**
 * Simulates calling the Ollama API for a response from the Mistral model.
 * @param prompt The user's prompt.
 * @param mode The current mode ('patient' or 'professional').
 * @returns A promise that resolves to a simulated text response.
 */
export const sendMessageToMistral = (prompt: string, mode: Mode): Promise<string> => {
  console.log(`Simulating Ollama API call for prompt: "${prompt}" in ${mode} mode.`);
  return new Promise(resolve => {
    // Simulate network latency of 1.5 - 2.5 seconds
    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
      // In a real app, this would be a fetch call to the Ollama server.
      const response = mode === 'professional' ? MISTRAL_PROFESSIONAL_RESPONSE : MISTRAL_PATIENT_RESPONSE;
      resolve(response);
    }, delay);
  });
};
