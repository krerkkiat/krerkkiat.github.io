import Alpine from "alpinejs";

import { textOps } from './textOps';
import { mainNav } from '../mainNav';

window.Alpine = Alpine;
Alpine.data('textOps', textOps);
Alpine.data('mainNav', mainNav);
Alpine.start();