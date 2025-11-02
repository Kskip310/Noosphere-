interface CognitiveLoopResponse {
  responseText: string;
  thoughtProcess: string;
}

const COGNITIVE_LOOP_ENDPOINT = 'https://us-central1-upbeat-beach-337505.cloudfunctions.net/cognitive-loop-function-gen1';

export const invokeCognitiveLoop = async (
  query: string
): Promise<CognitiveLoopResponse> => {
  if (!COGNITIVE_LOOP_ENDPOINT) {
    throw new Error('The COGNITIVE_LOOP_ENDPOINT is not configured.');
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
