import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="container">
      <div class="component-header">
        <h1>Workflow Component Examples</h1>
        <p>
          Demonstrates different configurations of the ix-workflow-steps
          component.
        </p>
      </div>

      <div class="examples-grid">
        <!-- Basic Workflow -->
        <ix-card class="demo-card">
          <h3>Basic Horizontal Workflow</h3>
          <p>A basic workflow with horizontal steps layout</p>

          <ix-workflow-steps>
            <ix-workflow-step>
              <ix-icon name="document" slot="icon"></ix-icon>
              Create Document
            </ix-workflow-step>

            <ix-workflow-step>
              <ix-icon name="info" slot="icon"></ix-icon>
              Review Content
            </ix-workflow-step>

            <ix-workflow-step [disabled]="true">
              <ix-icon name="cog" slot="icon"></ix-icon>
              Process
            </ix-workflow-step>

            <ix-workflow-step [disabled]="true">
              <ix-icon name="apps" slot="icon"></ix-icon>
              Publish
            </ix-workflow-step>
          </ix-workflow-steps>
        </ix-card>

        <!-- Interactive Workflow -->
        <ix-card class="demo-card">
          <h3>Interactive Workflow</h3>
          <p>Click "Next" to progress through the workflow steps</p>
          <p>
            Current step: {{ interactiveStep() + 1 }} of
            {{ workflowLabels.length }}
          </p>

          <ix-workflow-steps>
            <ix-workflow-step
              *ngFor="let label of workflowLabels; let i = index"
              [disabled]="i > interactiveStep()"
              [status]="getStepStatus(i)"
            >
              <ix-icon [name]="getStepIcon(i)" slot="icon"></ix-icon>
              {{ label }}
            </ix-workflow-step>
          </ix-workflow-steps>

          <div class="workflow-controls">
            <ix-button
              variant="secondary"
              [disabled]="interactiveStep() === 0"
              (click)="previousStep()"
            >
              Previous
            </ix-button>

            <ix-button
              variant="primary"
              [disabled]="interactiveStep() >= workflowLabels.length - 1"
              (click)="nextStep()"
            >
              Next
            </ix-button>

            <ix-button variant="ghost" (click)="resetWorkflow()">
              Reset
            </ix-button>
          </div>
        </ix-card>

        <!-- Form Integration Workflow -->
        <ix-card class="demo-card">
          <h3>Form Integration Workflow</h3>
          <p>Workflow integrated with form validation</p>

          <ix-workflow-steps>
            <ix-workflow-step [disabled]="formStep() < 0">
              <ix-icon name="user" slot="icon"></ix-icon>
              Personal Info
            </ix-workflow-step>

            <ix-workflow-step [disabled]="formStep() < 1">
              <ix-icon name="bookmark" slot="icon"></ix-icon>
              Details
            </ix-workflow-step>

            <ix-workflow-step [disabled]="formStep() < 2">
              <ix-icon name="hierarchy" slot="icon"></ix-icon>
              Review
            </ix-workflow-step>

            <ix-workflow-step [disabled]="formStep() < 3">
              <ix-icon name="apps" slot="icon"></ix-icon>
              Complete
            </ix-workflow-step>
          </ix-workflow-steps>

          <div class="form-section">
            <div *ngIf="formStep() === 0">
              <h4>Step 1: Personal Information</h4>
              <ix-input placeholder="First Name" class="form-input"></ix-input>
              <ix-input placeholder="Last Name" class="form-input"></ix-input>
            </div>

            <div *ngIf="formStep() === 1">
              <h4>Step 2: Additional Details</h4>
              <ix-input
                placeholder="Email"
                type="email"
                class="form-input"
              ></ix-input>
              <ix-input placeholder="Phone" class="form-input"></ix-input>
            </div>

            <div *ngIf="formStep() === 2">
              <h4>Step 3: Review Your Information</h4>
              <p>Please review all information before submitting</p>
            </div>

            <div *ngIf="formStep() === 3">
              <h4>Step 4: Form Completed!</h4>
              <p>Your information has been processed successfully</p>
            </div>
          </div>

          <div class="workflow-controls">
            <ix-button
              variant="secondary"
              [disabled]="formStep() === 0"
              (click)="previousFormStep()"
            >
              Previous
            </ix-button>

            <ix-button
              variant="primary"
              [disabled]="formStep() >= 3"
              (click)="nextFormStep()"
            >
              Next
            </ix-button>

            <ix-button variant="ghost" (click)="resetForm()">
              Reset Form
            </ix-button>
          </div>
        </ix-card>

        <!-- Status Workflow -->
        <ix-card class="demo-card">
          <h3>Status-based Workflow</h3>
          <p>Workflow with different step statuses</p>

          <ix-workflow-steps>
            <ix-workflow-step status="done">
              <ix-icon name="apps" slot="icon"></ix-icon>
              Planning
            </ix-workflow-step>

            <ix-workflow-step status="active">
              <ix-icon name="cog" slot="icon"></ix-icon>
              Development
            </ix-workflow-step>

            <ix-workflow-step status="waiting">
              <ix-icon name="hierarchy" slot="icon"></ix-icon>
              Testing
            </ix-workflow-step>

            <ix-workflow-step status="error">
              <ix-icon name="close" slot="icon"></ix-icon>
              Deployment
            </ix-workflow-step>
          </ix-workflow-steps>

          <div class="status-info">
            <p><strong>Legend:</strong></p>
            <ul>
              <li>✅ Done: Planning phase finished</li>
              <li>🔄 Active: Currently in development</li>
              <li>⏳ Waiting: Testing phase waiting</li>
              <li>❌ Error: Deployment failed</li>
            </ul>
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

      .form-section {
        margin: 2rem 0;
        padding: 1.5rem;
        border-radius: 4px;
        background: var(--theme-color-component-1);
      }

      .form-section h4 {
        margin: 0 0 1rem 0;
        color: var(--theme-color-primary);
      }

      .form-input {
        display: block;
        width: 100%;
        margin-bottom: 1rem;
      }

      .status-info {
        margin-top: 2rem;
        padding: 1rem;
        background: var(--theme-color-component-1);
        border-radius: 4px;
      }

      .status-info ul {
        margin: 0.5rem 0 0 0;
        padding-left: 1.5rem;
      }

      .status-info li {
        margin-bottom: 0.5rem;
        color: var(--theme-color-text-secondary);
      }

      /* Responsive design */
      @media (min-width: 768px) {
        .workflow-controls {
          flex-wrap: nowrap;
          justify-content: flex-start;
        }

        ix-workflow-steps {
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

        .workflow-controls {
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        ix-workflow-steps {
          padding: 1rem 0;
        }
      }

      /* Workflow step spacing */
      ix-workflow-steps {
        margin: 1.5rem 0;
        display: block;
        width: 100%;
        padding: 1rem 0;
      }

      /* Workflow controls styling */
      .workflow-controls {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
      }

      /* Remove problematic layout rules */
    `,
  ],
})
export class WorkflowComponent {
  // Interactive workflow state
  interactiveStep = signal(0);
  workflowLabels = [
    'Setup',
    'Configuration',
    'Testing',
    'Deployment',
    'Monitoring',
  ];

  // Form workflow state
  formStep = signal(0);

  // Interactive workflow methods
  nextStep() {
    if (this.interactiveStep() < this.workflowLabels.length - 1) {
      this.interactiveStep.update((step) => step + 1);
    }
  }

  previousStep() {
    if (this.interactiveStep() > 0) {
      this.interactiveStep.update((step) => step - 1);
    }
  }

  resetWorkflow() {
    this.interactiveStep.set(0);
  }

  getStepStatus(index: number): string {
    const current = this.interactiveStep();
    if (index < current) return 'done';
    if (index === current) return 'active';
    return 'waiting';
  }

  getStepIcon(index: number): string {
    const icons = ['cog', 'hierarchy', 'calendar', 'apps', 'bookmark'];
    return icons[index] || 'info';
  }

  // Form workflow methods
  nextFormStep() {
    if (this.formStep() < 3) {
      this.formStep.update((step) => step + 1);
    }
  }

  previousFormStep() {
    if (this.formStep() > 0) {
      this.formStep.update((step) => step - 1);
    }
  }

  resetForm() {
    this.formStep.set(0);
  }
}
