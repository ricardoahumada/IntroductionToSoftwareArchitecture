// Interface defining the abstraction for a Logger
interface Logger {
    log(message: string): void;
}

// Concrete implementation of a FileLogger
class FileLogger implements Logger {
    log(message: string): void {
        console.log(`Logging to file: ${message}`);
    }
}

// Concrete implementation of a ConsoleLogger
class ConsoleLogger implements Logger {
    log(message: string): void {
        console.log(`Logging to console: ${message}`);
    }
}

// Abstract class for a Service that uses a Logger
abstract class BaseService {
    protected logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    abstract performAction(): void; // Abstract method to be implemented by subclasses
}

// Concrete service using the Logger abstraction
class DataService extends BaseService {
    performAction(): void {
        this.logger.log("Performing data operation...");
    }
}

// Usage
const fileLogger = new FileLogger();
const consoleLogger = new ConsoleLogger();

const dataService1 = new DataService(fileLogger);
dataService1.performAction(); // Logs to file

const dataService2 = new DataService(consoleLogger);
dataService2.performAction(); // Logs to console