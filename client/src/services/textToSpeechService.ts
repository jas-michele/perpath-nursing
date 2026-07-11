class TextToSpeechService {
    speak(text: string) {
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);
    }

    stop() {
        speechSynthesis.cancel();
    }
}

export default new TextToSpeechService();