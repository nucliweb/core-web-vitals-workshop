import { initMetaPixel } from './meta-pixel';
import { initTikTokPixel } from './tiktok-pixel';
import { initInstagramPixel } from './instagram-pixel';

export const initializeTracking = () => {
  const metaPixel = initMetaPixel();
  const tiktokPixel = initTikTokPixel();
  const instagramPixel = initInstagramPixel();

  return {
    metaPixel,
    tiktokPixel,
    instagramPixel,
    
    // Utility method to track across all pixels
    trackEvent: (eventName: string, data: any) => {
      switch(eventName) {
        case 'pageView':
          metaPixel.pageView();
          tiktokPixel.pageView();
          instagramPixel.pageView();
          break;
        case 'viewContent':
          metaPixel.viewContent(data);
          tiktokPixel.viewContent(data);
          instagramPixel.viewContent(data);
          break;
        case 'addToCart':
          metaPixel.addToCart(data);
          tiktokPixel.addToCart(data);
          instagramPixel.addToCart(data);
          break;
        default:
          console.log('[Mock Tracking] Unknown event:', eventName, data);
      }
    }
  };
};
