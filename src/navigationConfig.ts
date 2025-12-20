import { languageRoutes } from "./generated/languageRoutes";

export const navigationConfig = [
  { name: "Services", path: "/#services" },
  { 
    name: "Languages", 
    path: "/#languages",
    children: languageRoutes
  },
  { name: "Why Choose Us", path: "/#why-us" },
];
