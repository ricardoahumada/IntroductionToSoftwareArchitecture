// === UserService ===
class UserService {
    private users: { id: number; name: string }[] = [];

    // Add a new user
    addUser(name: string): { id: number; name: string } {
        const newUser = { id: this.users.length + 1, name };
        this.users.push(newUser);
        console.log(`[UserService] User added: ${JSON.stringify(newUser)}`);
        return newUser;
    }

    // Get user by ID
    getUserById(id: number): { id: number; name: string } | undefined {
        const user = this.users.find(u => u.id === id);
        console.log(`[UserService] Retrieved user: ${JSON.stringify(user)}`);
        return user;
    }
}

// === PaymentService ===
class PaymentService {
    private payments: { userId: number; amount: number }[] = [];

    // Process payment for a user
    processPayment(userId: number, amount: number): void {
        const payment = { userId, amount };
        this.payments.push(payment);
        console.log(`[PaymentService] Payment processed: ${JSON.stringify(payment)}`);
    }

    // Get total payments for a user
    getTotalPayments(userId: number): number {
        const total = this.payments
            .filter(p => p.userId === userId)
            .reduce((sum, p) => sum + p.amount, 0);
        console.log(`[PaymentService] Total payments for user ${userId}: ${total}`);
        return total;
    }
}

// === API Gateway (Simulating Service Communication) ===
class ApiGateway {
    private userService: UserService;
    private paymentService: PaymentService;

    constructor(userService: UserService, paymentService: PaymentService) {
        this.userService = userService;
        this.paymentService = paymentService;
    }

    // Endpoint to add a user
    addUser(name: string): void {
        this.userService.addUser(name);
    }

    // Endpoint to process payment
    processPayment(userId: number, amount: number): void {
        const user = this.userService.getUserById(userId);
        if (!user) {
            console.error(`[ApiGateway] User with ID ${userId} not found.`);
            return;
        }

        console.log(`[ApiGateway] Processing payment for user: ${user.name}`);
        this.paymentService.processPayment(userId, amount);
    }

    // Endpoint to get total payments for a user
    getTotalPayments(userId: number): void {
        const user = this.userService.getUserById(userId);
        if (!user) {
            console.error(`[ApiGateway] User with ID ${userId} not found.`);
            return;
        }

        const total = this.paymentService.getTotalPayments(userId);
        console.log(`[ApiGateway] Total payments for user ${user.name}: $${total}`);
    }
}

// === Main Application ===
// Initialize services
const userService = new UserService();
const paymentService = new PaymentService();

// Initialize API Gateway
const apiGateway = new ApiGateway(userService, paymentService);

// Simulate user interaction
console.log("\n--- Adding Users ---");
apiGateway.addUser("Alice"); // Add user Alice
apiGateway.addUser("Bob");   // Add user Bob

console.log("\n--- Processing Payments ---");
apiGateway.processPayment(1, 100); // Process payment for Alice
apiGateway.processPayment(1, 50);  // Process another payment for Alice
apiGateway.processPayment(2, 200); // Process payment for Bob

console.log("\n--- Retrieving Total Payments ---");
apiGateway.getTotalPayments(1); // Get total payments for Alice
apiGateway.getTotalPayments(2); // Get total payments for Bob