# 🎨 This project was created to demonstrate the practical implementation of Card List Navigators  🛠️ Technologies Used

### Core

- **Angular 18.2.0** - Main framework
- **TypeScript 5.4** - Programming language
- **RxJS** - Reactive programming

### UI Library

- **@siemens/ix-angular 3.2.0** - UI components
- **@siemens/ix-icons 3.1.1** - Icon library
- **@stencil/core 4.36.2** - Web Components

### Development

- **Angular CLI 17.3.7** - Tooling
- **ESLint** - Linting
- **Sass** - CSS preprocessor

## 📁 Project Structure library in a modern Angular application. It includes examples of:

- ✅ Complete Siemens IX setup with Angular 18
- ✅ Standalone components (no NgModules)
- ✅ Configurable dark/light theme
- ✅ Navigation system with sidebar menu
- ✅ Card list component with carousel
- ✅ BEM methodology for CSS organization
- ✅ TypeScript with signals and effect APIs
- ✅ Responsive design
- ✅ Properly configured Siemens IX icons

## 🎯 Demo

The project includes:

> A sample project demonstrating how to integrate and use the **Siemens IX** component library with **Angular 18** using **standalone components** and **BEM** methodology for CSS.

![Angular](https://img.shields.io/badge/Angular-18-red)
![Siemens IX](https://img.shields.io/badge/Siemens%20IX-3.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📝 About the Project

This project was created to demonstrate the practical implementation of the **Siemens IX** library in a modern Angular application. It includes examples of:

- ✅ Complete Siemens IX setup with Angular 18
- ✅ Standalone components (no NgModules)
- ✅ Configurable dark/light theme
- ✅ Navigation system with sidebar menu
- ✅ Card list component with carousel
- ✅ BEM methodology for CSS organization
- ✅ TypeScript with signals and effect APIs
- ✅ Responsive design
- ✅ Properly configured Siemens IX icons

## 🎯 Demo

The project includes:

### 🏠 Home Page

- Application layout with sidebar menu
- Dark theme configured
- Functional navigation system

### 📋 Card List Component

- Horizontal card carousel
- Navigation buttons (previous/next)
- Video and link cards
- Smooth hover effects and animations
- Responsive layout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Angular CLI 17+

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/rranjos/siemens-ix-explorer.git
cd siemens-ix-explorer
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the project**

```bash
npm start
```

4. **Open in browser**

```
http://localhost:4200
```

## 🛠️ Technologies Used

### Core

- **Angular 18.2.0** - Framework principal
- **TypeScript 5.4** - Linguagem de programação
- **RxJS** - Programação reativa

### UI Library

- **@siemens/ix-angular 3.2.0** - Componentes UI
- **@siemens/ix-icons 3.1.1** - Biblioteca de ícones
- **@stencil/core 4.36.2** - Web Components

### Desenvolvimento

- **Angular CLI 17.3.7** - Tooling
- **ESLint** - Linting
- **Sass** - Pré-processador CSS

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── card-list/                    # Card list component
│   │   ├── card-list-page.component.ts
│   │   ├── card-list.component.ts
│   │   ├── card-list.component.html
│   │   ├── card-list.component.scss  # CSS with BEM methodology
│   │   └── types.ts                  # TypeScript interfaces
│   ├── app.component.ts              # Root component
│   ├── app.component.html            # Main layout
│   ├── app.config.ts                 # Application configuration
│   └── app.routes.ts                 # Routing
├── main.ts                           # Application bootstrap
└── styles.scss                      # Global styles with Siemens IX theme
```

## 🎨 Siemens IX Configuration

### 1. Dependencies Installation

```bash
npm install @siemens/ix-angular @siemens/ix-icons @stencil/core
```

### 2. Configuration in main.ts

```typescript
import { defineCustomElements } from "@siemens/ix/loader";
import { addIcons } from "@siemens/ix-icons";
import { iconHome, iconApps, iconCogwheel, iconInfo } from "@siemens/ix-icons/icons";

// Define IX components
defineCustomElements();

// Configure icons
addIcons({
  iconHome,
  iconApps,
  iconCogwheel,
  iconInfo,
});

// Apply theme
document.body.classList.add("theme-classic-dark");
```

### 3. Configuration in angular.json

```json
{
  "styles": ["node_modules/@siemens/ix/dist/siemens-ix/siemens-ix.css", "node_modules/@siemens/ix/dist/siemens-ix/theme/classic-dark.css", "src/styles.scss"],
  "assets": [
    {
      "glob": "**/*",
      "input": "node_modules/@siemens/ix/dist/siemens-ix",
      "output": "assets/siemens-ix"
    },
    {
      "glob": "**/*",
      "input": "node_modules/@siemens/ix-icons/dist",
      "output": "assets/ix-icons"
    }
  ]
}
```

### 4. Import in Components

```typescript
import { IxModule } from '@siemens/ix-angular';

@Component({
  standalone: true,
  imports: [IxModule, CommonModule, RouterOutlet],
  // ...
})
```

## 🎯 Implemented Components

### Navigation Menu

```html
<ix-menu>
  <ix-menu-item home>
    <ix-icon name="home" slot="icon"></ix-icon>
    Home
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/card-list']">
    <ix-icon name="apps" slot="icon"></ix-icon>
    Card List
  </ix-menu-item>
</ix-menu>
```

### Cards with Carousel

```html
<ix-card class="card card--video" (click)="onCardClick(card)">
  <div class="card__content">
    <div class="card__thumbnail">
      <img [src]="card.thumbnail" class="card__image" />
      <div class="card__overlay">
        <span class="card__play-icon">▶</span>
      </div>
    </div>
  </div>
</ix-card>
```

## 🎨 BEM Methodology

The project uses the **BEM** (Block, Element, Modifier) methodology for CSS organization:

```scss
// Block
.card-list {
}

// Elements
.card-list__header {
}
.card-list__nav {
}
.card-list__viewport {
}

// Modifiers
.card-list__nav--left {
}
.card-list__nav--right {
}

// Block
.card {
}

// Elements
.card__content {
}
.card__thumbnail {
}
.card__image {
}

// Modifiers
.card--video {
}
.card--link {
}
```

## 🌈 Themes

The project supports official Siemens IX themes:

- **Classic Light** - `theme-classic-light`
- **Classic Dark** - `theme-classic-dark` (default)

To change the theme, modify in `main.ts`:

```typescript
// For light theme
document.body.classList.add("theme-classic-light");

// For dark theme
document.body.classList.add("theme-classic-dark");
```

## 📱 Responsive Features

- Flexible layout that adapts to different screen sizes
- Collapsible sidebar menu
- Cards with horizontal scroll on mobile devices
- Dynamically positioned navigation buttons

## 🔧 Available Scripts

```bash
# Development
npm start               # Start development server
npm run build          # Build for production
npm run watch          # Build in watch mode

# Testing
npm test               # Run unit tests
npm run test:headless  # Run tests without UI

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix lint issues automatically
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Useful Resources

- [Siemens IX Documentation](https://ix.siemens.io/)
- [Angular Documentation](https://angular.io/docs)
- [BEM Methodology](http://getbem.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👨‍💻 Author

**rranjos**

- GitHub: [@rranjos](https://github.com/rranjos)

## 🙏 Acknowledgments

- [Siemens](https://www.siemens.com/) for the excellent component library
- [Angular Team](https://angular.io/team) for the amazing framework
- Open source community for continuous support

---

⭐ **If this project helped you, consider giving it a star!** ⭐
