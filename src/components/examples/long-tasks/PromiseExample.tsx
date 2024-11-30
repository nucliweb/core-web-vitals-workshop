import { useState } from 'react';
import { heavyTask } from './utils/heavyTask';

export function PromiseExample() {
  const [status, setStatus] = useState<string>('');

  // Bad example - Blocking promise
  const handleBadPromise = () => {
    console.log(`Bad Promise clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Starting...');
    
    new Promise<void>((resolve) => {
      console.log(`Bad Promise executor running at: ${performance.now().toFixed(2)}ms`);
      heavyTask();
      resolve();
    }).then(() => {
      console.log(`Bad Promise .then running at: ${performance.now().toFixed(2)}ms`);
      setStatus('Completed (blocking)');
    });
  };

  // Better example - Promise con setTimeout
  const handleBetterPromise = () => {
    console.log(`Better Promise clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Processing...');

    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Better Promise setTimeout at: ${performance.now().toFixed(2)}ms`);
        heavyTask();
        resolve();
      }, 0);
    }).then(() => {
      console.log(`Better Promise .then at: ${performance.now().toFixed(2)}ms`);
      setStatus('Completed (better INP)');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={handleBadPromise}
          className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
        >
          Test Blocking Promise
        </button>
        <button
          onClick={handleBetterPromise}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Test Better Promise
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
