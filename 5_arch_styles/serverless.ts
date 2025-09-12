// === Simulated Database Service ===
class DatabaseService {
    private items: { id: number; name: string }[] = [];

    // Add an item to the database
    addItem(name: string): { id: number; name: string } {
        const newItem = { id: this.items.length + 1, name };
        this.items.push(newItem);
        console.log(`[DatabaseService] Item added: ${JSON.stringify(newItem)}`);
        return newItem;
    }

    // Get all items from the database
    getItems(): { id: number; name: string }[] {
        console.log(`[DatabaseService] Retrieving items: ${JSON.stringify(this.items)}`);
        return this.items;
    }
}

// === Serverless Function ===
type HttpRequest = {
    method: "GET" | "POST";
    body?: { name: string };
};

type HttpResponse = {
    statusCode: number;
    body: any;
};

class ServerlessFunction {
    private databaseService: DatabaseService;

    constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    // Handle incoming HTTP requests
    handleRequest(request: HttpRequest): HttpResponse {
        if (request.method === "POST") {
            // Handle POST request to add an item
            if (!request.body || !request.body.name) {
                return { statusCode: 400, body: { error: "Name is required" } };
            }

            const newItem = this.databaseService.addItem(request.body.name);
            return { statusCode: 201, body: newItem };
        } else if (request.method === "GET") {
            // Handle GET request to retrieve all items
            const items = this.databaseService.getItems();
            return { statusCode: 200, body: items };
        } else {
            return { statusCode: 405, body: { error: "Method Not Allowed" } };
        }
    }
}

// === Main Application (Simulating Serverless Execution) ===
function simulateServerlessExecution() {
    // Initialize the database service
    const databaseService = new DatabaseService();

    // Initialize the serverless function
    const serverlessFunction = new ServerlessFunction(databaseService);

    console.log("\n--- Simulating POST Request ---");
    const postResponse = serverlessFunction.handleRequest({
        method: "POST",
        body: { name: "Laptop" },
    });
    console.log("[Serverless] POST Response:", postResponse);

    console.log("\n--- Simulating GET Request ---");
    const getResponse = serverlessFunction.handleRequest({
        method: "GET",
    });
    console.log("[Serverless] GET Response:", getResponse);
}

// Run the simulation
simulateServerlessExecution();