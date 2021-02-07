import {createApp} from "./main";
import {createInMemoryBookRepository} from "./repository/inMemoryBookRespoitory";


export const app = createApp(createInMemoryBookRepository());