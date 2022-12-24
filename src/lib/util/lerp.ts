const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const lerpRange = (x: number, y: number, n: number) => {
  const items = [];
  const progress = 1 / n;

  for (let i = 0; i <= n; i++) {
    items.push(lerp(x, y, progress + progress * i));
  }

  return items;
};

export { lerp, lerpRange };
