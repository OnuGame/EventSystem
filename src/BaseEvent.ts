import { EventSystem } from "./EventSystem";

export class BaseEvent {
    constructor(public name: string) {}

    stringify(): string {
        if (EventSystem.debug) console.log("Serializing " + this.name);

        return JSON.stringify(this, (key, value) => {
            if (EventSystem.debug) console.log(key, value);

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
        if (EventSystem.debug) console.log("Deserializing " + this.name);

        const parsed = JSON.parse(eventString, (key, value) => {
            if (EventSystem.debug) console.log(key, value);
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
