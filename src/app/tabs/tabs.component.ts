import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

interface TabData {
  id: string;
  label: string;
  icon?: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, IxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="tabs-demo">
      <div class="tabs-demo__header">
        <h1>Tabs Examples</h1>
        <p>Organize content into different sections using tabs.</p>
      </div>

      <div class="tabs-demo__content">
        <!-- Basic Tabs -->
        <ix-card class="demo-card">
          <h3>Basic Tabs</h3>
          <ix-tabs
            [selected]="basicSelectedTab()"
            (selectedChange)="onBasicTabChange($event)"
          >
            <ix-tab-item tab-id="tab1">Overview</ix-tab-item>
            <ix-tab-item tab-id="tab2">Details</ix-tab-item>
            <ix-tab-item tab-id="tab3">Settings</ix-tab-item>
            <ix-tab-item tab-id="tab4">Help</ix-tab-item>
          </ix-tabs>

          <div class="tab-content">
            <div *ngIf="basicSelectedTab() === 'tab1'" class="tab-panel">
              <h4>Overview</h4>
              <p>
                This is the overview panel. Here you can see a summary of all
                important information.
              </p>
              <ul>
                <li>Total items: 42</li>
                <li>Active users: 156</li>
                <li>Last update: Today</li>
              </ul>
            </div>

            <div *ngIf="basicSelectedTab() === 'tab2'" class="tab-panel">
              <h4>Details</h4>
              <p>Detailed information about the current selection.</p>
              <ix-group header="System Information">
                <p><strong>Version:</strong> 3.2.0</p>
                <p><strong>Build:</strong> 2024.08.12</p>
                <p><strong>Environment:</strong> Production</p>
              </ix-group>
            </div>

            <div *ngIf="basicSelectedTab() === 'tab3'" class="tab-panel">
              <h4>Settings</h4>
              <p>Configure your preferences here.</p>
              <ix-toggle
                [checked]="autoSave()"
                (checkedChange)="onAutoSaveToggle($event)"
              >
                Auto-save changes
              </ix-toggle>
              <br /><br />
              <ix-toggle
                [checked]="showNotifications()"
                (checkedChange)="onNotificationsToggle($event)"
              >
                Show notifications
              </ix-toggle>
            </div>

            <div *ngIf="basicSelectedTab() === 'tab4'" class="tab-panel">
              <h4>Help</h4>
              <p>Get help and support.</p>
              <ix-button variant="outline" size="small">
                <ix-icon name="info"></ix-icon>
                Documentation
              </ix-button>
              <br /><br />
              <ix-button variant="outline" size="small">
                Contact Support
              </ix-button>
            </div>
          </div>
        </ix-card>

        <!-- Tabs with Icons -->
        <ix-card class="demo-card">
          <h3>Tabs with Icons</h3>
          <ix-tabs
            [selected]="iconSelectedTab()"
            (selectedChange)="onIconTabChange($event)"
          >
            <ix-tab-item tab-id="home">
              <ix-icon name="home"></ix-icon>
              Home
            </ix-tab-item>
            <ix-tab-item tab-id="apps">
              <ix-icon name="apps"></ix-icon>
              Applications
            </ix-tab-item>
            <ix-tab-item tab-id="settings">
              <ix-icon name="cog"></ix-icon>
              Settings
            </ix-tab-item>
            <ix-tab-item tab-id="info">
              <ix-icon name="info"></ix-icon>
              Information
            </ix-tab-item>
          </ix-tabs>

          <div class="tab-content">
            <div *ngIf="iconSelectedTab() === 'home'" class="tab-panel">
              <h4><ix-icon name="home"></ix-icon> Home Dashboard</h4>
              <p>Welcome to your dashboard. Here's what's happening:</p>
              <div class="dashboard-grid">
                <div class="dashboard-item">
                  <h5>Recent Activity</h5>
                  <p>5 new notifications</p>
                </div>
                <div class="dashboard-item">
                  <h5>Quick Actions</h5>
                  <p>Create new project</p>
                </div>
              </div>
            </div>

