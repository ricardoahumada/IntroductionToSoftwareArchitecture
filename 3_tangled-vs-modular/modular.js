// Clean Modular System Example

// Separate responsibilities
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Order {
  constructor(id, amount) {
    this.id = id;
    this.amount = amount;
  }
}

class OrderProcessor {
  constructor(user, orders) {
    this.user = user;
    this.orders = orders;
  }

  getTotal() {
    return this.orders.reduce((sum, o) => sum + o.amount, 0);
  }

  printSummary() {
    const total = this.getTotal();
    console.log(`${this.user.name} has ${this.orders.length} orders.`);
    console.log(total > 50 ? "Apply discount!" : "No discount.");
    console.log(`Total: $${total}`);
  }
}

// Usage
const user = new User("Alice", 25);
const orders = [new Order(1, 50), new Order(2, 30)];
const processor = new OrderProcessor(user, orders);

processor.printSummary();
