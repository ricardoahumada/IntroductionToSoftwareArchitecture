// Concern 1: Data Access Layer (Handles database operations)
class DatabaseService {
    private data: string[] = [];

    saveData(item: string): void {
        this.data.push(item);
        console.log(`Data saved: ${item}`);
    }

    getData(): string[] {
        return this.data;
    }
}

// Concern 2: Business Logic Layer (Handles application logic)
class BusinessLogic {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    processData(input: string): void {
        const processed = `Processed_${input}`;
        console.log(`Processing data: ${processed}`);
        this.dbService.saveData(processed); // Delegates data storage to the database concern
    }
}

// Concern 3: Presentation Layer (Handles user interaction)
class UserInterface {
    private businessLogic: BusinessLogic;

    constructor(businessLogic: BusinessLogic) {
        this.businessLogic = businessLogic;
    }

    interactWithUser(input: string): void {
        console.log(`User input received: ${input}`);
        this.businessLogic.processData(input); // Delegates processing to the business logic concern
    }
}

// Usage
const dbService = new DatabaseService();
const businessLogic = new BusinessLogic(dbService);
const ui = new UserInterface(businessLogic);

ui.interactWithUser("Hello, World!"); // Simulates user interaction