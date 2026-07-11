class SpeechRecognitionService {
    private recognition: any = null;

    constructor() {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech Recognition is not supported.");
            return;
        }

        this.recognition = new SpeechRecognition();

        this.recognition.lang = "en-US";
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
    }

    startListening(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.recognition) {
                reject("Speech Recognition is not available.");
                return;
            }

            this.recognition.onresult = (event: any) => {
                resolve(event.results[0][0].transcript);
            };

            this.recognition.onerror = (event: any) => {
                reject(event.error);
            };

            this.recognition.start();
        });
    }

    stopListening() {
        this.recognition?.stop();
    }
}

export default new SpeechRecognitionService();