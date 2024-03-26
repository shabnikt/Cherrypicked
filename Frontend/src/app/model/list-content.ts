import { Film } from "./film";

export interface ListContent {
    pkList: string;
    listName: string;
    listAddress: string;
    listUse: boolean;
    films: Film[];
}
