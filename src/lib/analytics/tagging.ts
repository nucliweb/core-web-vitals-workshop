interface BaseEvent {
  timestamp: number;
  path: string;
}

interface ClickEvent extends BaseEvent {
  type: 'click';
  elementId: string;
  elementText?: string;
  metadata?: Record<string, any>;
}

interface PageViewEvent extends BaseEvent {
  type: 'pageview';
  title: string;
  referrer: string;
}

interface ProductEvent extends BaseEvent {
  type: 'product_click' | 'product_view' | 'add_to_cart';
  productId: string;
  productName: string;
  price: number;
}

interface NavigationEvent extends BaseEvent {
  type: 'menu_click';
  menuItem: string;
  section: string;
}

type AnalyticsEvent = ClickEvent | PageViewEvent | ProductEvent | NavigationEvent;

class TaggingSystem {
  private readonly STORAGE_KEY = 'ecommerce_analytics_events';
  private maxEvents: number = 1000;

  constructor() {
    this.initializeTracking();
  }

  private initializeTracking(): void {
    // Track pageviews
    this.trackPageView();

    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Track buy buttons
      if (target.matches('[data-analytics="buy-button"]')) {
        const productElement = target.closest('[data-product-id]');
        if (productElement) {
          this.trackProductEvent('add_to_cart', productElement as HTMLElement);
        }
      }

      // Track menu clicks
      if (target.matches('nav a, nav button')) {
        this.trackMenuClick(target);
      }

      // Track general clicks
      this.trackClick(target);
    });
  }

  private trackPageView(): void {
    const pageViewEvent: PageViewEvent = {
      type: 'pageview',
      timestamp: Date.now(),
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer
    };

    this.storeEvent(pageViewEvent);
  }

  private trackClick(element: HTMLElement): void {
    const clickEvent: ClickEvent = {
      type: 'click',
      elementId: element.id || 'unknown',
      elementText: element.textContent?.trim(),
      path: window.location.pathname,
      timestamp: Date.now(),
      metadata: {
        classList: Array.from(element.classList),
        tagName: element.tagName.toLowerCase(),
      }
    };

    this.storeEvent(clickEvent);
  }

  private trackProductEvent(type: ProductEvent['type'], element: HTMLElement): void {
    const productEvent: ProductEvent = {
      type,
      timestamp: Date.now(),
      path: window.location.pathname,
      productId: element.getAttribute('data-product-id') || '',
      productName: element.getAttribute('data-product-name') || '',
      price: Number(element.getAttribute('data-product-price')) || 0
    };

    this.storeEvent(productEvent);
  }

  private trackMenuClick(element: HTMLElement): void {
    const navigationEvent: NavigationEvent = {
      type: 'menu_click',
      timestamp: Date.now(),
      path: window.location.pathname,
      menuItem: element.textContent?.trim() || '',
      section: element.closest('nav')?.getAttribute('data-section') || 'main'
    };

    this.storeEvent(navigationEvent);
  }

  private storeEvent(event: AnalyticsEvent): void {
    try {
      const events = this.getStoredEvents();
      events.push(event);
      
      // Keep only the latest events if we exceed maxEvents
      const trimmedEvents = events.slice(-this.maxEvents);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedEvents));
    } catch (error) {
      console.error('Error storing analytics event:', error);
    }
  }

  public getStoredEvents(): AnalyticsEvent[] {
    try {
      const eventsJson = localStorage.getItem(this.STORAGE_KEY);
      return eventsJson ? JSON.parse(eventsJson) : [];
    } catch (error) {
      console.error('Error retrieving stored events:', error);
      return [];
    }
  }

  public getEventsByType<T extends AnalyticsEvent>(type: T['type']): T[] {
    return this.getStoredEvents().filter(event => event.type === type) as T[];
  }

  public clearStoredEvents(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  public getEventsByTimeRange(startTime: number, endTime: number): AnalyticsEvent[] {
    return this.getStoredEvents().filter(
      event => event.timestamp >= startTime && event.timestamp <= endTime
    );
  }
}

// Export singleton instance
export const tagging = new TaggingSystem();
