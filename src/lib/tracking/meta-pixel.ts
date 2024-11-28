// Mock implementation of Meta (Facebook) Pixel
export const initMetaPixel = () => {
  console.log('[Mock] Initializing Meta Pixel');
  
  // Simulate fbq function
  (window as any).fbq = function(...args: any[]) {
    console.log('[Mock FB Pixel]', ...args);
  };

  // Mock pixel base code
  console.log('[Mock] Loading Meta Pixel base code');
  
  // Mock pixel events
  return {
    pageView: () => {
      console.log('[Mock FB Pixel] Track PageView');
      (window as any).fbq('track', 'PageView');
    },
    viewContent: (data: any) => {
      console.log('[Mock FB Pixel] Track ViewContent', data);
      (window as any).fbq('track', 'ViewContent', data);
    },
    addToCart: (data: any) => {
      console.log('[Mock FB Pixel] Track AddToCart', data);
      (window as any).fbq('track', 'AddToCart', data);
    }
  };
};
