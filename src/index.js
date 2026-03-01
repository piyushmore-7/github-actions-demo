// =============================================
// Simple CRM Utility Functions
// This simulates a small part of your CRM app
// =============================================

function addClient(clients, client) {
  if (!client.name || !client.email) {
    throw new Error("Client must have name and email");
  }
  const newClient = {
    id: clients.length + 1,
    name: client.name,
    email: client.email,
    status: client.status || "active",
    createdAt: new Date().toISOString(),
  };
  clients.push(newClient);
  return newClient;
}

function findClient(clients, query) {
  return clients.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );
}

function deactivateClient(clients, id) {
  const client = clients.find((c) => c.id === id);
  if (!client) throw new Error(`Client with id ${id} not found`);
  client.status = "inactive";
  return client;
}

function getActiveClients(clients) {
  return clients.filter((c) => c.status === "active");
}

function getClientStats(clients) {
  return {
    total: clients.length,
    active: clients.filter((c) => c.status === "active").length,
    inactive: clients.filter((c) => c.status === "inactive").length,
  };
}

module.exports = {
  addClient,
  findClient,
  deactivateClient,
  getActiveClients,
  getClientStats,
};
