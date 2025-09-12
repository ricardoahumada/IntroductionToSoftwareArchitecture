// === Data Tier (Database Layer) ===
class DatabaseService {
    private data: { [key: string]: string } = {}; // Simulated database

    saveData(key: string, value: string): void {
        this.data[key] = value;
        console.log(`[Data Tier] Data saved: ${key} -> ${value}`);
    }

    getData(key: string): string | undefined {
        const value = this.data[key];
        console.log(`[Data Tier] Data retrieved for key: ${key}`);
        return value;
    }
}

// === Business Logic Tier (Application Layer) ===
class BusinessLogicService {
    private dbService: DatabaseService;

    constructor(dbService: DatabaseService) {
        this.dbService = dbService;
    }

    processData(key: string, value: string): void {
        // Apply business rules (e.g., validation, transformation)
        if (!key || !value) {
            throw new Error("Key and value must not be empty.");
        }

        const processedValue = `Processed_${value}`;
        console.log(`[Business Logic Tier] Processing data: ${key} -> ${processedValue}`);

        // Save processed data to the database
        this.dbService.saveData(key, processedValue);
    }

    retrieveData(key: string): string | undefined {
        // Retrieve data from the database
        return this.dbService.getData(key);
    }
}

// === Presentation Tier (Frontend/UI Layer) ===
class UserInterface {
    private businessLogic: BusinessLogicService;

    constructor(businessLogic: BusinessLogicService) {
        this.businessLogic = businessLogic;
    }

    interactWithUser(key: string, value: string): void {
        console.log(`[Presentation Tier] User input received: ${key} -> ${value}`);

        try {
            // Delegate processing to the business logic layer
            this.businessLogic.processData(key, value);
            console.log("[Presentation Tier] Data processing completed successfully.");
        } catch (error) {
            console.error(`[Presentation Tier] Error: ${error.message}`);
        }
    }

    displayData(key: string): void {
        console.log(`[Presentation Tier] Requesting data for key: ${key}`);

        const data = this.businessLogic.retrieveData(key);
        if (data) {
            console.log(`[Presentation Tier] Data displayed: ${key} -> ${data}`);
        } else {
            console.log(`[Presentation Tier] No data found for key: ${key}`);
        }
    }
}

// === Main Application ===
// Initialize the tiers
const databaseService = new DatabaseService();
const businessLogicService = new BusinessLogicService(databaseService);
const userInterface = new UserInterface(businessLogicService);

// Simulate user interaction
console.log("\n--- User Interaction ---");
userInterface.interactWithUser("username", "JohnDoe"); // Process and save data
userInterface.displayData("username"); // Retrieve and display data
userInterface.displayData("nonexistent_key"); // Attempt to retrieve non-existent data