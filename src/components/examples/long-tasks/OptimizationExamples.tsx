import { useState } from 'react';

// Timeout Example
export function TimeoutExample() {
  const [result, setResult] = useState<string>('');

  // Simulación de una tarea pesada con logging
  const heavyTask = () => {
    console.log(`Starting heavy task at: ${performance.now().toFixed(2)}ms`);
    const startTime = Date.now();
    while (Date.now() - startTime < 1000) {
      // Intentional blocking
    }
    console.log(`Finished heavy task at: ${performance.now().toFixed(2)}ms`);
  };

  const createTimeoutHandler = (delay: number) => () => {
    console.log(`Button clicked at: ${performance.now().toFixed(2)}ms`);
    setTimeout(() => {
      console.log(`Timeout callback starting at: ${performance.now().toFixed(2)}ms`);
      heavyTask();
      setResult(`Result after setTimeout ${delay}ms`);
    }, delay);
  };

  const handleRAFClick = () => {
    console.log(`RAF Button clicked at: ${performance.now().toFixed(2)}ms`);
    requestAnimationFrame(() => {
      console.log(`RAF callback starting at: ${performance.now().toFixed(2)}ms`);
      heavyTask();
      setResult('Result using rAF');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={createTimeoutHandler(0)}
          className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
        >
          Test setTimeout(0)
        </button>
        <button
          onClick={createTimeoutHandler(10)}
          className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          Test setTimeout(10)
        </button>
        <button
          onClick={createTimeoutHandler(100)}
          className="rounded-md bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
        >
          Test setTimeout(100)
        </button>
        <button
          onClick={handleRAFClick}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Test requestAnimationFrame
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-muted-foreground">{result}</p>
        <p className="text-sm text-muted-foreground">
          Check the console to see detailed timing information
        </p>
      </div>
    </div>
  );
}

// Promise Example
export function PromiseExample() {
  const [status, setStatus] = useState<string>('');

  // Simulación de tarea pesada con logging
  const heavyTask = () => {
    console.log(`Starting heavy task at: ${performance.now().toFixed(2)}ms`);
    const startTime = Date.now();
    while (Date.now() - startTime < 1000) {
      // Intentional blocking
    }
    console.log(`Finished heavy task at: ${performance.now().toFixed(2)}ms`);
  };

  // Bad example - Blocking promise
  const handleBadPromise = () => {
    console.log(`Bad Promise clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Starting...');
    
    new Promise<void>((resolve) => {
      console.log(`Bad Promise executor running at: ${performance.now().toFixed(2)}ms`);
      heavyTask(); // Bloquea el hilo principal inmediatamente
      resolve();
    }).then(() => {
      console.log(`Bad Promise .then running at: ${performance.now().toFixed(2)}ms`);
      setStatus('Completed (blocking)');
    });
  };

  // Better example - Promise con setTimeout
  const handleGoodPromise = () => {
    console.log(`Better Promise clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Processing...');

    // Combinamos setTimeout con Promise para mejorar el INP
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

  // Best example - Chunked Promise
  const handleBestPromise = () => {
    console.log(`Best Promise clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Processing chunks...');

    // Dividimos la tarea en chunks más pequeños
    let progress = 0;
    const totalWork = 1000;
    const chunkSize = 50;

    new Promise<void>((resolve) => {
      const processChunk = () => {
        const chunkStart = Date.now();
        console.log(`Processing chunk at: ${performance.now().toFixed(2)}ms`);
        
        while (Date.now() - chunkStart < chunkSize && progress < totalWork) {
          progress += 10;
        }

        if (progress < totalWork) {
          setTimeout(processChunk, 0);
        } else {
          resolve();
        }
      };

      setTimeout(processChunk, 0);
    }).then(() => {
      console.log(`Best Promise completed at: ${performance.now().toFixed(2)}ms`);
      setStatus('Completed (chunked)');
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
          onClick={handleGoodPromise}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Test Better Promise
        </button>
        <button
          onClick={handleBestPromise}
          className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          Test Chunked Promise
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

// Async/Await Example
export function AsyncAwaitExample() {
  const [data, setData] = useState<string>('');

  // Bad example - Blocking with async/await
  const handleBadAsync = async () => {
    setData('Loading...');
    await new Promise((resolve) => {
      const startTime = Date.now();
      while (Date.now() - startTime < 1000) {
        // Intentional blocking
      }
      resolve(true);
    });
    setData('Data loaded (blocking)');
  };

  // Good example - async/await with yield to event loop
  const handleGoodAsync = async () => {
    setData('Loading...');
    await new Promise((resolve) => setTimeout(resolve, 0));
    setData('Data loaded (non-blocking)');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={handleBadAsync}
          className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
        >
          Load (Blocking)
        </button>
        <button
          onClick={handleGoodAsync}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Load (Optimized)
        </button>
      </div>
      <p className="text-muted-foreground">{data}</p>
    </div>
  );
}

// Scheduler Example
declare global {
  interface Window {
    scheduler?: {
      postTask: (
        callback: () => void,
        options?: { priority?: 'background' | 'user-visible' | 'user-blocking' }
      ) => Promise<void>;
    };
  }
}

export function SchedulerExample() {
  const [output, setOutput] = useState<string>('');

  const handleTask = async () => {
    if (!window.scheduler) {
      setOutput('Scheduler API not available');
      return;
    }

    // High priority task
    await window.scheduler.postTask(
      () => {
        setOutput('Urgent task completed');
      },
      { priority: 'user-blocking' }
    );

    // Low priority task
    await window.scheduler.postTask(
      () => {
        setOutput('Background task completed');
      },
      { priority: 'background' }
    );
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleTask}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Run Tasks
      </button>
      <p className="text-muted-foreground">{output}</p>
    </div>
  );
}

// Third Party Example
export function ThirdPartyExample() {
  const [status, setStatus] = useState<string>('');

  // Simulación de una third-party que no podemos modificar
  const thirdPartyHeavyTask = () => {
    console.log(`Third Party Task starting at: ${performance.now().toFixed(2)}ms`);
    const startTime = Date.now();
    while (Date.now() - startTime < 1000) {
      // Código de third-party que no podemos modificar
    }
    console.log(`Third Party Task finished at: ${performance.now().toFixed(2)}ms`);
    return "Third Party Result";
  };

  // Bad: Cargar third-party directamente
  const handleBadThirdParty = () => {
    console.log(`Bad Third Party clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Loading third-party...');
    
    const result = thirdPartyHeavyTask(); // Bloquea el hilo principal
    setStatus(`Completed: ${result}`);
  };

  // Better: Cargar third-party después de la interacción crítica
  const handleBetterThirdParty = () => {
    console.log(`Better Third Party clicked at: ${performance.now().toFixed(2)}ms`);
    
    // Primero actualizamos la UI (interacción crítica)
    setStatus('Loading third-party...');
    
    // Luego programamos la tarea pesada
    setTimeout(() => {
      const result = thirdPartyHeavyTask();
      setStatus(`Completed: ${result}`);
    }, 0);
  };

  // Best: Cargar third-party en un Web Worker
  const handleBestThirdParty = () => {
    console.log(`Best Third Party clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Loading third-party in Worker...');

    // En un caso real, cargaríamos el script de la third-party en el Worker
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

// Idle Callback Example
export function IdleCallbackExample() {
  const [status, setStatus] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Simulación de tarea pesada con logging
  const heavyTask = () => {
    console.log(`Starting heavy task at: ${performance.now().toFixed(2)}ms`);
    const startTime = Date.now();
    while (Date.now() - startTime < 1000) {
      // Intentional blocking
    }
    console.log(`Finished heavy task at: ${performance.now().toFixed(2)}ms`);
  };

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

    // Opciones para asegurar que la tarea se ejecute eventualmente
    const options = {
      timeout: 2000 // Máximo tiempo de espera
    };

    requestIdleCallback((deadline) => {
      console.log(`Idle callback starting at: ${performance.now().toFixed(2)}ms`);
      console.log(`Time remaining: ${deadline.timeRemaining().toFixed(2)}ms`);
      setTimeRemaining(`Time remaining before task: ${deadline.timeRemaining().toFixed(2)}ms`);

      // Si tenemos suficiente tiempo, ejecutamos la tarea
      if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
        heavyTask();
        setStatus('Completed in idle time');
      } else {
        // Si no hay suficiente tiempo, reprogramamos
        console.log('Not enough time, rescheduling...');
        handleIdleClick();
      }
    }, options);
  };

  // Best with fallback: requestIdleCallback con timeout como fallback
  const handleSmartIdleClick = () => {
    console.log(`Smart Idle clicked at: ${performance.now().toFixed(2)}ms`);
    setStatus('Trying idle callback...');

    // Verificar si requestIdleCallback está disponible
    if ('requestIdleCallback' in window) {
      requestIdleCallback((deadline) => {
        console.log(`Smart Idle callback at: ${performance.now().toFixed(2)}ms`);
        console.log(`Time remaining: ${deadline.timeRemaining().toFixed(2)}ms`);
        setTimeRemaining(`Time remaining: ${deadline.timeRemaining().toFixed(2)}ms`);
        
        heavyTask();
        setStatus('Completed with requestIdleCallback');
      }, { timeout: 2000 });
    } else {
      // Fallback a setTimeout si requestIdleCallback no está disponible
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

export function OptimizationExamples() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-4">Timeout & RAF Example</h2>
        <TimeoutExample />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Promise Example</h2>
        <PromiseExample />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Idle Callback Example</h2>
        <IdleCallbackExample />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Third Party Example</h2>
        <ThirdPartyExample />
      </section>
    </div>
  );
}
