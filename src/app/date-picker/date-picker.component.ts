import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, IxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="date-picker-demo">
      <div class="date-picker-demo__header">
        <h1>Date Picker Examples</h1>
        <p>
          Select dates and date ranges using various date picker configurations.
        </p>
      </div>

      <div class="date-picker-demo__content">
        <!-- Basic Date Picker -->
        <ix-card class="demo-card">
          <h3>Basic Date Picker</h3>
          <p>Selected date: {{ formatDisplayDate(basicDate()) || 'None' }}</p>

          <ix-input
            type="date"
            label="Select Date"
            [value]="basicDate()"
            (valueChange)="onBasicDateChange($event)"
          >
          </ix-input>

          <div class="date-actions">
            <ix-button variant="outline" size="small" (click)="setToday()">
              Today
            </ix-button>
            <ix-button
              variant="outline"
              size="small"
              (click)="clearBasicDate()"
            >
              Clear
            </ix-button>
          </div>
        </ix-card>

        <!-- Date Range Picker -->
        <ix-card class="demo-card">
          <h3>Date Range Picker</h3>
          <p>Range: {{ getDateRangeText() }}</p>

          <div class="date-range-inputs">
            <ix-input
              type="date"
              label="From Date"
              [value]="rangeFrom()"
              (valueChange)="onRangeFromChange($event)"
            >
            </ix-input>

            <ix-input
              type="date"
              label="To Date"
              [value]="rangeTo()"
              [min]="rangeFrom() || undefined"
              (valueChange)="onRangeToChange($event)"
            >
            </ix-input>
          </div>

          <div class="date-actions">
            <ix-button variant="outline" size="small" (click)="setThisWeek()">
              This Week
            </ix-button>
            <ix-button variant="outline" size="small" (click)="setThisMonth()">
              This Month
            </ix-button>
            <ix-button
              variant="outline"
              size="small"
              (click)="clearDateRange()"
            >
              Clear Range
            </ix-button>
          </div>
        </ix-card>

        <!-- Date Picker with Constraints -->
        <ix-card class="demo-card">
          <h3>Date Picker with Constraints</h3>
          <p>Only future dates allowed (min: today)</p>
          <p>Selected: {{ formatDisplayDate(constrainedDate()) || 'None' }}</p>

          <ix-input
            type="date"
            label="Select Future Date"
            [value]="constrainedDate()"
            [min]="today"
            [max]="maxDate"
            (valueChange)="onConstrainedDateChange($event)"
          >
          </ix-input>

          <div class="constraint-info">
            <p><strong>Min date:</strong> {{ formatDisplayDate(today) }}</p>
            <p><strong>Max date:</strong> {{ formatDisplayDate(maxDate) }}</p>
          </div>
        </ix-card>

        <!-- Custom Date Formats -->
        <ix-card class="demo-card">
          <h3>Date Input Examples</h3>

          <div class="format-examples">
            <div class="format-item">
              <label>Standard Date Input:</label>
              <ix-input
                type="date"
                label="Date (YYYY-MM-DD)"
                [value]="isoDate()"
                (valueChange)="onIsoDateChange($event)"
              >
              </ix-input>
              <small>Value: {{ isoDate() || 'Not set' }}</small>
              <small
                >Formatted:
                {{ formatDisplayDate(isoDate()) || 'Not set' }}</small
              >
            </div>

            <div class="format-item">
              <label>Date with Time:</label>
              <ix-input
                type="datetime-local"
                label="Date and Time"
                [value]="datetimeDate()"
                (valueChange)="onDatetimeChange($event)"
              >
              </ix-input>
              <small>Value: {{ datetimeDate() || 'Not set' }}</small>
              <small
                >Formatted:
                {{ formatDateTime(datetimeDate()) || 'Not set' }}</small
              >
            </div>

            <div class="format-item">
              <label>Month Picker:</label>
              <ix-input
                type="month"
                label="Select Month"
                [value]="monthDate()"
                (valueChange)="onMonthChange($event)"
              >
              </ix-input>
              <small>Value: {{ monthDate() || 'Not set' }}</small>
              <small
                >Formatted: {{ formatMonth(monthDate()) || 'Not set' }}</small
              >
            </div>
          </div>
        </ix-card>

        <!-- Date Picker with Input -->
        <ix-card class="demo-card">
          <h3>Manual Date Input</h3>
          <p>Type date manually or use the date picker widget</p>

          <div class="input-group">
            <ix-input
              label="Manual Date Entry"
              [value]="inputDate()"
              placeholder="YYYY-MM-DD"
              (valueChange)="onInputDateChange($event)"
            >
            </ix-input>

            <ix-input
              type="date"
              label="Date Picker"
              [value]="inputDate()"
              (valueChange)="onInputDateChange($event)"
            >
            </ix-input>
          </div>

          <p class="input-result">
            Parsed date:
            {{ formatDisplayDate(inputDate()) || 'Invalid or empty' }}
          </p>

          <div class="validation-info">
            <p>
              <strong>Status:</strong>
              <span
                [class]="
                  isValidDate(inputDate()) ? 'status-valid' : 'status-invalid'
                "
              >
                {{
                  isValidDate(inputDate())
                    ? 'Valid date'
                    : 'Invalid date format'
                }}
              </span>
            </p>
          </div>
        </ix-card>

        <!-- Multiple Date Selection -->
        <ix-card class="demo-card">
          <h3>Multiple Date Selection</h3>
          <p>Selected dates ({{ selectedDates().length }}):</p>

          <div class="selected-dates">
            <ix-chip
              *ngFor="let date of selectedDates()"
              [closable]="true"
              (closeClick)="removeDate(date)"
            >
              {{ formatDisplayDate(date) }}
            </ix-chip>
            <span *ngIf="selectedDates().length === 0" class="empty-message">
              No dates selected. Pick a date below to add it.
            </span>
          </div>

          <ix-input
            type="date"
            label="Add Date to Selection"
            [value]="multiDate()"
            (valueChange)="onMultiDateChange($event)"
          >
          </ix-input>

          <div class="multi-actions">
            <ix-button variant="outline" size="small" (click)="clearAllDates()">
              Clear All
            </ix-button>
            <ix-button variant="outline" size="small" (click)="addWorkdays()">
              Add This Week (Workdays)
            </ix-button>
            <ix-button
              variant="outline"
              size="small"
              (click)="addSampleDates()"
            >
              Add Sample Dates
            </ix-button>
          </div>
        </ix-card>

        <!-- Date Picker States -->
        <ix-card class="demo-card">
          <h3>Date Input States</h3>

          <div class="state-examples">
            <div class="state-item">
              <label>Normal:</label>
              <ix-input
                type="date"
                [value]="normalStateDate()"
                (valueChange)="onNormalStateChange($event)"
              >
              </ix-input>
            </div>

            <div class="state-item">
              <label>Disabled:</label>
              <ix-input type="date" [disabled]="true" [value]="disabledDate">
              </ix-input>
            </div>

            <div class="state-item">
              <label>Read-only:</label>
              <ix-input type="date" [readonly]="true" [value]="readonlyDate">
              </ix-input>
            </div>
          </div>
        </ix-card>

        <!-- Date Validation -->
        <ix-card class="demo-card">
          <h3>Date Validation</h3>

          <div class="validation-form">
            <ix-input
              type="date"
              label="Select Date (Business Rules Applied)"
              [value]="validationDate()"
              (valueChange)="onValidationDateChange($event)"
            >
            </ix-input>

            <div class="validation-messages">
              <div
                *ngIf="validationErrors().length > 0"
                class="validation-error"
              >
                <ix-icon name="close"></ix-icon>
                <ul>
                  <li *ngFor="let error of validationErrors()">{{ error }}</li>
                </ul>
              </div>

              <div
                *ngIf="validationDate() && validationErrors().length === 0"
                class="validation-success"
              >
                <ix-icon name="apps"></ix-icon>
                Date is valid!
              </div>
            </div>

            <ix-button
              variant="primary"
              [disabled]="validationErrors().length > 0 || !validationDate()"
              (click)="submitValidation()"
            >
              Submit Date
            </ix-button>
          </div>
        </ix-card>
      </div>
    </div>
  `,
  styles: [
    `
      .date-picker-demo {
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

        p {
          margin-bottom: 1.5rem;
          color: var(--ix-color-text-secondary);
          font-size: 1rem;
        }

        ix-input {
          width: 100%;
          max-width: 300px;
        }
      }

      .date-range-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }

      .date-actions {
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
        padding: 1rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;
      }

      .constraint-info {
        margin-top: 1.5rem;
        padding: 1.5rem;
        background: var(--ix-color-neutral-10);
        border-radius: 6px;

        p {
          margin: 0.5rem 0;
          font-size: 1rem;
        }
      }

      .format-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 1rem;
      }

      .format-item {
        padding: 1.5rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;

        label {
          display: block;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--ix-color-text-primary);
          font-size: 1rem;
        }

        ix-input {
          width: 100%;
          margin-bottom: 1rem;
        }

        small {
          display: block;
          margin-top: 0.75rem;
          color: var(--ix-color-text-secondary);
          font-style: italic;
          font-size: 0.9rem;
          padding: 0.5rem;
          background: var(--ix-color-neutral-10);
          border-radius: 4px;
        }
      }

      .input-group {
        display: flex;
        gap: 1.5rem;
        align-items: flex-end;
        margin-bottom: 1.5rem;

        ix-input {
          flex: 1;
          min-width: 200px;
        }

        ix-input {
          flex: 1;
          min-width: 200px;
        }
      }

      .validation-info {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;

        .status-valid {
          color: var(--ix-color-success);
          font-weight: 600;
        }

        .status-invalid {
          color: var(--ix-color-alarm);
          font-weight: 600;
        }
      }

      .input-result {
        padding: 1rem;
        background: var(--ix-color-neutral-10);
        border-radius: 6px;
        font-family: monospace;
        font-size: 1rem;
        border: 1px solid var(--ix-color-border);
      }

      .selected-dates {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        min-height: 3rem;
        padding: 1rem;
        border: 2px dashed var(--ix-color-neutral-30);
        border-radius: 6px;
        background: var(--ix-color-surface-variant);
        align-items: center;

        .empty-message {
          color: var(--ix-color-text-secondary);
          font-style: italic;
        }
      }

      .multi-actions {
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;
      }

      .state-examples {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 1rem;
      }

      .state-item {
        padding: 1.5rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;

        label {
          display: block;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--ix-color-text-primary);
          font-size: 1rem;
        }

        ix-input {
          width: 100%;
        }
      }

      .validation-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 1.5rem;
        background: var(--ix-color-surface-variant);
        border-radius: 6px;

        ix-input {
          width: 100%;
        }

        ix-button {
          align-self: flex-start;
          min-width: 150px;
        }
      }

      .validation-messages {
        min-height: 3rem;
        display: flex;
        align-items: center;
      }

      .validation-error {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        color: var(--ix-color-alarm);
        padding: 1rem;
        background: rgba(255, 82, 82, 0.1);
        border-radius: 6px;
        border: 1px solid var(--ix-color-alarm);

        ix-icon {
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        ul {
          margin: 0;
          padding-left: 1.5rem;

          li {
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
          }
        }
      }

      .validation-success {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--ix-color-success);
        font-weight: 600;
        padding: 1rem;
        background: rgba(76, 175, 80, 0.1);
        border-radius: 6px;
        border: 1px solid var(--ix-color-success);
      }
    `,
  ],
})
export class DatePickerComponent {
  // Basic date picker
  basicDate = signal<string | null>(null);

  // Date range
  rangeFrom = signal<string | null>(null);
  rangeTo = signal<string | null>(null);

  // Constrained date picker
  constrainedDate = signal<string | null>(null);
  today = new Date().toISOString().split('T')[0];
  maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]; // 90 days from now

  // Custom formats
  isoDate = signal<string | null>(null);
  datetimeDate = signal<string | null>(null);
  monthDate = signal<string | null>(null);

  // Input date
  inputDate = signal<string | null>(null);

  // Multiple dates
  selectedDates = signal<string[]>([]);
  multiDate = signal<string | null>(null);

  // States
  normalStateDate = signal<string | null>(null);
  disabledDate = '2024-08-15';
  readonlyDate = '2024-08-20';

  // Validation
  validationDate = signal<string | null>(null);
  validationErrors = signal<string[]>([]);

  onBasicDateChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.basicDate.set(value);
  }

  onRangeFromChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.rangeFrom.set(value);
  }

  onRangeToChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.rangeTo.set(value);
  }

  onConstrainedDateChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.constrainedDate.set(value);
  }

  onIsoDateChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.isoDate.set(value);
  }

  onDatetimeChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.datetimeDate.set(value);
  }

  onMonthChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.monthDate.set(value);
  }

  onInputDateChange(value: any) {
    const dateStr = typeof value === 'string' ? value : value.detail;
    this.inputDate.set(dateStr);
  }

  onMultiDateChange(event: any) {
    const newDate = typeof event === 'string' ? event : event.detail;
    if (newDate && !this.selectedDates().includes(newDate)) {
      this.selectedDates.set([...this.selectedDates(), newDate]);
    }
    this.multiDate.set(''); // Reset picker
  }

  onNormalStateChange(event: any) {
    const value = typeof event === 'string' ? event : event.detail;
    this.normalStateDate.set(value);
  }

  onValidationDateChange(event: any) {
    const date = typeof event === 'string' ? event : event.detail;
    this.validationDate.set(date);
    this.validateDate(date);
  }

  setToday() {
    this.basicDate.set(this.today);
  }

  clearBasicDate() {
    this.basicDate.set(null);
  }

  getDateRangeText(): string {
    const from = this.rangeFrom();
    const to = this.rangeTo();

    if (!from && !to) return 'No range selected';
    if (from && !to) return `From ${this.formatDisplayDate(from)}`;
    if (!from && to) return `To ${this.formatDisplayDate(to)}`;
    return `${this.formatDisplayDate(from!)} - ${this.formatDisplayDate(to!)}`;
  }

  setThisWeek() {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    this.rangeFrom.set(firstDay.toISOString().split('T')[0]);
    this.rangeTo.set(lastDay.toISOString().split('T')[0]);
  }

  setThisMonth() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.rangeFrom.set(firstDay.toISOString().split('T')[0]);
    this.rangeTo.set(lastDay.toISOString().split('T')[0]);
  }

  clearDateRange() {
    this.rangeFrom.set(null);
    this.rangeTo.set(null);
  }

  formatDisplayDate(dateStr: string | null): string {
    if (!dateStr) return '';

    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  formatDateTime(datetimeStr: string | null): string {
    if (!datetimeStr) return '';

    try {
      const date = new Date(datetimeStr);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return datetimeStr;
    }
  }

  formatMonth(monthStr: string | null): string {
    if (!monthStr) return '';

    try {
      const [year, month] = monthStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
    } catch {
      return monthStr;
    }
  }

  isValidDate(dateStr: string | null): boolean {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }

  removeDate(dateToRemove: string) {
    const current = this.selectedDates();
    this.selectedDates.set(current.filter((date) => date !== dateToRemove));
  }

  clearAllDates() {
    this.selectedDates.set([]);
  }

  addWorkdays() {
    const dates: string[] = [];
    const today = new Date();
    const currentWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    ); // Monday

    // Add Monday to Friday
    for (let i = 0; i < 5; i++) {
      const workday = new Date(currentWeek);
      workday.setDate(currentWeek.getDate() + i);
      dates.push(workday.toISOString().split('T')[0]);
    }

    // Merge with existing dates (avoid duplicates)
    const existing = this.selectedDates();
    const merged = [...new Set([...existing, ...dates])];
    this.selectedDates.set(merged.sort());
  }

  addSampleDates() {
    const today = new Date();
    const sampleDates = [
      new Date(today.getFullYear(), today.getMonth(), 15)
        .toISOString()
        .split('T')[0],
      new Date(today.getFullYear(), today.getMonth() + 1, 1)
        .toISOString()
        .split('T')[0],
      new Date(today.getFullYear(), today.getMonth() + 1, 15)
        .toISOString()
        .split('T')[0],
    ];

    const existing = this.selectedDates();
    const merged = [...new Set([...existing, ...sampleDates])];
    this.selectedDates.set(merged.sort());
  }

  validateDate(date: string | null) {
    const errors: string[] = [];

    if (!date) {
      this.validationErrors.set(errors);
      return;
    }

    // Check if it's a valid date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      errors.push('Invalid date format');
    } else {
      // Check if it's in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateObj < today) {
        errors.push('Date cannot be in the past');
      }

      // Check if it's a weekend
      const dayOfWeek = dateObj.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        errors.push('Weekends are not allowed');
      }

      // Check if it's too far in the future
      const maxFuture = new Date();
      maxFuture.setFullYear(maxFuture.getFullYear() + 1);

      if (dateObj > maxFuture) {
        errors.push('Date cannot be more than 1 year in the future');
      }
    }

    this.validationErrors.set(errors);
  }

  submitValidation() {
    if (this.validationDate() && this.validationErrors().length === 0) {
      alert(
        `Date submitted: ${this.formatDisplayDate(this.validationDate()!)}`
      );
    }
  }
}
