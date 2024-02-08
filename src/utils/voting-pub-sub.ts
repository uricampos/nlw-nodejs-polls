type Message = { pollOptionId: string, votes: number };
type Subscriber = (message: Message) => void;

class VotingPubSub {
    private channels: Record<string, Subscriber[]> = {}

    subscribe(pollId: string, subscriber: Subscriber) {
        if (!this.channels[pollId]) {
            this.channels[pollId] = []
        }

        this.channels[pollId].push(subscriber)
    }

    publish(pollId: string, message: Message) {
        if (!this.channels[pollId]) {
            return;
        }

        for (const subiscriber of this.channels[pollId]) {
            subiscriber(message)
        }
    }
}

export const voting = new VotingPubSub();
