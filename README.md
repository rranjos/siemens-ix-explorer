# 🎨 Siemens IX Explorer

> A comprehensive project demonstrating the practical implementation of the **Siemens IX** component library with **Angular 18** using **standalone components** and modern development practices.

![Angular](https://img.shields.io/badge/Angular-18-red)
![Siemens IX](https://img.shields.io/badge/Siemens%20IX-3.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📝 About the Project

This project was created to demonstrate the practical implementation of the **Siemens IX** library in a modern Angular application. It showcases a comprehensive collection of interactive component examples including:

- ✅ Complete Siemens IX setup with Angular 18
- ✅ Standalone components (no NgModules)
- ✅ Configurable dark/light theme
- ✅ Navigation system with sidebar menu
- ✅ 8 different component demonstrations
- ✅ TypeScript with signals and effect APIs
- ✅ Responsive design
- ✅ Properly configured Siemens IX icons

## 🎯 Component Showcase

The project includes comprehensive examples of:

### 📋 Card List Component

- Horizontal card carousel with navigation
- Video and link cards with smooth animations
- Responsive layout with mobile support

### 🗂️ Right Pane Component

- Collapsible side panel implementation
- Context-sensitive information display
- Smooth open/close animations

### 🍞 Breadcrumb Component

- Basic breadcrumb navigation
- Interactive clickable breadcrumbs
- Icon-enhanced breadcrumbs
- Dynamic breadcrumb management

### 📑 Tabs Component

- Basic tab navigation
- Dynamic tab creation and removal
- Custom tab content with forms
- Responsive tab behavior

### 🌳 Tree Component

- Hierarchical tree navigation
- Expandable/collapsible nodes
- Interactive item selection
- Dynamic tree structure

### ⚙️ Workflow Component

- Horizontal workflow steps
- Interactive step progression
- Form integration workflows
- Status-based workflows

### 📅 Date Picker Component

- Basic date selection
- Date range picker
- Localized date formats
- Input validation

### 📆 Date Dropdown Component

- Calendar dropdown interface
- Month/year navigation
- Date selection callbacks
- Responsive calendar layout

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

### Core Framework

- **Angular 18.2.0** - Main framework with standalone components
- **TypeScript 5.4** - Programming language with strict mode
- **RxJS** - Reactive programming and state management

### UI Library

- **@siemens/ix-angular 3.2.0** - Complete UI component library
- **@siemens/ix-icons 3.1.1** - Professional icon library
- **@stencil/core 4.36.2** - Web Components foundation

### Development Tools

- **Angular CLI 17.3.7** - Project tooling and build system
- **ESLint** - Code quality and linting
- **Sass** - Advanced CSS preprocessor

## 📁 Project Structure

```
src/
├── app/
│   ├── breadcrumb/                   # Breadcrumb navigation examples
│   │   └── breadcrumb.component.ts   # 4 different breadcrumb demos
│   ├── card-list/                    # Card carousel component
│   │   ├── card-list-page.component.ts
│   │   ├── card-list.component.ts
│   │   ├── card-list.component.html
│   │   ├── card-list.component.scss  # CSS with BEM methodology
│   │   └── types.ts                  # TypeScript interfaces
│   ├── date-dropdown/                # Calendar dropdown examples
│   │   └── date-dropdown.component.ts # Interactive calendar picker
│   ├── date-picker/                  # Date input examples
│   │   └── date-picker.component.ts  # Date selection and ranges
│   ├── right-pane/                   # Side panel component
│   │   └── right-pane.component.ts   # Collapsible side panel
│   ├── tabs/                         # Tab navigation examples
│   │   └── tabs.component.ts         # Dynamic tab management
│   ├── tree/                         # Tree navigation examples
│   │   └── tree.component.ts         # Hierarchical tree structure
│   ├── workflow/                     # Workflow step examples
│   │   └── workflow.component.ts     # Process flow demonstrations
│   ├── app.component.ts              # Root component with navigation
│   ├── app.component.html            # Main layout with sidebar
│   ├── app.config.ts                 # Application configuration
│   └── app.routes.ts                 # Lazy-loaded routing
├── main.ts                           # Application bootstrap with IX setup
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

### Navigation Menu with All Components

```html
<ix-menu>
  <ix-menu-item home>
    <ix-icon name="home" slot="icon"></ix-icon>
    Card List
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/right-pane']">
    <ix-icon name="sidebar" slot="icon"></ix-icon>
    Right Pane
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/breadcrumb']">
    <ix-icon name="path" slot="icon"></ix-icon>
    Breadcrumb
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/tabs']">
    <ix-icon name="tabs" slot="icon"></ix-icon>
    Tabs
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/tree']">
    <ix-icon name="tree" slot="icon"></ix-icon>
    Tree
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/workflow']">
    <ix-icon name="workflow" slot="icon"></ix-icon>
    Workflow
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/date-picker']">
    <ix-icon name="calendar" slot="icon"></ix-icon>
    Date Picker
  </ix-menu-item>
  <ix-menu-item [routerLink]="['/date-dropdown']">
    <ix-icon name="date" slot="icon"></ix-icon>
    Date Dropdown
  </ix-menu-item>
</ix-menu>
```

### Breadcrumb Navigation Examples

```html
<!-- Basic Breadcrumb -->
<ix-breadcrumb>
  <ix-breadcrumb-item>Home</ix-breadcrumb-item>
  <ix-breadcrumb-item>Products</ix-breadcrumb-item>
  <ix-breadcrumb-item>Electronics</ix-breadcrumb-item>
  <ix-breadcrumb-item>Computers</ix-breadcrumb-item>
</ix-breadcrumb>

<!-- Interactive Breadcrumb with Icons -->
<ix-breadcrumb>
  <ix-breadcrumb-item (click)="navigateTo(i)">
    <ix-icon name="home"></ix-icon>
    {{ item.label }}
  </ix-breadcrumb-item>
</ix-breadcrumb>
```

### Workflow Steps Examples

```html
<!-- Basic Horizontal Workflow -->
<ix-workflow-steps>
  <ix-workflow-step>
    <ix-icon name="document" slot="icon"></ix-icon>
    Create Document
  </ix-workflow-step>
  <ix-workflow-step>
    <ix-icon name="info" slot="icon"></ix-icon>
    Review Content
  </ix-workflow-step>
  <ix-workflow-step status="active">
    <ix-icon name="cog" slot="icon"></ix-icon>
    Process
  </ix-workflow-step>
  <ix-workflow-step [disabled]="true">
    <ix-icon name="apps" slot="icon"></ix-icon>
    Publish
  </ix-workflow-step>
</ix-workflow-steps>
```

### Dynamic Tabs Implementation

```html
<!-- Dynamic Tab Management -->
<ix-tabs>
  <ix-tab-item *ngFor="let tab of tabs(); let i = index" [tabIcon]="tab.icon" (click)="selectTab(i)" [active]="selectedTab() === i"> {{ tab.label }} </ix-tab-item>
</ix-tabs>
```

### Tree Navigation Structure

```html
<!-- Hierarchical Tree -->
<ix-tree>
  <ix-tree-item *ngFor="let item of treeData()" [text]="item.label" [hasChildren]="item.children?.length > 0" (toggle)="onItemToggle(item)">
    <ix-icon [name]="item.icon" slot="icon"></ix-icon>
  </ix-tree-item>
</ix-tree>
```

## 🎨 CSS Architecture & BEM Methodology

The project uses **BEM** (Block, Element, Modifier) methodology for maintainable CSS organization across all components:

```scss
// Card List Component
.card-list {
  &__header {
    /* Element */
  }
  &__nav {
    /* Element */
  }
  &__viewport {
    /* Element */
  }
  &__nav--left {
    /* Modifier */
  }
  &__nav--right {
    /* Modifier */
  }
}

.card {
  &__content {
    /* Element */
  }
  &__thumbnail {
    /* Element */
  }
  &__image {
    /* Element */
  }
  &--video {
    /* Modifier */
  }
  &--link {
    /* Modifier */
  }
}

// Component Cards (used across all demos)
.demo-card {
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--theme-color-component-1);
  background: var(--theme-color-component-2);
  width: 100%;
  box-sizing: border-box;
}

// Responsive Design
@media (max-width: 767px) {
  .demo-card {
    padding: 1.5rem;
  }
}
```

## 🌈 Theme Configuration

The project supports official Siemens IX themes with easy switching:

- **Classic Light** - `theme-classic-light`
- **Classic Dark** - `theme-classic-dark` (default)

To change the theme, modify in `main.ts`:

```typescript
// For light theme
document.body.classList.add("theme-classic-light");

// For dark theme (default)
document.body.classList.add("theme-classic-dark");
```

All components automatically adapt to the selected theme using CSS custom properties.

## 📱 Responsive Features

All components are designed with responsive principles:

- **Flexible Layout**: Adapts to different screen sizes seamlessly
- **Collapsible Sidebar**: Mobile-friendly navigation menu
- **Touch-Friendly**: Optimized interactions for mobile devices
- **Responsive Cards**: Horizontal scroll and adaptive sizing
- **Dynamic Navigation**: Context-aware button positioning
- **Mobile Optimizations**:
  - Reduced padding on smaller screens
  - Touch-optimized button sizes
  - Improved scrolling behavior
  - Responsive typography

### Breakpoints Used

```scss
// Desktop first approach
@media (max-width: 767px) {
  /* Mobile styles */
}

@media (min-width: 768px) {
  /* Tablet and desktop styles */
}
```

## 🔧 Available Scripts

```bash
# Development
npm start               # Start development server (http://localhost:4200)
npm run build          # Build for production
npm run watch          # Build in watch mode for development

# Testing
npm test               # Run unit tests with Karma
npm run test:headless  # Run tests in headless mode (CI/CD)

# Code Quality
npm run lint           # Run ESLint for code quality checks
npm run lint:fix       # Automatically fix ESLint issues

# Siemens IX Specific
npm run serve          # Alternative to npm start
npm run build:prod     # Production build with optimizations
```

### Build Output

- **Development**: Served at `http://localhost:4200` with hot reload
- **Production**: Optimized bundle in `dist/` directory
- **Testing**: Karma test runner with coverage reports

## 📚 Useful Resources

### Siemens IX Documentation

- [Official Siemens IX Documentation](https://ix.siemens.io/) - Complete component library docs
- [Angular Integration Guide](https://ix.siemens.io/docs/angular/) - Angular-specific implementation
- [Component Examples](https://ix.siemens.io/docs/components/) - Live examples and API docs
- [Design System](https://ix.siemens.io/docs/design/) - Design principles and guidelines

### Angular Resources

- [Angular Documentation](https://angular.io/docs) - Official Angular documentation
- [Angular Signals](https://angular.io/guide/signals) - Reactive state management
- [Standalone Components](https://angular.io/guide/standalone-components) - Modern component architecture

### Development Best Practices

- [BEM Methodology](http://getbem.com/) - CSS architecture methodology
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [RxJS Documentation](https://rxjs.dev/) - Reactive programming library

### Icons and Assets

- [Siemens IX Icons](https://ix.siemens.io/docs/icons/) - Complete icon library
- [Icon Gallery](https://ix.siemens.io/docs/icons/gallery/) - Browse available icons

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
