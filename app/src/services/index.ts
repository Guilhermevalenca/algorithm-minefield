// aqui fica todos os imports das services
import { serviceExports } from "../utils/services-exports";
import { MapService } from "./map.service";

//adicione novos services aqui!
const servicesClasses = [MapService];

export default serviceExports(servicesClasses);
