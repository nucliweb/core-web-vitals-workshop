import { useState } from 'react';
import { heavyTask } from './utils/heavyTask';

export function TimeoutExample() {
  const [result, setResult] = useState<string>('');

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
