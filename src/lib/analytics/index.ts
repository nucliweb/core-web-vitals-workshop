export { tagging } from './tagging';

// Initialize analytics when importing this module
import { tagging } from './tagging';

// Export a function to manually initialize if needed
export function initializeAnalytics() {
  // This space is reserved for future analytics initialization
  // Currently, the tagging system auto-initializes on import
  return tagging;
}
