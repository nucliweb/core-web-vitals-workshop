import { useState, useRef } from 'react';
import { heavyTask } from '../long-tasks/utils/heavyTask';

type TimingType = {
  message: string;
  time: number;
  type: 'start' | 'end';
};

export function YieldToMainExample() {
  const [status, setStatus] = useState<string>('');
  const [timing, setTiming] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const startTimeRef = useRef<number>(0);

  const logTiming = (message: string, type: 'start' | 'end' = 'start') => {
    const currentTime = performance.now();
    const timeFromStart = type === 'end' ? currentTime - startTimeRef.current : 0;
    const logMessage = `${message} at ${currentTime.toFixed(2)}ms${
      type === 'end' ? ` (took ${timeFromStart.toFixed(2)}ms)` : ''
    }`;

    // Console styling
    const styles = {
      start: 'color: #4CAF50; font-weight: bold;',
      end: 'color: #FF5722; font-weight: bold;',
      timing: 'color: #2196F3; font-style: italic;'
    };

    if (type === 'start') {
      startTimeRef.current = currentTime;
      console.log('%c→ ' + message, styles.start);
    } else {
      console.log(
        '%c← ' + message + '\n%c   Took: ' + timeFromStart.toFixed(2) + 'ms',
        styles.end,
        styles.timing
      );
    }

    setTiming(prev => [...prev, logMessage]);
  };

  // Bad: Blocking DOM update
  const handleBlockingUpdate = () => {
    setTiming([]); // Reset timing logs
    logTiming('Blocking update started');
    setStatus('Updating DOM...');

    // Simulate complex DOM updates
    heavyTask();
    setIsExpanded(!isExpanded);
    
    logTiming('Blocking update completed', 'end');
    setStatus('Update completed (blocked rendering)');
  };

  // Better: Using setTimeout
  const handleSetTimeoutUpdate = () => {
    setTiming([]); // Reset timing logs
    logTiming('setTimeout update started');
    setStatus('Scheduling update...');

    setTimeout(() => {
      logTiming('setTimeout callback executing');
      heavyTask();
      setIsExpanded(!isExpanded);
      logTiming('setTimeout update completed', 'end');
      setStatus('Update completed (setTimeout)');
    }, 0);
  };

  // Best: Using requestAnimationFrame
  const handleRAFUpdate = () => {
    setTiming([]); // Reset timing logs
    logTiming('RAF update started');
    setStatus('Scheduling update...');

    requestAnimationFrame(() => {
      logTiming('RAF callback executing');
      heavyTask();
      setIsExpanded(!isExpanded);
      logTiming('RAF update completed', 'end');
      setStatus('Update completed (RAF)');
    });
  };

  // Content to expand/collapse
  const content = (
    <div className={`mt-4 transition-all duration-300 ${isExpanded ? 'h-96' : 'h-0'} overflow-hidden`}>
      <div className="p-4 bg-muted rounded-md">
        <h3 className="text-lg font-semibold mb-2">Expanded Content</h3>
        <p>This is a large content section that requires complex DOM updates when expanding/collapsing.</p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="aspect-square bg-background rounded-md flex items-center justify-center">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Yield to Main Example</h2>
        <p>
          This example demonstrates different techniques for handling complex DOM updates
          and their impact on the browser's rendering cycle.
        </p>
        <ul>
          <li><strong>Blocking Update:</strong> Updates DOM immediately, blocking the rendering cycle</li>
          <li><strong>setTimeout:</strong> Defers update to next macro task, allowing some rendering</li>
          <li><strong>requestAnimationFrame:</strong> Aligns update with browser's rendering cycle</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={handleBlockingUpdate}
            className="rounded-md bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/90"
          >
            Toggle Blocking
          </button>
          <button
            onClick={handleSetTimeoutUpdate}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Toggle setTimeout
          </button>
          <button
            onClick={handleRAFUpdate}
            className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            Toggle RAF
          </button>
        </div>

        {content}

        <div className="space-y-2">
          <p className="text-muted-foreground">{status}</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-semibold">Timing Log:</p>
            {timing.map((log, index) => (
              <p key={index} className="ml-4 font-mono">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
