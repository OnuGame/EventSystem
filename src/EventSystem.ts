import { BaseEvent } from "./BaseEvent";

/**
 * A basic event system that supports type safe serialisation and deserialisation.
 */
export class EventSystem {
    static debug = false;

    events: Map<string, Function[]> = new Map();
    constructor() {}

    /**
     * Registers an event listener for a specific event
     * @param eventName The name of the event to register
     * @param listener The listener to register
     */
    registerEvent<T extends BaseEvent>(eventName: string, listener: (event: T) => void): void {
        let registered = this.events.get(eventName) || [];
        registered.push(listener);
        this.events.set(eventName, registered);
    }

    /**
     * Unregisters one or all listeners for a specific event
     * @param eventName The name of the event to unregister
     * @param listener The listener to unregister. If not provided, all listeners for the event will be unregistered
     */
    unregisterEvent(eventName: string, listener?: (event: BaseEvent) => void): void {
        let registered = this.events.get(eventName) || [];
        if (listener) {
            registered = registered.filter((l) => l !== listener);
            this.events.set(eventName, registered);
        } else {
            this.events.delete(eventName);
        }
    }

    /**
     * Emits an event to all listeners
     * @param event The event to emit
     */
    emit(event: BaseEvent): void {
        let eventListeners = this.events.get(event.name) || [];
        let broadcastListeners = this.events.get("*") || [];
        // check if event is a child of BaseEvent. if not create a new instance of BaseEvent and assign the properties
        if (!(event instanceof BaseEvent)) {
            const baseEvent = new BaseEvent("BaseEvent");
            Object.assign(baseEvent, event);
            event = baseEvent;
        }

        [...eventListeners, ...broadcastListeners].forEach((listener) => listener(event));
    }

    /**
     * Parses a stringified event and emits it to all listeners
     * @param eventString The stringified event
     */
    parse(eventString: string): void {
        const parsed = BaseEvent.parse(eventString);
        this.emit(parsed);
    }
}
