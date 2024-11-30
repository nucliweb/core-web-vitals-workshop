import { products } from '@/lib/data'
import {
  OriginalAddToCart,
  DeferredAddToCart,
  AsyncYieldAddToCart,
  SchedulerAddToCart,
  SchedulerYieldAddToCart
} from '@/components/examples/long-tasks/AddToCartOptimizations'
import {
  TimeoutExample,
  PromiseExample,
  AsyncAwaitExample,
  SchedulerExample
} from '@/components/examples/long-tasks/OptimizationExamples'

export default function LongTasksPage() {
  // Use the first product as an example
  const product = products[0]

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Long Tasks Optimization Examples</h1>
      
      <div className="grid gap-8">
        {/* Basic Examples */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Basic Examples</h2>
          <div className="grid gap-8">
            {/* Timeout vs rAF */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">setTimeout vs requestAnimationFrame</h3>
              <p className="mb-4 text-muted-foreground">
                Comparing setTimeout with requestAnimationFrame for scheduling tasks.
              </p>
              <TimeoutExample />
            </div>

            {/* Promise Example */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Promise Optimization</h3>
              <p className="mb-4 text-muted-foreground">
                Using queueMicrotask and Promise chaining for better performance.
              </p>
              <PromiseExample />
            </div>

            {/* Async/Await Example */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Async/Await Patterns</h3>
              <p className="mb-4 text-muted-foreground">
                Optimizing async/await code to prevent main thread blocking.
              </p>
              <AsyncAwaitExample />
            </div>

            {/* Scheduler Example */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">Scheduler API</h3>
              <p className="mb-4 text-muted-foreground">
                Using the experimental Scheduler API for priority-based task scheduling.
              </p>
              <SchedulerExample />
            </div>
          </div>
        </section>

        {/* Add to Cart Examples */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold">Add to Cart Optimization Examples</h2>
          <div className="grid gap-8">
            {/* 1. Original Implementation */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">1. Original Implementation (Unoptimized)</h3>
              <p className="mb-4 text-muted-foreground">
                All operations run synchronously, blocking the main thread.
              </p>
              <OriginalAddToCart product={product} />
            </div>

            {/* 2. Manual Deferral */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">2. Manual Deferral</h3>
              <p className="mb-4 text-muted-foreground">
                Critical operations run immediately, non-critical operations are deferred using setTimeout.
              </p>
              <DeferredAddToCart product={product} />
            </div>

            {/* 3. Async/Await with Yield */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">3. Async/Await with Yield Points</h3>
              <p className="mb-4 text-muted-foreground">
                Tasks are broken up with manual yield points using async/await.
              </p>
              <AsyncYieldAddToCart product={product} />
            </div>

            {/* 4. Scheduler API */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">4. Scheduler API</h3>
              <p className="mb-4 text-muted-foreground">
                Tasks are scheduled with different priorities using the Scheduler API.
              </p>
              <SchedulerAddToCart product={product} />
            </div>

            {/* 5. Scheduler Yield */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-4 text-xl font-semibold">5. Scheduler Yield API</h3>
              <p className="mb-4 text-muted-foreground">
                Tasks are broken up using the Scheduler's built-in yielding mechanism.
              </p>
              <SchedulerYieldAddToCart product={product} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
