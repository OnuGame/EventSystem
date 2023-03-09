import { BaseEvent, EventSystem } from "./src";
// test the eventsystem
EventSystem.debug = true;

class TestEvent extends BaseEvent {
    constructor() {
        super("TestEvent");
    }
}

class MapTestEvent extends BaseEvent {
    constructor(public data: Map<string, number>) {
        super("MapTestEvent");
    }
}

const eventSystem = new EventSystem();
eventSystem.registerEvent<TestEvent>("TestEvent", (event) => {
    console.log("TestEvent received");
    console.log(event);
});

eventSystem.registerEvent<MapTestEvent>("MapTestEvent", (event) => {
    console.log("MapTestEvent received");
    console.log(event);
});

eventSystem.emit(new TestEvent());

// Test strigified Maps

const testMap = new Map<string, number>();
testMap.set("abc", 123);
testMap.set("def", 456);

const strigifiedEvent = new MapTestEvent(testMap).stringify();

eventSystem.parse(strigifiedEvent);
