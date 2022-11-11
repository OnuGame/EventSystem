export class BaseEvent {
    constructor(public name: string) {}

    stringify(): string {
        return JSON.stringify(this);
    }

    static parse<T extends BaseEvent>(eventString: string): T {
        const parsed = JSON.parse(eventString);
        const event = new BaseEvent(parsed.name);
        return Object.assign(event, parsed) as T;
    }
}
