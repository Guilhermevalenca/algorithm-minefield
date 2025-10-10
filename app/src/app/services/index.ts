// aqui fica todos os imports das services
import { Service } from "./default.service";
import { MapService } from "./map.service";
import { axios } from "../plugins";

const mapService = new MapService(axios);

export { Service, mapService };
