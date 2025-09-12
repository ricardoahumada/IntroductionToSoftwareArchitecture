// === Monolithic Application ===
class MonolithicApp {
    private users: { id: number; name: string }[] = []; // Simulated database

    // Add a new user (Business Logic + Data Access)
    addUser(name: string): void {
        if (!name.trim()) {
            console.error("[Monolith] Invalid input: Name cannot be empty.");
            return;
        }

        const newUser = { id: this.users.length + 1, name };
        this.users.push(newUser);
        console.log(`[Monolith] User added: ${JSON.stringify(newUser)}`);
    }

    // Retrieve all users (Business Logic + Data Access)
    getUsers(): { id: number; name: string }[] {
        console.log(`[Monolith] Retrieving users: ${JSON.stringify(this.users)}`);
        return this.users;
    }

    // Display users in the UI (Presentation Layer)
    displayUsers(): void {
        console.log("[Monolith] Displaying users:");
        this.users.forEach(user => {
            console.log(`- ID: ${user.id}, Name: ${user.name}`);
        });
    }

    // Simulate user interaction (Presentation Layer)
    interactWithUser(): void {
        const name = prompt("Enter a new user's name:") || "";
        console.log(`[Monolith] User input received: ${name}`);

        // Add the user and display the updated list
        this.addUser(name);
        this.displayUsers();
    }
}

// === Main Application ===
// Initialize and run the monolithic application
const app = new MonolithicApp();

console.log("\n--- Monolithic Application ---");
app.interactWithUser(); // Simulate user interaction