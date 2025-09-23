import Alpine from 'alpinejs'

import { passwordApp } from './passwordApp';

window.Alpine = Alpine;
Alpine.data('passwordApp', passwordApp);
Alpine.start();