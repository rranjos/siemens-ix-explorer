import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@siemens/ix/loader';

// Definir componentes IX primeiro
defineCustomElements();

// Configurar tema
document.body.classList.add('theme-classic-dark');

// Aguardar um pouco e então configurar os ícones
setTimeout(() => {
  import('@siemens/ix-icons').then(({ addIcons }) => {
    import('@siemens/ix-icons/icons').then(
      ({ iconHome, iconCogwheel, iconInfo, iconApps }) => {
        addIcons({
          iconHome,
          iconCogwheel,
          iconInfo,
          iconApps,
        });
        console.log('Ícones adicionados:', {
          iconHome,
          iconCogwheel,
          iconInfo,
          iconApps,
        });
      }
    );
  });
}, 100);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
