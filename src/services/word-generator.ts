import { wordList } from '@/data/words';
import { CardState, CardType, FullWord } from "@/model/cards";
import { mulberry } from './random';

export const generateWords = (seed: string): FullWord[] => {
    const random = mulberry(seed);
    const selectedWords: Set<string> = new Set<string>();
    while (selectedWords.size < 25) {
      const index = random.randomIntFromInterval(0, wordList.length-1);
      selectedWords.add(wordList[index]);
    }
    const words = 
      [...selectedWords].map((e,i) => ({
        word: e,
        type: (i < 3 ? "black" : (i < 12 ? "green" : "brown")) as CardType,
        state: {type: "none"} as CardState
      }));
    for (let i = words.length-1; i > 0; i--) {
      const target = random.randomIntFromInterval(0, i);
      const x = words[i];
      words[i] = words[target];
      words[target] = x;
    }
    return words;
}