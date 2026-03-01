// =============================================
// Simple Test Runner (No dependencies needed!)
// This runs automatically in GitHub Actions
// =============================================

const {
  addClient,
  findClient,
  deactivateClient,
  getActiveClients,
  getClientStats,
} = require("../src/index");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.log(`  ❌ FAIL: ${name}`);
    console.log(`          ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || "Assertion failed");
}

// ---- TESTS START HERE ----

console.log("\n🧪 Running CRM Tests...\n");

console.log("📦 addClient()");
test("should add a client with name and email", () => {
  const clients = [];
  const result = addClient(clients, { name: "John", email: "john@test.com" });
  assert(result.id === 1, "ID should be 1");
  assert(result.name === "John", "Name should be John");
  assert(result.status === "active", "Default status should be active");
  assert(clients.length === 1, "Clients array should have 1 item");
});

test("should throw error if name is missing", () => {
  let threw = false;
  try {
    addClient([], { email: "no-name@test.com" });
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error");
});

test("should throw error if email is missing", () => {
  let threw = false;
  try {
    addClient([], { name: "No Email" });
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error");
});

console.log("\n🔍 findClient()");
test("should find client by name", () => {
  const clients = [];
  addClient(clients, { name: "Alice Smith", email: "alice@test.com" });
  addClient(clients, { name: "Bob Jones", email: "bob@test.com" });
  const results = findClient(clients, "alice");
  assert(results.length === 1, "Should find 1 client");
  assert(results[0].name === "Alice Smith", "Should find Alice");
});

test("should find client by email", () => {
  const clients = [];
  addClient(clients, { name: "Alice", email: "alice@company.com" });
  const results = findClient(clients, "company.com");
  assert(results.length === 1, "Should find 1 client");
});

test("should return empty array for no match", () => {
  const clients = [];
  addClient(clients, { name: "Alice", email: "alice@test.com" });
  const results = findClient(clients, "xyz");
  assert(results.length === 0, "Should find 0 clients");
});

console.log("\n🚫 deactivateClient()");
test("should deactivate a client", () => {
  const clients = [];
  addClient(clients, { name: "Alice", email: "alice@test.com" });
  const result = deactivateClient(clients, 1);
  assert(result.status === "inactive", "Status should be inactive");
});

test("should throw error for non-existent client", () => {
  let threw = false;
  try {
    deactivateClient([], 999);
  } catch (e) {
    threw = true;
  }
  assert(threw, "Should have thrown an error");
});

console.log("\n📊 getClientStats()");
test("should return correct stats", () => {
  const clients = [];
  addClient(clients, { name: "A", email: "a@test.com" });
  addClient(clients, { name: "B", email: "b@test.com" });
  addClient(clients, { name: "C", email: "c@test.com" });
  deactivateClient(clients, 2);

  const stats = getClientStats(clients);
  assert(stats.total === 3, "Total should be 3");
  assert(stats.active === 2, "Active should be 2");
  assert(stats.inactive === 1, "Inactive should be 1");
});

console.log("\n✅ getActiveClients()");
test("should return only active clients", () => {
  const clients = [];
  addClient(clients, { name: "A", email: "a@test.com" });
  addClient(clients, { name: "B", email: "b@test.com" });
  deactivateClient(clients, 1);

  const active = getActiveClients(clients);
  assert(active.length === 1, "Should have 1 active client");
  assert(active[0].name === "B", "Active client should be B");
});

// ---- RESULTS ----

console.log("\n" + "=".repeat(40));
console.log(`📋 Results: ${passed} passed, ${failed} failed`);
console.log("=".repeat(40) + "\n");

if (failed > 0) {
  process.exit(1); // ⬅️ This makes GitHub Actions mark the job as FAILED
}
