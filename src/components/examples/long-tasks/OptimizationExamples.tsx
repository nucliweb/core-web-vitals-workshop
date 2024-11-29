import { useState } from 'react'

// Timeout Example
export function TimeoutExample() {
  const [result, setResult] = useState<string>('')

  const handleClick = () => {
    // Bad example - Blocks main thread
    setTimeout(() => {
      // Heavy operation that blocks
      const startTime = Date.now()
      while (Date.now() - startTime < 1000) {
        // Intentional blocking
      }
      setResult('Result after blocking')
    }, 100)

    // Good example - Uses requestAnimationFrame
    requestAnimationFrame(() => {
      setResult('Result using rAF')
    })
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleClick}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Test Timeout vs rAF
      </button>
      <p className="text-muted-foreground">{result}</p>
    </div>
  )
}

// Promise Example
export function PromiseExample() {
  const [status, setStatus] = useState<string>('')

  // Bad example - Blocking promise
  const handleBadPromise = () => {
    Promise.resolve().then(() => {
      const startTime = Date.now()
      while (Date.now() - startTime < 1000) {
        // Intentional blocking
      }
      setStatus('Completed (blocking)')
    })
  }

  // Good example - Promise with micro-tasks
  const handleGoodPromise = () => {
    queueMicrotask(() => {
      setStatus('Processing...')
      Promise.resolve().then(() => {
        setStatus('Completed (non-blocking)')
      })
    })
  }

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
          Test Optimized Promise
        </button>
      </div>
      <p className="text-muted-foreground">{status}</p>
    </div>
  )
}

// Async/Await Example
export function AsyncAwaitExample() {
  const [data, setData] = useState<string>('')

  // Bad example - Blocking with async/await
  const handleBadAsync = async () => {
    setData('Loading...')
    await new Promise(resolve => {
      const startTime = Date.now()
      while (Date.now() - startTime < 1000) {
        // Intentional blocking
      }
      resolve(true)
    })
    setData('Data loaded (blocking)')
  }

  // Good example - async/await with yield to event loop
  const handleGoodAsync = async () => {
    setData('Loading...')
    await new Promise(resolve => setTimeout(resolve, 0))
    setData('Data loaded (non-blocking)')
  }

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
  )
}

// Scheduler Example
declare global {
  interface Window {
    scheduler?: {
      postTask: (
        callback: () => void,
        options?: { priority?: 'background' | 'user-visible' | 'user-blocking' }
      ) => Promise<void>
    }
  }
}

export function SchedulerExample() {
  const [output, setOutput] = useState<string>('')

  const handleTask = async () => {
    if (!window.scheduler) {
      setOutput('Scheduler API not available')
      return
    }

    // High priority task
    await window.scheduler.postTask(
      () => {
        setOutput('Urgent task completed')
      },
      { priority: 'user-blocking' }
    )

    // Low priority task
    await window.scheduler.postTask(
      () => {
        setOutput('Background task completed')
      },
      { priority: 'background' }
    )
  }

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
  )
}
