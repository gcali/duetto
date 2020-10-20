export interface Random {
  randomIntFromInterval(min: number, max: number): number;
}

function xmur3(str: string) {
    let h = 1779033703 ^ str.length
    for(let i = 0; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function(): number {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

const randomBuilder = (generator: () => number): Random => {
  return {
    randomIntFromInterval(min, max) {
      return Math.floor(generator() * (max - min + 1) + min);

    }
  }
}

export const mulberry = (seed: string): Random => {
  let state = xmur3(seed)();
  const generator = () => {
      let t = state += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  return randomBuilder(generator);
}
