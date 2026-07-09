export const retrieveRelevantChunks = (
    profile: any,
    chunks: string[]
): string[] => {
    
    const keywords = [
        profile.careerGoal,
        profile.currentModule,
        ...(profile.technicalSkills || [])
    ]
        .filter(Boolean)
        .map((word: string) => word.toLowerCase());

    const scoredChunks = chunks.map((chunk) => {

        const lowerChunk = chunk.toLowerCase();

        let score = 0;

        for (const keyword of keywords) {
            if (lowerChunk.includes(keyword)) {
                score++;
            }
        }

        return {
            chunk,
            score
        };
    });
    
    return scoredChunks
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((item) => item.chunk);
}