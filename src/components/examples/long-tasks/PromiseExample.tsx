import { useState } from 'react';
import { heavyTask } from './utils/heavyTask';

export function PromiseExample() {
  const [status, setStatus] = useState<string>('');
  const [timing, setTiming] = useState<string[]>([]);

  const logTiming = (message: string) => {
    const time = performance.now().toFixed(2);
    const logMessage = `${message} at ${time}ms`;
    console.log(logMessage);
    setTiming(prev => [...prev, logMessage]);
  };

  // Bad example - Blocking promise
  const handleBadPromise = () => {
    setTiming([]); // Reset timing logs
    logTiming('Bad Promise clicked');
    setStatus('Starting...');
    
    new Promise<void>((resolve) => {
      logTiming('Bad Promise executor running');
      heavyTask(); // Bloquea el hilo principal inmediatamente
      logTiming('Bad Promise task completed');
      resolve();
    }).then(() => {
      logTiming('Bad Promise .then running');
      setStatus('Completed (blocking)');
    });
  };

  // Better example - Promise con setTimeout
  const handleBetterPromise = () => {
    setTiming([]); // Reset timing logs
    logTiming('Better Promise clicked');
    setStatus('Processing...');

    new Promise<void>((resolve) => {
      logTiming('Better Promise executor start');
      setTimeout(() => {
        logTiming('Better Promise setTimeout callback');
        heavyTask();
        logTiming('Better Promise task completed');
        resolve();
      }, 0);
      logTiming('Better Promise setTimeout scheduled');
    }).then(() => {
      logTiming('Better Promise .then running');
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
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="font-semibold">Timing Log:</p>
          {timing.map((log, index) => (
            <p key={index} className="ml-4">{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
