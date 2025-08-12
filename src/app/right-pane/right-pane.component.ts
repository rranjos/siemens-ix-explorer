import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-right-pane',
  standalone: true,
  imports: [CommonModule, IxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="right-pane">
      <div class="right-pane__header">
        <h1>Right Pane Example</h1>
        <p>
          This example demonstrates a side panel using Siemens IX layout
          components.
        </p>
      </div>

      <div class="right-pane__content">
        <ix-button
          variant="primary"
          (click)="togglePane()"
          class="right-pane__trigger"
        >
          {{ isPaneOpen() ? 'Close' : 'Open' }} Right Panel
        </ix-button>

        <div
          class="layout-container"
          [class.layout-container--pane-open]="isPaneOpen()"
        >
          <!-- Main Content Area -->
          <div class="main-content">
            <ix-card class="content-card">
              <h3>Main Content Area</h3>
              <p>
                This is the main content area. Click the button above to open
                the right panel.
              </p>
              <p>The right panel is useful for:</p>
              <ul>
                <li>Additional details</li>
                <li>Configuration panels</li>
                <li>Secondary information</li>
                <li>Context-sensitive help</li>
              </ul>

              <h4>Sample Content</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <ix-group header="Main Actions">
                <ix-button variant="outline" size="small">Action 1</ix-button>
                <ix-button variant="outline" size="small">Action 2</ix-button>
                <ix-button variant="outline" size="small">Action 3</ix-button>
              </ix-group>
            </ix-card>
          </div>

          <!-- Right Panel -->
          <div class="side-panel" [class.side-panel--open]="isPaneOpen()">
            <div class="side-panel__header">
              <h3>Settings Panel</h3>
              <ix-button
                variant="ghost"
                size="small"
                (click)="closePane()"
                class="side-panel__close"
              >
                <ix-icon name="close"></ix-icon>
              </ix-button>
            </div>

            <div class="side-panel__content">
              <h4>Configuration Options</h4>

              <ix-group header="Display Settings">
                <div class="setting-item">
                  <ix-toggle
                    [checked]="showAdvanced()"
                    (checkedChange)="onAdvancedToggle($event)"
                  >
                    Show Advanced Options
                  </ix-toggle>
                </div>

                <div class="setting-item">
                  <ix-toggle
                    [checked]="enableNotifications()"
                    (checkedChange)="onNotificationsToggle($event)"
                  >
                    Enable Notifications
                  </ix-toggle>
                </div>
              </ix-group>

              <ix-group header="Theme Settings">
                <ix-select
                  [value]="selectedTheme()"
                  (valueChange)="onThemeChange($event)"
                  label="Theme"
                >
                  <ix-select-item value="light">Light Theme</ix-select-item>
                  <ix-select-item value="dark">Dark Theme</ix-select-item>
                  <ix-select-item value="auto">Auto</ix-select-item>
                </ix-select>
              </ix-group>

              <ix-group header="Advanced Options" *ngIf="showAdvanced()">
                <div class="setting-item">
                  <ix-toggle
                    [checked]="debugMode()"
                    (checkedChange)="onDebugModeToggle($event)"
                  >
                    Debug Mode
                  </ix-toggle>
                </div>

                <div class="setting-item">
                  <ix-input
                    label="API Endpoint"
                    [value]="apiEndpoint()"
                    (valueChange)="onApiEndpointChange($event)"
                  >
                  </ix-input>
                </div>
              </ix-group>

              <div class="panel-actions">
                <ix-button variant="primary" (click)="saveSettings()">
                  Save Settings
                </ix-button>
                <ix-button variant="secondary" (click)="resetSettings()">
                  Reset
                </ix-button>
              </div>
            </div>
          </div>

          <!-- Overlay -->
          <div
            class="panel-overlay"
            [class.panel-overlay--visible]="isPaneOpen()"
            (click)="closePane()"
          ></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .right-pane {
        padding: 1.5rem;
        height: 100vh;
        overflow: hidden;

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
          height: calc(100vh - 150px);
        }

        &__trigger {
          margin-bottom: 1.5rem;
          z-index: 1001;
          position: relative;
        }
      }

      .layout-container {
        position: relative;
        display: flex;
        height: 100%;
        overflow: hidden;

        &--pane-open {
          .main-content {
            margin-right: 320px;
            transition: margin-right 0.3s ease;
          }
        }
      }

      .main-content {
        flex: 1;
        padding-right: 0;
        transition: margin-right 0.3s ease;
        overflow-y: auto;

        .content-card {
          padding: 1.5rem;
          height: fit-content;

          h3 {
            margin-top: 0;
            color: var(--ix-color-primary);
          }

          h4 {
            color: var(--ix-color-primary);
            margin-top: 1.5rem;
          }

          ul {
            margin: 1rem 0;
            padding-left: 1.5rem;

            li {
              margin-bottom: 0.5rem;
            }
          }

          ix-group {
            margin-top: 1.5rem;
          }
        }
      }

      .side-panel {
        position: fixed;
        top: 0;
        right: -320px;
        width: 320px;
        height: 100vh;
        background: var(--ix-color-surface);
        border-left: 1px solid var(--ix-color-border);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        transition: right 0.3s ease;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);

        &--open {
          right: 0;
        }

        &__header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--ix-color-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--ix-color-surface-variant);

          h3 {
            margin: 0;
            color: var(--ix-color-primary);
          }

          .side-panel__close {
            padding: 0.25rem;
          }
        }

        &__content {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;

          h4 {
            margin-top: 0;
            margin-bottom: 1.5rem;
            color: var(--ix-color-primary);
          }

          ix-group {
            margin-bottom: 1.5rem;
          }

          .setting-item {
            margin-bottom: 1rem;
          }

          .panel-actions {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--ix-color-border);
            display: flex;
            gap: 0.75rem;

            ix-button {
              flex: 1;
            }
          }
        }
      }

      .panel-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;

        &--visible {
          opacity: 1;
          visibility: visible;
        }
      }

      @media (max-width: 768px) {
        .layout-container--pane-open .main-content {
          margin-right: 0;
        }

        .side-panel {
          width: 100vw;
          right: -100vw;

          &--open {
            right: 0;
          }
        }
      }
    `,
  ],
})
export class RightPaneComponent {
  isPaneOpen = signal(false);
  showAdvanced = signal(false);
  enableNotifications = signal(true);
  selectedTheme = signal('dark');
  debugMode = signal(false);
  apiEndpoint = signal('https://api.example.com');

  togglePane() {
    this.isPaneOpen.set(!this.isPaneOpen());
  }

  closePane() {
    this.isPaneOpen.set(false);
  }

  onAdvancedToggle(event: any) {
    this.showAdvanced.set(event.detail);
  }

  onNotificationsToggle(event: any) {
    this.enableNotifications.set(event.detail);
  }

  onThemeChange(event: any) {
    this.selectedTheme.set(event.detail);
  }

  onDebugModeToggle(event: any) {
    this.debugMode.set(event.detail);
  }

  onApiEndpointChange(event: any) {
    this.apiEndpoint.set(event.detail);
  }

  saveSettings() {
    console.log('Settings saved:', {
      showAdvanced: this.showAdvanced(),
      enableNotifications: this.enableNotifications(),
      selectedTheme: this.selectedTheme(),
      debugMode: this.debugMode(),
      apiEndpoint: this.apiEndpoint(),
    });
    // Here you would typically save to a service
    this.closePane();
  }

  resetSettings() {
    this.showAdvanced.set(false);
    this.enableNotifications.set(true);
    this.selectedTheme.set('dark');
    this.debugMode.set(false);
    this.apiEndpoint.set('https://api.example.com');
  }
}
