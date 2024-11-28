// Mock implementation of Instagram Pixel
export const initInstagramPixel = () => {
  console.log('[Mock] Initializing Instagram Pixel');
  
  // Simulate ig function
  (window as any).ig = function(...args: any[]) {
    console.log('[Mock IG Pixel]', ...args);
  };

  // Mock pixel base code
  console.log('[Mock] Loading Instagram Pixel base code');
  
  // Mock pixel events
  return {
    pageView: () => {
      console.log('[Mock IG Pixel] Track PageView');
      (window as any).ig('track', 'PageView');
    },
    viewContent: (data: any) => {
      console.log('[Mock IG Pixel] Track ViewContent', data);
      (window as any).ig('track', 'ViewContent', data);
    },
    addToCart: (data: any) => {
      console.log('[Mock IG Pixel] Track AddToCart', data);
      (window as any).ig('track', 'AddToCart', data);
    }
  };
};
