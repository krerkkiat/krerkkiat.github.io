import Alpine from "alpinejs";

import { qrcodeApp } from './qrcodeApp';
import { mainNav } from '../mainNav';

window.Alpine = Alpine;
Alpine.data('qrcodeApp', qrcodeApp);
Alpine.data('mainNav', mainNav);
Alpine.start();