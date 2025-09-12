// === Event Bus ===
type EventListener = (data: any) => void;

class EventBus {
    private listeners: { [eventName: string]: EventListener[] } = {};

    // Subscribe to an event
    on(eventName: string, listener: EventListener): void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
        console.log(`[EventBus] Listener subscribed to event: ${eventName}`);
    }

    // Emit an event
    emit(eventName: string, data: any): void {
        const listeners = this.listeners[eventName];
        if (listeners) {
            console.log(`[EventBus] Event emitted: ${eventName}, Data: ${JSON.stringify(data)}`);
            listeners.forEach(listener => listener(data));
        } else {
            console.log(`[EventBus] No listeners for event: ${eventName}`);
        }
    }
}

// === UserService (Event Producer) ===
class UserService {
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    // Create a new user and emit an event
    createUser(name: string): void {
        const user = { id: Math.floor(Math.random() * 1000), name };
        console.log(`[UserService] User created: ${JSON.stringify(user)}`);
        this.eventBus.emit("user-created", user);
    }

    // Update a user and emit an event
    updateUser(id: number, newName: string): void {
        const updatedUser = { id, name: newName };
        console.log(`[UserService] User updated: ${JSON.stringify(updatedUser)}`);
        this.eventBus.emit("user-updated", updatedUser);
    }
}

// === NotificationService (Event Consumer) ===
class NotificationService {
    constructor(eventBus: EventBus) {
        // Subscribe to "user-created" event
        eventBus.on("user-created", (user: { id: number; name: string }) => {
            console.log(`[NotificationService] Sending welcome email to user: ${user.name}`);
        });

        // Subscribe to "user-updated" event
        eventBus.on("user-updated", (user: { id: number; name: string }) => {
            console.log(`[NotificationService] Sending update notification to user: ${user.name}`);
        });
    }
}

// === Main Application ===
// Initialize the event bus
const eventBus = new EventBus();

// Initialize services
const userService = new UserService(eventBus);
const notificationService = new NotificationService(eventBus);

console.log("\n--- Creating Users ---");
userService.createUser("Alice"); // Create user Alice

console.log("\n--- Updating Users ---");
userService.updateUser(123, "Bob"); // Update user with ID 123