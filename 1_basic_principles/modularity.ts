// Module 1: Authentication Module
export class AuthService {
    login(username: string, password: string): boolean {
        console.log(`Authenticating user: ${username}`);
        return username === "admin" && password === "password"; // Simplified logic
    }
}

// Module 2: Payment Module
export class PaymentService {
    processPayment(amount: number): void {
        console.log(`Processing payment of $${amount}`);
    }
}

// Module 3: Notification Module
export class NotificationService {
    sendNotification(message: string): void {
        console.log(`Sending notification: ${message}`);
    }
}

// Usage
import { AuthService } from "./authModule";
import { PaymentService } from "./paymentModule";
import { NotificationService } from "./notificationModule";

const authService = new AuthService();
const paymentService = new PaymentService();
const notificationService = new NotificationService();

if (authService.login("admin", "password")) {
    paymentService.processPayment(100);
    notificationService.sendNotification("Payment successful!");
}