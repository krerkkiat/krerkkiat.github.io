import Alpine from 'alpinejs'

import { textOps } from './textOps';

window.Alpine = Alpine;
Alpine.data('textOps', textOps);
Alpine.start();