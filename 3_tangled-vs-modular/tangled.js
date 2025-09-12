// Tangled System Example
let user = { name: "Alice", age: 25 };
let orders = [{ id: 1, amount: 50 }, { id: 2, amount: 30 }];

// Everything is mixed together
function process() {
  let total = 0;
  for (let i = 0; i < orders.length; i++) {
    total += orders[i].amount;
  }
  console.log(user.name + " has " + orders.length + " orders.");
  if (total > 50) {
    console.log("Apply discount!");
  } else {
    console.log("No discount.");
  }
  console.log("Total: $" + total);
}

process();