            <div *ngIf="iconSelectedTab() === 'apps'" class="tab-panel">
              <h4><ix-icon name="apps"></ix-icon> Applications</h4>
              <p>Manage your applications and services.</p>
              <div class="app-list">
                <div class="app-item">
                  <ix-icon name="document"></ix-icon>
                  <span>Document Editor</span>
                </div>
                <div class="app-item">
                  <ix-icon name="calendar"></ix-icon>
                  <span>Calendar</span>
                </div>
              </div>
            </div>

            <div *ngIf="iconSelectedTab() === 'settings'" class="tab-panel">
              <h4><ix-icon name="cog"></ix-icon> System Settings</h4>
              <p>Configure system preferences.</p>
              <ix-select
                [value]="theme()"
                (valueChange)="onThemeChange($event)"
              >
                <ix-select-item value="light">Light Theme</ix-select-item>
                <ix-select-item value="dark">Dark Theme</ix-select-item>
                <ix-select-item value="auto">Auto</ix-select-item>
              </ix-select>
            </div>

            <div *ngIf="iconSelectedTab() === 'info'" class="tab-panel">
              <h4><ix-icon name="info"></ix-icon> System Information</h4>
              <p>View system status and information.</p>
              <ix-group header="Status">
                <p>
                  <strong>Status:</strong> <span class="status-ok">Online</span>
                </p>
                <p><strong>Uptime:</strong> 99.9%</p>
                <p><strong>Memory Usage:</strong> 65%</p>
              </ix-group>
            </div>
          </div>
        </ix-card>

        <!-- Dynamic Tabs -->
        <ix-card class="demo-card">
          <h3>Dynamic Tabs</h3>
          <div class="tab-controls">
            <ix-button variant="primary" size="small" (click)="addTab()">
              Add Tab
            </ix-button>
            <ix-button
              variant="secondary"
              size="small"
              [disabled]="dynamicTabs().length <= 1"
              (click)="removeTab()"
            >
              Remove Tab
            </ix-button>
          </div>

          <ix-tabs
            [selected]="dynamicSelectedTab()"
            (selectedChange)="onDynamicTabChange($event)"
          >
            <ix-tab-item
              *ngFor="let tab of dynamicTabs()"
              [tab-id]="tab.id"
              [disabled]="tab.disabled"
            >
              {{ tab.label }}
            </ix-tab-item>
          </ix-tabs>

          <div class="tab-content">
            <div *ngFor="let tab of dynamicTabs()" class="tab-panel">
              <div *ngIf="dynamicSelectedTab() === tab.id">
                <h4>{{ tab.label }}</h4>
                <p>{{ tab.content }}</p>
                <ix-button
                  variant="outline"
                  size="small"
                  [disabled]="tab.disabled"
                  (click)="toggleTabState(tab.id)"
                >
                  {{ tab.disabled ? 'Enable' : 'Disable' }} Tab
                </ix-button>
              </div>
            </div>
          </div>
        </ix-card>
      </div>
    </div>
  `,
  styles: [
    `
      .tabs-demo {
        padding: 1.5rem;
        max-width: 1200px;
        margin: 0 auto;

        &__header {
          margin-bottom: 2rem;

          h1 {
            color: var(--ix-color-primary);
            margin-bottom: 0.5rem;
          }

          p {
            color: var(--ix-color-text-secondary);
            margin: 0;
          }
        }

        &__content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
      }

