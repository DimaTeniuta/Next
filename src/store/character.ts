import { makeAutoObservable } from 'mobx';
import { ICharacter } from '@/interfaces/character';

class Character {
  character = {} as ICharacter;

  constructor() {
    makeAutoObservable(this);
  }

  setCharacter(data: ICharacter) {
    this.character = data;
  }
}

const characterStore = new Character();

export default characterStore;
