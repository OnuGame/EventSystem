import { BaseEvent } from "./src/BaseEvent";
// test the eventsystem

class TestEvent extends BaseEvent {
    constructor() {
        super("TestEvent");
    }
}

const e1 = new TestEvent();
const e1sting = e1.stringify();

console.log(e1sting);

const e2 = BaseEvent.parse(e1sting);

console.log(e1, e2);

console.log(e2.stringify());
