import { Photo } from './Photo';

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: any;
  photoUrl: string;
  city: string;
  country: string;
  //we also include userForDetailedDto
  interest?: string;
  introduction?: string;
  lookingFor?:string;
  photos?:Photo[];
}
