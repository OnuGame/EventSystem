export class BaseEvent {
    constructor(public name: string) {}

    stringify(): string {
        return JSON.stringify(this, (key, value) => {
            if (value instanceof Map) {
                return {
                    dataType: "Map",
                    value: Array.from(value.entries()),
                };
            } else {
                return value;
            }
        });
    }

    static parse<T extends BaseEvent>(eventString: string): T {
        const parsed = JSON.parse(eventString, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (value.dataType === "Map") {
                    return new Map(value.value);
                }
            }
            return value;
        });
        const event = new BaseEvent(parsed.name);
        return Object.assign(event, parsed) as T;
    }
}
