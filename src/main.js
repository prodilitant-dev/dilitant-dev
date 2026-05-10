import { HashRouter } from '@core/router';
import { storageService } from '@core/services/storageService';
import { initTheme } from '@core/theme';
import { PortalPage } from '@features/portal/PortalPage';
import { ShowcasePage } from '@features/showcase/ShowcasePage';

initTheme();

const router = new HashRouter(document.getElementById('app'));
router.addRoute('/', PortalPage);
router.addRoute('/showcase', ShowcasePage);
router.start();
