# core-web-vitals-workshop

```js
const ProductImage = ({ filename, alt }) => {
  const variants = getImageVariants(filename);
  
  return (
    <picture>
      {variants.avif && <source srcSet={variants.avif} type="image/avif" />}
      {variants.webp && <source srcSet={variants.webp} type="image/webp" />}
      <img src={variants.jpg} alt={alt} />
    </picture>
  );
};
```