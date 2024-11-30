import { useEffect, useState } from 'react';

interface AdvertisementProps {
  width?: number;
  height?: number;
  delay?: number;
}

export const Advertisement = ({
  width = 728,
  height = 90,
  delay = 300,
}: AdvertisementProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        maxWidth: '100%',
        width: `${width}px`,
        height: `${height}px`, // Height fija desde el inicio
        backgroundColor: '#f0f0f0',
        margin: '1rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
        overflow: 'hidden',
        opacity: isLoaded ? 1 : 0, // Usamos opacity en lugar de height
        transition: 'opacity 0.3s ease', // Transición suave
      }}
      aria-label="Advertisement"
      role="complementary"
    >
      {isLoaded && (
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
      )}
    </div>
  );
};
