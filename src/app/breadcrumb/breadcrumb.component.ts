import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

export interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container">
      <div class="component-header">
        <h1>Breadcrumb Component Examples</h1>
        <p>Navigate through different levels of hierarchy using breadcrumbs.</p>
      </div>

      <div class="examples-grid">
        <!-- Basic Breadcrumb -->
        <ix-card class="demo-card">
          <h3>Basic Breadcrumb</h3>
          <p>Simple breadcrumb navigation</p>

          <ix-breadcrumb>
            <ix-breadcrumb-item>Home</ix-breadcrumb-item>
            <ix-breadcrumb-item>Products</ix-breadcrumb-item>
            <ix-breadcrumb-item>Electronics</ix-breadcrumb-item>
            <ix-breadcrumb-item>Computers</ix-breadcrumb-item>
          </ix-breadcrumb>
        </ix-card>

        <!-- Interactive Breadcrumb -->
        <ix-card class="demo-card">
          <h3>Interactive Breadcrumb</h3>
          <p>Click on breadcrumb items to navigate</p>
          <p>Current path: {{ getCurrentPath() }}</p>

          <ix-breadcrumb>
            <ix-breadcrumb-item
              *ngFor="let item of breadcrumbItems(); let i = index"
              [class.active]="i === breadcrumbItems().length - 1"
              (click)="navigateTo(i)"
            >
              {{ item.label }}
            </ix-breadcrumb-item>
          </ix-breadcrumb>

          <div class="breadcrumb-controls">
            <ix-button
              variant="secondary"
              [disabled]="currentLevel() <= 1"
              (click)="goBack()"
            >
              <ix-icon name="arrow-left"></ix-icon>
              Back
            </ix-button>

            <ix-button
              variant="primary"
              [disabled]="currentLevel() >= maxLevel"
              (click)="goDeeper()"
            >
              Go Deeper
              <ix-icon name="arrow-right"></ix-icon>
            </ix-button>
          </div>
        </ix-card>

        <!-- Breadcrumb with Icons -->
        <ix-card class="demo-card">
          <h3>Breadcrumb with Icons</h3>
          <p>Enhanced breadcrumb with icons for better visual navigation</p>

          <ix-breadcrumb>
            <ix-breadcrumb-item>
              <ix-icon name="home"></ix-icon>
              Home
            </ix-breadcrumb-item>
            <ix-breadcrumb-item>
              <ix-icon name="apps"></ix-icon>
              Applications
            </ix-breadcrumb-item>
            <ix-breadcrumb-item>
              <ix-icon name="cog"></ix-icon>
              Settings
            </ix-breadcrumb-item>
            <ix-breadcrumb-item>
              <ix-icon name="info"></ix-icon>
              User Preferences
            </ix-breadcrumb-item>
          </ix-breadcrumb>
        </ix-card>

        <!-- Dynamic Breadcrumb -->
        <ix-card class="demo-card">
          <h3>Dynamic Breadcrumb</h3>
          <p>Add or remove breadcrumb levels dynamically</p>

          <ix-breadcrumb>
            <ix-breadcrumb-item
              *ngFor="
                let item of dynamicBreadcrumb();
                let i = index;
                let last = last
              "
              [class.active]="last"
            >
              <ix-icon [name]="item.icon || 'folder'"></ix-icon>
              {{ item.label }}
            </ix-breadcrumb-item>
          </ix-breadcrumb>

          <div class="breadcrumb-controls">
            <ix-button variant="outline" (click)="addLevel()">
              Add Level
            </ix-button>

            <ix-button
              variant="outline"
              [disabled]="dynamicBreadcrumb().length <= 1"
              (click)="removeLevel()"
            >
              Remove Level
            </ix-button>

            <ix-button variant="ghost" (click)="resetBreadcrumb()">
              Reset
            </ix-button>
          </div>
        </ix-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
      }

      .component-header {
        text-align: center;
        margin-bottom: 3rem;
      }

      .component-header h1 {
        color: var(--theme-color-primary);
        margin-bottom: 1rem;
      }

      .examples-grid {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .demo-card {
        padding: 2rem;
        border-radius: 8px;
        border: 1px solid var(--theme-color-component-1);
        background: var(--theme-color-component-2);
        width: 100%;
        box-sizing: border-box;
      }

      .demo-card h3 {
        margin: 0 0 1rem 0;
        color: var(--theme-color-primary);
      }

      .demo-card p {
        margin: 0 0 1.5rem 0;
        color: var(--theme-color-text-secondary);
      }

      /* Responsive design */
      @media (min-width: 768px) {
        .breadcrumb-controls {
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        /* Better spacing for larger screens */
        ix-breadcrumb-item {
          padding: 0.875rem 1.5rem;
          font-size: 1rem;
        }

        ix-breadcrumb {
          padding: 1.25rem 0;
        }
      }

      /* Mobile specific adjustments */
      @media (max-width: 767px) {
        .demo-card {
          padding: 1.5rem;
        }

        .container {
          padding: 1rem;
        }

        ix-breadcrumb {
          overflow-x: auto;
          scrollbar-width: thin;
          padding: 1rem 0;
        }

        ix-breadcrumb::-webkit-scrollbar {
          height: 6px;
        }

        ix-breadcrumb::-webkit-scrollbar-track {
          background: var(--theme-color-component-1);
          border-radius: 3px;
        }

        ix-breadcrumb::-webkit-scrollbar-thumb {
          background: var(--theme-color-primary);
          border-radius: 3px;
        }

        ix-breadcrumb-item {
          padding: 0.625rem 1rem;
          font-size: 0.9rem;
        }

        .breadcrumb-controls {
          gap: 0.75rem;
          margin-top: 1.5rem;
        }
      }

      /* Breadcrumb spacing improvements */
      ix-breadcrumb {
        margin: 1.5rem 0;
        display: block;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        padding: 1rem 0;
      }

      /* Breadcrumb item improvements */
      ix-breadcrumb-item {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        white-space: nowrap;
        min-width: fit-content;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      ix-breadcrumb-item:hover {
        background-color: var(--theme-color-component-1);
        text-decoration: none;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      /* Active breadcrumb item styling */
      ix-breadcrumb-item.active {
        color: var(--theme-color-primary);
        font-weight: 600;
        background-color: var(--theme-color-component-1);
      }

      /* Icon spacing within breadcrumb items */
      ix-breadcrumb-item ix-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        margin-right: 0.25rem;
      }

      /* Breadcrumb controls styling */
      .breadcrumb-controls {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }

      /* Remove problematic overflow rules */
    `,
  ],
})
export class BreadcrumbComponent {
  currentLevel = signal(3);
  maxLevel = 6;

  private allLevels: BreadcrumbItem[] = [
    { label: 'Home', icon: 'home' },
    { label: 'Projects', icon: 'apps' },
    { label: 'Web Applications', icon: 'document' },
    { label: 'Siemens IX Explorer', icon: 'cog' },
    { label: 'Components', icon: 'info' },
    { label: 'Breadcrumb Demo', icon: 'hierarchy' },
  ];

  breadcrumbItems = signal(this.allLevels.slice(0, this.currentLevel()));

  // Dynamic breadcrumb for the fourth example
  dynamicBreadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Root', icon: 'home' },
    { label: 'Documents', icon: 'document' },
    { label: 'Projects', icon: 'folder' },
  ]);

  getCurrentPath(): string {
    return this.breadcrumbItems()
      .map((item) => item.label)
      .join(' > ');
  }

  navigateTo(index: number) {
    this.currentLevel.set(index + 1);
    this.breadcrumbItems.set(this.allLevels.slice(0, this.currentLevel()));
  }

  goBack() {
    if (this.currentLevel() > 1) {
      this.currentLevel.set(this.currentLevel() - 1);
      this.breadcrumbItems.set(this.allLevels.slice(0, this.currentLevel()));
    }
  }

  goDeeper() {
    if (this.currentLevel() < this.maxLevel) {
      this.currentLevel.set(this.currentLevel() + 1);
      this.breadcrumbItems.set(this.allLevels.slice(0, this.currentLevel()));
    }
  }

  addLevel() {
    const current = this.dynamicBreadcrumb();
    const newLevel: BreadcrumbItem = {
      label: `Level ${current.length + 1}`,
      icon: 'folder',
    };
    this.dynamicBreadcrumb.set([...current, newLevel]);
  }

  removeLevel() {
    const current = this.dynamicBreadcrumb();
    if (current.length > 1) {
      this.dynamicBreadcrumb.set(current.slice(0, -1));
    }
  }

  resetBreadcrumb() {
    this.currentLevel.set(3);
    this.breadcrumbItems.set(this.allLevels.slice(0, 3));
    this.dynamicBreadcrumb.set([
      { label: 'Root', icon: 'home' },
      { label: 'Documents', icon: 'document' },
      { label: 'Projects', icon: 'folder' },
    ]);
  }
}
