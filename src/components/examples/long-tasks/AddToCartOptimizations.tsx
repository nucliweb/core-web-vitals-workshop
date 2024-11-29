import { useState } from 'react'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'

// Simulated functions that could cause long tasks
const validateProduct = (product: Product) => {
  // Simulate complex validation
  console.log('Validating product:', product.id)
  // Artificial delay to simulate heavy computation
  let result = 0
  for(let i = 0; i < 1000000; i++) {
    result += i
  }
  return true
}

const saveToAnalytics = (product: Product) => {
  console.log('Saving to analytics:', {
    event: 'add_to_cart',
    product_id: product.id,
    product_name: product.name,
    price: product.price
  })
  // Simulate complex analytics processing
  let result = 0
  for(let i = 0; i < 1000000; i++) {
    result += i
  }
}

const updateInventory = (product: Product) => {
  console.log('Updating inventory for product:', product.id)
  // Simulate database operation
  let result = 0
  for(let i = 0; i < 1000000; i++) {
    result += i
  }
}

const updateUIState = (product: Product) => {
  console.log('Updating UI state for product:', product.id)
  // Simulate complex UI updates
  let result = 0
  for(let i = 0; i < 500000; i++) {
    result += i
  }
}

// 1. Original Implementation (Unoptimized)
export function OriginalAddToCart({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // All operations blocking the main thread
    validateProduct(product)
    updateUIState(product)
    updateInventory(product)
    saveToAnalytics(product)
    addItem(product)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button
      className={cn('gap-2')}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

// 2. Manual Deferral Implementation
export function DeferredAddToCart({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Critical user-visible operations first
    validateProduct(product)
    updateUIState(product)
    addItem(product)
    
    // Defer non-critical operations
    setTimeout(() => {
      updateInventory(product)
      saveToAnalytics(product)
      setIsAdding(false)
    }, 0)
  }

  return (
    <Button
      className={cn('gap-2')}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

// 3. Using Async/Await with Yield Points
export function AsyncYieldAddToCart({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const yieldToMain = () => {
    return new Promise(resolve => {
      setTimeout(resolve, 0)
    })
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    const tasks = [
      () => validateProduct(product),
      () => updateUIState(product),
      () => addItem(product),
      () => updateInventory(product),
      () => saveToAnalytics(product)
    ]

    for (const task of tasks) {
      task()
      await yieldToMain()
    }

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button
      className={cn('gap-2')}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

// 4. Using Scheduler API
export function SchedulerAddToCart({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    setIsAdding(true)

    // High priority tasks
    scheduler.postTask(() => validateProduct(product), { priority: 'user-blocking' })
    scheduler.postTask(() => updateUIState(product), { priority: 'user-blocking' })
    scheduler.postTask(() => addItem(product), { priority: 'user-blocking' })

    // Background tasks
    scheduler.postTask(() => updateInventory(product), { priority: 'background' })
    scheduler.postTask(() => saveToAnalytics(product), { priority: 'background' })
    scheduler.postTask(() => setIsAdding(false), { priority: 'background' })
  }

  return (
    <Button
      className={cn('gap-2')}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}

// 5. Using Scheduler Yield API
export function SchedulerYieldAddToCart({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    const tasks = [
      () => validateProduct(product),
      () => updateUIState(product),
      () => addItem(product),
      () => updateInventory(product),
      () => saveToAnalytics(product)
    ]

    for (const task of tasks) {
      task()
      // Use scheduler's built-in yielding mechanism
      await scheduler.yield()
    }

    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Button
      className={cn('gap-2')}
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <ShoppingCart className="h-4 w-4" />
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}
