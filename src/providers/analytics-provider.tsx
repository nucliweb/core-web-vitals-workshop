import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { tagging } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const location = useLocation();

  // Track page views on route changes
  useEffect(() => {
    // The tagging system will automatically track the pageview
    // when initialized
  }, [location]);

  return <>{children}</>;
}
