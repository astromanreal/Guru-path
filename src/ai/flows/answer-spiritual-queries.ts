// src/ai/flows/answer-spiritual-queries.ts
'use server';

/**
 * @fileOverview Provides a Genkit flow for answering spiritual queries based on indexed teachings.
 *
 * - answerSpiritualQuery - A function that accepts a spiritual query and returns an answer.
 * - AnswerSpiritualQueryInput - The input type for the answerSpiritualQuery function.
 * - AnswerSpiritualQueryOutput - The return type for the answerSpiritualQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerSpiritualQueryInputSchema = z.object({
  query: z.string().describe('The spiritual query to be answered.'),
});

export type AnswerSpiritualQueryInput = z.infer<typeof AnswerSpiritualQueryInputSchema>;

const AnswerSpiritualQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the spiritual query.'),
});

export type AnswerSpiritualQueryOutput = z.infer<typeof AnswerSpiritualQueryOutputSchema>;

export async function answerSpiritualQuery(input: AnswerSpiritualQueryInput): Promise<AnswerSpiritualQueryOutput> {
  return answerSpiritualQueryFlow(input);
}

const answerSpiritualQueryPrompt = ai.definePrompt({
  name: 'answerSpiritualQueryPrompt',
  input: {schema: AnswerSpiritualQueryInputSchema},
  output: {schema: AnswerSpiritualQueryOutputSchema},
  prompt: `You are a spiritual AI assistant, trained to answer questions based on the teachings of various gurus and spiritual traditions.

  Please answer the following query using your knowledge of spiritual teachings:

  Query: {{{query}}}

  Answer: `,
});

const answerSpiritualQueryFlow = ai.defineFlow(
  {
    name: 'answerSpiritualQueryFlow',
    inputSchema: AnswerSpiritualQueryInputSchema,
    outputSchema: AnswerSpiritualQueryOutputSchema,
  },
  async input => {
    const {output} = await answerSpiritualQueryPrompt(input);
    return output!;
  }
);
