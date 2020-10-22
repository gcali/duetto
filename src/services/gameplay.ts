import { CardState, FullWord } from '@/model/cards';
import { Player, PlayerState } from '@/model/player';

export class Gameplay {
    public playWord(word: FullWord, {player, currentPlayer}: PlayerState): 
        {
            state: CardState; 
            nextPlayer: Player | null; 
            loseSuggestion: boolean;
            
        } {
        const isMyTurn = player === currentPlayer;

        const type = word.type[this.otherPlayer(currentPlayer)];
        const selectedBy = isMyTurn ? "you" : "other";
        const state: CardState = type === "black" ? {type} : {type,selectedBy};
        return {
            state, 
            nextPlayer: type === "green" ? currentPlayer : (type === "black" ? null : this.otherPlayer(currentPlayer)),
            loseSuggestion: type !== "green"
        };
    }

    public otherPlayer(player: Player): Player {
        return player === "A" ? "B" : "A";
    }
}