      .demo-card {
        padding: 2rem;
        width: 100%;
        box-sizing: border-box;

        h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--ix-color-primary);
          font-size: 1.25rem;
        }
      }

      .tab-content {
        margin-top: 1.5rem;
        padding: 1rem 0;
      }

      .tab-panel {
        padding: 1rem;
        background: var(--ix-color-surface-variant);
        border-radius: 4px;
        margin: 0.5rem 0;

        h4 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--ix-color-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
        }

        p {
          margin-bottom: 1.5rem;
          line-height: 1.6;
          font-size: 1rem;
        }

        ul {
          margin: 1.5rem 0;
          padding-left: 2rem;

          li {
            margin-bottom: 0.75rem;
            line-height: 1.5;
          }
        }

        ix-group {
          margin: 1.5rem 0;
        }

        ix-toggle {
          margin: 1rem 0;
        }

        ix-button {
          margin: 0.5rem 0.5rem 0.5rem 0;
        }
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .dashboard-item {
        padding: 1.5rem;
        border: 1px solid var(--ix-color-neutral-30);
        border-radius: 6px;
        background: var(--ix-color-surface);

        h5 {
          margin: 0 0 1rem 0;
          color: var(--ix-color-primary);
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: var(--ix-color-text-secondary);
          font-size: 1rem;
        }
      }

      .app-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1.5rem;
        max-width: 500px;
      }

      .app-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border: 1px solid var(--ix-color-neutral-30);
        border-radius: 6px;
        background: var(--ix-color-surface);
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background: var(--ix-color-surface-variant);
        }

        span {
          font-weight: 500;
          font-size: 1rem;
        }
      }

      .status-ok {
        color: var(--ix-color-success);
        font-weight: 600;
      }

      .tab-controls {
        margin-bottom: 1.5rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 1rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;
      }

      ix-select {
        min-width: 200px;
        margin: 1rem 0;
      }

      ix-group {
        margin: 1.5rem 0;

        p {
          margin: 0.75rem 0;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class TabsComponent {
  // Basic tabs
  basicSelectedTab = signal('tab1');
  autoSave = signal(true);
  showNotifications = signal(false);

  // Icon tabs
  iconSelectedTab = signal('home');
  theme = signal('dark');

  // Dynamic tabs
  dynamicSelectedTab = signal('dynamic-1');
  private tabCounter = 3;

  dynamicTabs = signal<TabData[]>([
    {
      id: 'dynamic-1',
      label: 'Tab 1',
      content: 'This is the content of the first dynamic tab.',
    },
    {
      id: 'dynamic-2',
      label: 'Tab 2',
      content: 'This is the content of the second dynamic tab.',
    },
    {
      id: 'dynamic-3',
      label: 'Tab 3',
      content: 'This is the content of the third dynamic tab.',
    },
  ]);

  onBasicTabChange(event: any) {
    this.basicSelectedTab.set(event.detail);
  }

  onIconTabChange(event: any) {
    this.iconSelectedTab.set(event.detail);
  }

  onDynamicTabChange(event: any) {
    this.dynamicSelectedTab.set(event.detail);
  }

  onAutoSaveToggle(event: any) {
    this.autoSave.set(event.detail);
  }

  onNotificationsToggle(event: any) {
    this.showNotifications.set(event.detail);
  }

  onThemeChange(event: any) {
    this.theme.set(event.detail);
  }

  addTab() {
    this.tabCounter++;
    const newTab: TabData = {
      id: `dynamic-${this.tabCounter}`,
      label: `Tab ${this.tabCounter}`,
      content: `This is the content of tab ${this.tabCounter}. It was added dynamically!`,
    };

    const current = this.dynamicTabs();
    this.dynamicTabs.set([...current, newTab]);
    this.dynamicSelectedTab.set(newTab.id);
  }

  removeTab() {
    const current = this.dynamicTabs();
    if (current.length > 1) {
      const lastTab = current[current.length - 1];
      const updated = current.slice(0, -1);
      this.dynamicTabs.set(updated);

      // If we removed the selected tab, select the last remaining tab
      if (this.dynamicSelectedTab() === lastTab.id) {
        this.dynamicSelectedTab.set(updated[updated.length - 1].id);
      }
    }
  }

  toggleTabState(tabId: string) {
    const current = this.dynamicTabs();
    const updated = current.map((tab) =>
      tab.id === tabId ? { ...tab, disabled: !tab.disabled } : tab
    );
    this.dynamicTabs.set(updated);
  }
}
