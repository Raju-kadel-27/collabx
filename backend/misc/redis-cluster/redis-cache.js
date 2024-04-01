const Redis = require("ioredis");

async function run() {
  const cluster = new Redis.Cluster([
    // {
    //   port: 7000,
    //   host: "localhost",
    // },
    {
      port: 7001,
      host: "localhost",
    },
    {
      port: 7002,
      host: "localhost",
    },
    {
      port: 7003,
      host: "localhost",
    },
    {
      port: 7004,
      host: "localhost",
    },
    {
      port: 7005,
      host: "localhost",
    },
  ]);

  cluster.on('connect', () => {
    console.log('Connected to Redis Cluster');
  });
  
  // Listen for the 'status' event to track changes in connection status
  cluster.on('status', (status) => {
    console.log(`Connection status: ${status}`);
  });
  
  // Listen for the 'close' event to detect when the connection is closed
  cluster.on('close', () => {
    console.log('Connection closed');
  });
  
  // Listen for the 'error' event to handle connection errors
  cluster.on('error', (err) => {
    console.error(`Redis Error: ${err}`);
  });

console.log('111')
  try {
    // Set values asynchronously
    await cluster.set("token", "e=aasxcndjvnkjdsnj4568e4dwdfndwsdwwq343");
console.log('222')

    await cluster.set("mindfresh", "password1234");

    // Get value asynchronously
    const tokenValue = await cluster.get("token");
    console.log("Token:", tokenValue);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the connection when done
    cluster.quit();
    console.log('closed')
  }
}

run();
