import { BaseEvent, EventSystem } from "./src";
// test the eventsystem

class TestEvent extends BaseEvent {
    constructor() {
        super("TestEvent");
    }
}

const eventSystem = new EventSystem();
eventSystem.registerEvent("TestEvent", (event: TestEvent) => {
    console.log("TestEvent received");
    console.log(event);
});

eventSystem.emit({ name: "TestEvent" } as BaseEvent);
