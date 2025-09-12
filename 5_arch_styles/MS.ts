// === Helper: Simulate HTTP Requests ===
class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Simulate GET request
    async get(endpoint: string): Promise<any> {
        console.log(`[HttpClient] GET ${this.baseUrl}${endpoint}`);
        return new Promise(resolve => setTimeout(() => resolve(this.mockResponse(endpoint)), 500));
    }

    // Simulate POST request
    async post(endpoint: string, data: any): Promise<any> {
        console.log(`[HttpClient] POST ${this.baseUrl}${endpoint} Data: ${JSON.stringify(data)}`);
        return new Promise(resolve => setTimeout(() => resolve(this.mockResponse(endpoint, data)), 500));
    }

    // Mock response for simplicity
    private mockResponse(endpoint: string, data?: any): any {
        if (endpoint.includes("users")) {
            return { id: Math.floor(Math.random() * 1000), name: data?.name || "Unknown" };
        }
        if (endpoint.includes("orders")) {
            return { orderId: Math.floor(Math.random() * 1000), userId: data?.userId, product: data?.product };
        }
        return {};
    }
}

// === UserService Microservice ===
class UserService {
    private httpClient: HttpClient;

    constructor(baseUrl: string) {
        this.httpClient = new HttpClient(baseUrl);
    }

    // Create a new user
    async createUser(name: string): Promise<any> {
        const user = await this.httpClient.post("/users", { name });
        console.log(`[UserService] User created: ${JSON.stringify(user)}`);
        return user;
    }

    // Get user by ID
    async getUserById(id: number): Promise<any> {
        const user = await this.httpClient.get(`/users/${id}`);
        console.log(`[UserService] Retrieved user: ${JSON.stringify(user)}`);
        return user;
    }
}

// === OrderService Microservice ===
class OrderService {
    private httpClient: HttpClient;

    constructor(baseUrl: string) {
        this.httpClient = new HttpClient(baseUrl);
    }

    // Create a new order
    async createOrder(userId: number, product: string): Promise<any> {
        const order = await this.httpClient.post("/orders", { userId, product });
        console.log(`[OrderService] Order created: ${JSON.stringify(order)}`);
        return order;
    }

    // Get orders by user ID
    async getOrdersByUserId(userId: number): Promise<any> {
        const orders = await this.httpClient.get(`/orders?userId=${userId}`);
        console.log(`[OrderService] Retrieved orders: ${JSON.stringify(orders)}`);
        return orders;
    }
}

// === Main Application (Client) ===
async function main() {
    // Initialize microservices
    const userService = new UserService("http://localhost:3000/api");
    const orderService = new OrderService("http://localhost:3001/api");

    console.log("\n--- Creating a User ---");
    const user = await userService.createUser("Alice"); // Create a new user

    console.log("\n--- Creating Orders for the User ---");
    await orderService.createOrder(user.id, "Laptop"); // Create an order for Alice
    await orderService.createOrder(user.id, "Smartphone"); // Create another order for Alice

    console.log("\n--- Retrieving Orders for the User ---");
    const orders = await orderService.getOrdersByUserId(user.id); // Retrieve orders for Alice
    console.log(`[Client] Orders for user ${user.name}:`, orders);
}

// Run the application
main();