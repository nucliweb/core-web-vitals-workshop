import { useState } from 'react';
import { heavyTask } from './utils/heavyTask';

export function ThirdPartyExample() {
  const [status, setStatus] = useState<string>('');

  // Bad: Cargar third-party directamente
  const handleBadThirdParty = () => {
    console.log(`Bad Third Party clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Loading third-party...');
    
    const result = heavyTask();
    setStatus(`Completed: ${result}`);
  };

  // Better: Cargar third-party después de la interacción crítica
  const handleBetterThirdParty = () => {
    console.log(`Better Third Party clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Loading third-party...');
    
    setTimeout(() => {
      const result = heavyTask();
      setStatus(`Completed: ${result}`);
    }, 0);
  };

  // Best: Cargar third-party en un Web Worker
  const handleBestThirdParty = () => {
    console.log(`Best Third Party clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Loading third-party in Worker...');

    const workerCode = `
      self.onmessage = function(e) {
        const startTime = Date.now();
        while (Date.now() - startTime < 1000) {
          // Simulación de third-party
        }
        self.postMessage("Third Party Result from Worker");
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (e) => {
      setStatus(`Completed: ${e.data}`);
      worker.terminate();
    };

    worker.postMessage('start');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={handleBadThirdParty}
          className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
        >
          Load Third Party (Blocking)
        </button>
        <button
          onClick={handleBetterThirdParty}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Load Third Party (Better)
        </button>
        <button
          onClick={handleBestThirdParty}
          className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          Load Third Party (Worker)
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">{status}</p>
        <p className="text-sm text-muted-foreground">
          Check the console to see detailed timing information
        </p>
      </div>
    </div>
  );
}
