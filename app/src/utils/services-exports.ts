import { axios } from "../plugins/";
import type { Service } from "../services/default.service";

type ClassesArray = Array<new (...args: any[]) => Service>;

export function serviceExports(
  servicesClasses: ClassesArray
): Record<string, Service> {
  const services = Object.fromEntries(
    servicesClasses.map((Service) => {
      const name =
        String(Service?.name).charAt(0).toLowerCase() +
        String(Service?.name).slice(1);
      return [name, new Service(axios)];
    })
  );
  return Object.entries(services).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}
