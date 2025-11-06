import Alpine from 'alpinejs'

import { passwordApp } from './passwordApp';
import { mainNav } from '../mainNav';

window.Alpine = Alpine;
Alpine.data('passwordApp', passwordApp);
Alpine.data('mainNav', mainNav);
Alpine.start();