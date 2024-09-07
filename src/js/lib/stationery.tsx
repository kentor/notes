const checkerboardPattern = `
  linear-gradient(
    45deg,
    transparent 25%,
    rgba(255, 255, 255, .2) 25%,
    rgba(255, 255, 255, .2) 75%,
    transparent 75%,
    transparent
  )
`;

const dotsPattern = `
  radial-gradient(rgba(255, 255, 255, .2) 25%, transparent 25%)
`;

const stripesPattern = `
  repeating-linear-gradient(
    135deg,
    transparent,
    transparent 11px,
    rgba(255,255,255,.2) 11px,
    rgba(255,255,255,.2) 22px
  )
`;

const checkerboard = {
  backgroundImage: `${checkerboardPattern}, ${checkerboardPattern}`,
  backgroundPosition: '0 0, 15px 15px',
  backgroundSize: '30px 30px',
};

const dots = {
  backgroundImage: `${dotsPattern}, ${dotsPattern}`,
  backgroundPosition: '0 0, 15px 15px',
  backgroundSize: '30px 30px',
};

const stripes = {
  backgroundImage: stripesPattern,
};

const patterns: Array<typeof checkerboard | typeof dots | typeof stripes> = [
  checkerboard,
  dots,
  stripes,
];

type BackgroundStyles = (typeof patterns)[0] & {backgroundColor: string};

const cache = new Map<string, BackgroundStyles>();

export function getBackgroundStyles(key: string): BackgroundStyles {
  const existing = cache.get(key);

  if (existing) {
    return existing;
  }

  const style = {
    ...patterns[Math.floor(Math.random() * patterns.length)],
    backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 87.5%)`,
  };

  cache.set(key, style);

  return style;
}
