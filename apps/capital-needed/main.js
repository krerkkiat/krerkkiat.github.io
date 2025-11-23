import Alpine from "alpinejs";

import { capitalNeededApp } from "./capitalNeededApp";
import { mainNav } from "../mainNav";

window.Alpine = Alpine;
Alpine.data("capitalNeededApp", capitalNeededApp); 
Alpine.data("mainNav", mainNav);
Alpine.start();