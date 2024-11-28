// Mock implementation of TikTok Pixel
export const initTikTokPixel = () => {
  console.log('[Mock] Initializing TikTok Pixel');
  
  // Simulate ttq function
  (window as any).ttq = {
    track: (...args: any[]) => {
      console.log('[Mock TikTok Pixel] Track:', ...args);
    },
    page: (...args: any[]) => {
      console.log('[Mock TikTok Pixel] Page:', ...args);
    }
  };

  // Mock pixel base code
  console.log('[Mock] Loading TikTok Pixel base code');
  
  // Mock pixel events
  return {
    pageView: () => {
      console.log('[Mock TikTok Pixel] Track PageView');
      (window as any).ttq.page();
    },
    viewContent: (data: any) => {
      console.log('[Mock TikTok Pixel] Track ViewContent', data);
      (window as any).ttq.track('ViewContent', data);
    },
    addToCart: (data: any) => {
      console.log('[Mock TikTok Pixel] Track AddToCart', data);
      (window as any).ttq.track('AddToCart', data);
    }
  };
};
