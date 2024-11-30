import { useState } from 'react';
import { heavyTask } from './utils/heavyTask';

// Types for requestIdleCallback
interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

interface RequestIdleCallbackOptions {
  timeout?: number;
}

interface Window {
  requestIdleCallback: (
    callback: (deadline: IdleDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}

export function IdleCallbackExample() {
  const [status, setStatus] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Bad: Ejecutar inmediatamente
  const handleImmediateClick = () => {
    console.log(`Immediate clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Starting immediate...');
    heavyTask();
    setStatus('Completed immediate');
  };

  // Better: setTimeout
  const handleTimeoutClick = () => {
    console.log(`Timeout clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Starting timeout...');
    setTimeout(() => {
      heavyTask();
      setStatus('Completed timeout');
    }, 0);
  };

  // Best: requestIdleCallback
  const handleIdleClick = () => {
    console.log(`Idle clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Waiting for idle time...');

    requestIdleCallback((deadline) => {
      console.log(`Idle callback starting at: ${performance.now().toFixed(2)}ms`);
      console.log(`Time remaining: ${deadline.timeRemaining().toFixed(2)}ms`);
      setTimeRemaining(`Time remaining before task: ${deadline.timeRemaining().toFixed(2)}ms`);

      if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
        heavyTask();
        setStatus('Completed in idle time');
      } else {
        console.log('Not enough time, rescheduling...');
        handleIdleClick();
      }
    }, { timeout: 2000 });
  };

  // Best with fallback: requestIdleCallback con timeout como fallback
  const handleSmartIdleClick = () => {
    console.log(`Smart Idle clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Trying idle callback...');

    if ('requestIdleCallback' in window) {
      requestIdleCallback((deadline) => {
        console.log(`Smart Idle callback at: ${performance.now().toFixed(2)}ms`);
        console.log(`Time remaining: ${deadline.timeRemaining().toFixed(2)}ms`);
        setTimeRemaining(`Time remaining: ${deadline.timeRemaining().toFixed(2)}ms`);
        
        heavyTask();
        setStatus('Completed with requestIdleCallback');
      }, { timeout: 2000 });
    } else {
      console.log('requestIdleCallback not available, using setTimeout');
      setTimeout(() => {
        heavyTask();
        setStatus('Completed with setTimeout fallback');
      }, 0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={handleImmediateClick}
          className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
        >
          Run Immediate
        </button>
        <button
          onClick={handleTimeoutClick}
          className="rounded-md bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
        >
          Run with Timeout
        </button>
        <button
          onClick={handleIdleClick}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Run with Idle Callback
        </button>
        <button
          onClick={handleSmartIdleClick}
          className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          Run Smart Idle
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">{status}</p>
        <p className="text-sm text-muted-foreground">{timeRemaining}</p>
        <p className="text-sm text-muted-foreground">
          Check the console to see detailed timing information
        </p>
      </div>
    </div>
  );
}
