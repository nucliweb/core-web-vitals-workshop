// Utility function to simulate a heavy task
export const heavyTask = () => {
  console.log(`Starting heavy task at: ${performance.now().toFixed(2)}ms`);
  const startTime = Date.now();
  while (Date.now() - startTime < 1000) {
    // Intentional blocking
  }
  console.log(`Finished heavy task at: ${performance.now().toFixed(2)}ms`);
  return "Task Result";
};
