import { generateText } from 'ai';
 
const { text } = await generateText({
  model: 'anthropic/claude-opus-4.6',
  prompt: 'What is the capital of France?',
});
 
