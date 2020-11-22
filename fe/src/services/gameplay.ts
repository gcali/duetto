import { CardState, FullWord } from '@/model/cards';
import { Player, PlayerState } from '@/model/player';

export class Gameplay {
    public playWord(
        word: FullWord, 
        {player, currentPlayer}: PlayerState, 
        gameState: {
            words: FullWord[]; 
            remainingSuggestions: number;
        }
    ): {
        state: CardState; 
        nextPlayer: Player | null; 
        loseSuggestion: boolean;
        isGameWon: boolean;
        disablePass: boolean;
    } {
        const isMyTurn = player === currentPlayer;

        const type = word.type[this.otherPlayer(currentPlayer)];
        const selectedBy = isMyTurn ? "you" : "other";
        const state: CardState = type === "black" ? {type} : {type,selectedBy};
        const playersToPlay = (["A","B"] as Player[]).filter(p => {
            const cardsToPlay = gameState.words
                .filter(e => e.type[p] === "green")
                .filter(e => e.state.type !== "green" && !(type === "green" && e.word === word.word));
            console.log({p, cardsToPlay, w: word.word, t: type});
            return cardsToPlay.length > 0;
        }).map(e => this.otherPlayer(e));
        console.log(playersToPlay);
        if (playersToPlay.length === 0) {
            return {
                state,
                nextPlayer: null,
                loseSuggestion: false,
                isGameWon: true,
                disablePass: true
            };
        }

        if (type === "black" || (type !== "green" && gameState.remainingSuggestions === 0)) {
            return {
                state,
                nextPlayer: null,
                loseSuggestion: false,
                isGameWon: false,
                disablePass: true
            };
        }

        const candidatePlayer = type === "green" ? currentPlayer : this.otherPlayer(currentPlayer);

        return {
            state, 
            nextPlayer: playersToPlay.includes(candidatePlayer) ? candidatePlayer : this.otherPlayer(candidatePlayer),
            loseSuggestion: type !== "green",
            isGameWon: false,
            disablePass: playersToPlay.length === 1
        };
    }

    public otherPlayer(player: Player): Player {
        return player === "A" ? "B" : "A";
    }
}