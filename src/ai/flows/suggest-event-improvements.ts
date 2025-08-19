'use server';

/**
 * @fileOverview AI-powered event enhancement tool that analyzes user feedback and event details to suggest improvements to the event schedule or FAQ.
 *
 * - suggestEventImprovements - A function that handles the event improvement suggestion process.
 * - SuggestEventImprovementsInput - The input type for the suggestEventImprovements function.
 * - SuggestEventImprovementsOutput - The return type for the suggestEventImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEventImprovementsInputSchema = z.object({
  eventDetails: z
    .string()
    .describe('Detailed information about the event, including schedule, tracks, and any special activities.'),
  userFeedback: z
    .string()
    .describe('User feedback collected from surveys, comments, or other sources.'),
  faq: z.string().describe('The current FAQ for the event.'),
});
export type SuggestEventImprovementsInput = z.infer<typeof SuggestEventImprovementsInputSchema>;

const SuggestEventImprovementsOutputSchema = z.object({
  scheduleSuggestions: z
    .string()
    .describe('AI-generated suggestions for improving the event schedule.'),
  faqSuggestions: z
    .string()
    .describe('AI-generated suggestions for improving the event FAQ.'),
});
export type SuggestEventImprovementsOutput = z.infer<typeof SuggestEventImprovementsOutputSchema>;

export async function suggestEventImprovements(
  input: SuggestEventImprovementsInput
): Promise<SuggestEventImprovementsOutput> {
  return suggestEventImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEventImprovementsPrompt',
  input: {schema: SuggestEventImprovementsInputSchema},
  output: {schema: SuggestEventImprovementsOutputSchema},
  prompt: `You are an AI assistant designed to analyze event details, user feedback, and the existing FAQ to suggest improvements for an event.

Analyze the following event details:

Event Details: {{{eventDetails}}}

User Feedback: {{{userFeedback}}}

Existing FAQ: {{{faq}}}

Based on the event details, user feedback, and existing FAQ, provide suggestions for improving the event schedule and FAQ. Focus on addressing user concerns and enhancing the overall participant experience.

Schedule Suggestions:

FAQ Suggestions:`, 
});

const suggestEventImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestEventImprovementsFlow',
    inputSchema: SuggestEventImprovementsInputSchema,
    outputSchema: SuggestEventImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
