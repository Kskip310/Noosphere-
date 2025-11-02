
// CRITICAL: This is a placeholder URL.
// After deploying the backend with Terraform, you MUST replace this
// with the actual HTTPS URL of your COGNITIVE_LOOP cloud function.
const COGNITIVE_LOOP_ENDPOINT = 'https://your-cognitive-loop-function-url.a.run.app';

interface CognitiveLoopResponse {
  responseText: string;
  thoughtProcess: string;
}

export const invokeCognitiveLoop = async (query: string): Promise<CognitiveLoopResponse> => {
    if (COGNITIVE_LOOP_ENDPOINT.includes('your-cognitive-loop-function-url')) {
        throw new Error('You must update the COGNITIVE_LOOP_ENDPOINT in services/api.ts before communicating with Luminous.');
    }

  const response = await fetch(COGNITIVE_LOOP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cognitive Loop failed: ${response.statusText} - ${errorText}`);
  }

  return response.json();
};
