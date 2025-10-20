// aqui fica todos os imports das services
import { Service } from "./default.service";
import { ClassicMapService } from "./classic-map.service";
import { axios } from "../plugins";
import { NewMapService } from "./new-map.service";

const classicMapService = new ClassicMapService(axios);
const newMapService = new NewMapService(axios);

export { Service, classicMapService, newMapService };
