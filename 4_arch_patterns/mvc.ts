// === Model ===
class UserModel {
    private users: { id: number; name: string }[] = [];

    // Add a new user to the model
    addUser(name: string): void {
        const newUser = { id: this.users.length + 1, name };
        this.users.push(newUser);
        console.log(`[Model] User added: ${JSON.stringify(newUser)}`);
    }

    // Retrieve all users from the model
    getUsers(): { id: number; name: string }[] {
        console.log(`[Model] Retrieving users: ${JSON.stringify(this.users)}`);
        return this.users;
    }
}

// === View ===
class UserView {
    // Display users in the UI
    displayUsers(users: { id: number; name: string }[]): void {
        console.log("[View] Displaying users:");
        users.forEach(user => {
            console.log(`- ID: ${user.id}, Name: ${user.name}`);
        });
    }

    // Prompt the user for input
    getUserInput(): string {
        const name = prompt("Enter a new user's name:") || "";
        console.log(`[View] User input received: ${name}`);
        return name;
    }
}

// === Controller ===
class UserController {
    private model: UserModel;
    private view: UserView;

    constructor(model: UserModel, view: UserView) {
        this.model = model;
        this.view = view;
    }

    // Handle adding a new user
    addUser(): void {
        const name = this.view.getUserInput();
        if (name.trim()) {
            this.model.addUser(name);
        } else {
            console.error("[Controller] Invalid input: Name cannot be empty.");
        }
    }

    // Handle displaying users
    showUsers(): void {
        const users = this.model.getUsers();
        this.view.displayUsers(users);
    }
}

// === Main Application ===
// Initialize the MVC components
const model = new UserModel();
const view = new UserView();
const controller = new UserController(model, view);

// Simulate user interaction
console.log("\n--- Adding Users ---");
controller.addUser(); // Add a new user
controller.addUser(); // Add another user

console.log("\n--- Displaying Users ---");
controller.showUsers(); // Display all users