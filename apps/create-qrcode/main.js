import Alpine from "alpinejs";

import { qrcodeApp } from './qrcodeApp';

window.Alpine = Alpine;
Alpine.data('qrcodeApp', qrcodeApp);
Alpine.start();