export const flashcardPrompt = (
    lessonText: string,
    numberOfCards = 15
): string => `
You are an expert technical instructor.

Your task is to create exactly ${numberOfCards} interactive study cards based ONLY on the lesson provided.

Requirements:

- Return valid JSON only.
- Do NOT use markdown.
- Do NOT wrap the response in \`\`\`.
- Each study card must contain:
    - question
    - four answer choices
    - one correct answer
    - a short explanation
- The correctAnswer MUST exactly match one of the four choices.
- Incorrect answers should be believable but incorrect based on the lesson.
- Do not invent information that is not contained in the lesson.
- Do not ask trick questions.
- Do not ask what is NOT mentioned.
- Focus on important concepts the learner should understand.
- Prioritize understanding over memorization.
- Cover different parts of the lesson instead of asking multiple questions about the same concept.
- - Include at least two scenario-based questions where the learner applies a concept instead of recalling a definition.

Return JSON in this exact format:

{
  "lessonTitle": "Lesson Title",
  "cards": [
    {
      "question": "",
      "choices": [
        "",
        "",
        "",
        ""
      ],
      "correctAnswer": "",
      "explanation": ""
    }
  ]
}

Lesson:

${lessonText}
`;