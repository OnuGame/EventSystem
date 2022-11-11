export abstract class BaseEvent {
    constructor(public name: string) {}

    stringify(): string {
        return JSON.stringify(this);
    }
}
