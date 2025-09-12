// Module 1: Handles User Management
class UserManager {
    private users: string[] = [];

    addUser(username: string): void {
        this.users.push(username);
        console.log(`User added: ${username}`);
    }

    getUsers(): string[] {
        return this.users;
    }
}

// Module 2: Handles Reporting
class ReportGenerator {
    generateReport(data: string[]): void {
        console.log("Generating report...");
        data.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
}

// Usage
const userManager = new UserManager();
userManager.addUser("Alice");
userManager.addUser("Bob");

const reportGenerator = new ReportGenerator();
reportGenerator.generateReport(userManager.getUsers());