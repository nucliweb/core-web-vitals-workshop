import { useEffect, useState } from 'react';

interface AdvertisementProps {
  width?: number;
  height?: number;
  delay?: number;
  position?: 'top' | 'middle' | 'bottom';
}

export const Advertisement = ({
  width = 300,
  height = 250,
  delay = 0,
  position = 'middle',
}: AdvertisementProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [adHeight, setAdHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setAdHeight(height);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, height]);

  return (
    <div
      style={{
        maxWidth: '100%',
        width: `${width}px`,
        height: `${adHeight}px`,
        backgroundColor: '#f0f0f0',
        margin: '1rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        overflow: 'hidden',
      }}
    >
      {isLoaded ? (
        <div>
          <p style={{ margin: 0, textAlign: 'center', color: '#666' }}>
            Advertisement
          </p>
          <p
            style={{
              margin: '0.5rem 0 0',
              textAlign: 'center',
              color: '#999',
              fontSize: '0.8rem',
            }}
          >
            {width}x{height}
          </p>
        </div>
      ) : (
        <p style={{ margin: 0, textAlign: 'center', color: '#999' }}>
          Loading ad...
        </p>
      )}
    </div>
  );
};
