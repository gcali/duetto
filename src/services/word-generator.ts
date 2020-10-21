import { wordList } from '@/data/words';
import { CardType, FullWord } from "@/model/cards";
import { mulberry, Random } from './random';

function shuffle<T>(words: T[], random: Random) {
  for (let i = words.length - 1; i > 0; i--) {
    const target = random.randomIntFromInterval(0, i);
    const x = words[i];
    words[i] = words[target];
    words[target] = x;
  }
}

type FirstWord = {
  word: string;
  type: CardType;
}

export const generateWords = (seed: string): FullWord[] => {

  const uniqueWords = new Set<string>(wordList);
    const random = mulberry(seed);
    const selectedWords: Set<string> = new Set<string>();
    while (selectedWords.size < 25) {
      const index = random.randomIntFromInterval(0, wordList.length-1);
      selectedWords.add(wordList[index]);
    }

    const browns: string[] = [];
    const blacks: string[] = [];
    const greens: string[] = [];

    const result: FullWord[] = [];

    const materialized = [...selectedWords];
    for (let i = 0; i < materialized.length; i++) {
      if (i < 3) {
        blacks.push(materialized[i]);
      } else if (i < 12) {
        greens.push(materialized[i]);
      } else {
        browns.push(materialized[i]);
      }
    }

    shuffle(browns, random);
    shuffle(blacks, random);
    shuffle(greens, random);

    const blackOrder: CardType[] = ["black", "green", "brown"];
    for (let i = 0; i < blacks.length; i++) {
      result.push({
      word: blacks[i],
      state: {type: "none"},
      type: {
        A: "black",
        B: blackOrder[i]
      }
      })
    }

    for (let i = 0; i < greens.length; i++) {
      const bType: CardType = i < 3 ? "green" : (i < 4 ? "black" : "brown");
      result.push({
        word: greens[i],
        state: {type: "none"},
        type: {
          A: "green",
          B: bType
        }
      })
    }

    for (let i = 0; i < browns.length; i++) {
      const bType: CardType = i < 5 ? "green" : (i < 6 ? "black" : "brown");
      result.push({
        word: browns[i],
        state: {type: "none"},
        type: {
          A: "brown",
          B: bType
        }
      });
    }

    shuffle(result, random);

    return result;

    // const words = 
    //   [...selectedWords].map((e,i) => ({
    //     word: e,
    //     type: (i < 3 ? "black" : (i < 12 ? "green" : "brown")) as CardType,
    //     state: {type: "none"} as CardState
    //   }));
    // shuffle(words, random);
    // const fullWords = words.map((e,i) => ({
    //   ...e,
    //   type: {
    //     A: e.type,
    //     B: (i < 3 ? "black" : (i < 12 ? "green" : "brown")) as CardType,
    //   }
    // }));
    // shuffle(fullWords, random);
    // return fullWords;
}
