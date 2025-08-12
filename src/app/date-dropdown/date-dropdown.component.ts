import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

interface DateOption {
  value: string;
  label: string;
  date?: Date;
}

@Component({
  selector: 'app-date-dropdown',
  standalone: true,
  imports: [CommonModule, IxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="date-dropdown-demo">
      <div class="date-dropdown-demo__header">
        <h1>Date Dropdown Examples</h1>
        <p>Select dates using dropdown menus with predefined options.</p>
      </div>

      <div class="date-dropdown-demo__content">
        <!-- Basic Date Dropdown -->
        <ix-card class="demo-card">
          <h3>Basic Date Dropdown</h3>
          <p>Selected: {{ basicSelection() || 'None' }}</p>

          <ix-date-dropdown
            [value]="basicSelection()"
            (dateChange)="onBasicSelectionChange($event)"
          >
            <ix-date-dropdown-option value="today"
              >Today</ix-date-dropdown-option
            >
            <ix-date-dropdown-option value="yesterday"
              >Yesterday</ix-date-dropdown-option
            >
            <ix-date-dropdown-option value="tomorrow"
              >Tomorrow</ix-date-dropdown-option
            >
            <ix-date-dropdown-option value="last-week"
              >Last Week</ix-date-dropdown-option
            >
            <ix-date-dropdown-option value="next-week"
              >Next Week</ix-date-dropdown-option
            >
          </ix-date-dropdown>

          <div class="selection-info">
            <p>
              <strong>Actual Date:</strong>
              {{ getActualDate(basicSelection()) }}
            </p>
          </div>
        </ix-card>

        <!-- Custom Dropdown using ix-select -->
        <ix-card class="demo-card">
          <h3>Custom Date Dropdown</h3>
          <p>Selected period: {{ customSelection() || 'None' }}</p>

          <ix-select
            [value]="customSelection()"
            (valueChange)="onCustomSelectionChange($event)"
            placeholder="Select a time period"
          >
            <ix-select-item value="today">Today</ix-select-item>
            <ix-select-item value="yesterday">Yesterday</ix-select-item>
            <ix-select-item value="this-week">This Week</ix-select-item>
            <ix-select-item value="last-week">Last Week</ix-select-item>
            <ix-select-item value="this-month">This Month</ix-select-item>
            <ix-select-item value="last-month">Last Month</ix-select-item>
            <ix-select-item value="this-quarter">This Quarter</ix-select-item>
            <ix-select-item value="last-quarter">Last Quarter</ix-select-item>
            <ix-select-item value="this-year">This Year</ix-select-item>
            <ix-select-item value="last-year">Last Year</ix-select-item>
          </ix-select>

          <div class="period-details" *ngIf="customSelection()">
            <h4>Period Details</h4>
            <p>
              <strong>Start:</strong> {{ getPeriodStart(customSelection()!) }}
            </p>
            <p><strong>End:</strong> {{ getPeriodEnd(customSelection()!) }}</p>
            <p>
              <strong>Duration:</strong>
              {{ getPeriodDuration(customSelection()!) }} days
            </p>
          </div>
        </ix-card>

        <!-- Quick Date Actions -->
        <ix-card class="demo-card">
          <h3>Quick Date Actions</h3>
          <p>Current selection: {{ quickSelection() }}</p>

          <div class="quick-actions">
            <ix-button
              *ngFor="let option of quickOptions"
              variant="outline"
              size="small"
              [class.active]="quickSelection() === option.value"
              (click)="selectQuickOption(option.value)"
            >
              {{ option.label }}
            </ix-button>
          </div>

          <div class="quick-result" *ngIf="quickSelection()">
            <ix-group header="Selected Period">
              <p>
                <strong>Period:</strong>
                {{ getQuickOptionLabel(quickSelection()!) }}
              </p>
              <p>
                <strong>Date Range:</strong>
                {{ getQuickDateRange(quickSelection()!) }}
              </p>
              <p>
                <strong>Business Days:</strong>
                {{ getBusinessDays(quickSelection()!) }}
              </p>
            </ix-group>
          </div>
        </ix-card>

        <!-- Multi-Level Date Dropdown -->
        <ix-card class="demo-card">
          <h3>Multi-Level Date Selection</h3>

          <div class="multi-level">
            <div class="level-item">
              <label>Year:</label>
              <ix-select
                [value]="selectedYear()"
                (valueChange)="onYearChange($event)"
                placeholder="Select year"
              >
                <ix-select-item
                  *ngFor="let year of availableYears"
                  [value]="year.toString()"
                >
                  {{ year }}
                </ix-select-item>
              </ix-select>
            </div>

            <div class="level-item">
              <label>Month:</label>
              <ix-select
                [value]="selectedMonth()"
                [disabled]="!selectedYear()"
                (valueChange)="onMonthChange($event)"
                placeholder="Select month"
              >
                <ix-select-item
                  *ngFor="let month of months; let i = index"
                  [value]="i.toString()"
                >
                  {{ month }}
                </ix-select-item>
              </ix-select>
            </div>

            <div class="level-item">
              <label>Day:</label>
              <ix-select
                [value]="selectedDay()"
                [disabled]="!selectedMonth()"
                (valueChange)="onDayChange($event)"
                placeholder="Select day"
              >
                <ix-select-item
                  *ngFor="let day of availableDays()"
                  [value]="day.toString()"
                >
                  {{ day }}
                </ix-select-item>
              </ix-select>
            </div>
          </div>

          <div class="multi-result" *ngIf="getSelectedDate()">
            <h4>Selected Date</h4>
            <p><strong>Date:</strong> {{ formatSelectedDate() }}</p>
            <p><strong>Day of Week:</strong> {{ getDayOfWeek() }}</p>
            <p><strong>Week Number:</strong> {{ getWeekNumber() }}</p>
          </div>
        </ix-card>

        <!-- Relative Date Dropdown -->
        <ix-card class="demo-card">
          <h3>Relative Date Dropdown</h3>
          <p>Select dates relative to today</p>

          <div class="relative-controls">
            <ix-select
              [value]="relativeDirection()"
              (valueChange)="onRelativeDirectionChange($event)"
            >
              <ix-select-item value="past">Past</ix-select-item>
              <ix-select-item value="future">Future</ix-select-item>
            </ix-select>

            <ix-select
              [value]="relativeAmount()"
              (valueChange)="onRelativeAmountChange($event)"
            >
              <ix-select-item
                *ngFor="let num of [1, 2, 3, 4, 5, 7, 10, 14, 21, 30, 60, 90]"
                [value]="num.toString()"
              >
                {{ num }}
              </ix-select-item>
            </ix-select>

            <ix-select
              [value]="relativeUnit()"
              (valueChange)="onRelativeUnitChange($event)"
            >
              <ix-select-item value="days">Days</ix-select-item>
              <ix-select-item value="weeks">Weeks</ix-select-item>
              <ix-select-item value="months">Months</ix-select-item>
              <ix-select-item value="years">Years</ix-select-item>
            </ix-select>
          </div>

          <div class="relative-result">
            <p><strong>Expression:</strong> {{ getRelativeExpression() }}</p>
            <p><strong>Calculated Date:</strong> {{ getCalculatedDate() }}</p>
            <p><strong>Days from Today:</strong> {{ getDaysFromToday() }}</p>
          </div>
        </ix-card>

        <!-- Date Preset Dropdown -->
        <ix-card class="demo-card">
          <h3>Date Presets</h3>

          <div class="preset-categories">
            <div
              class="preset-category"
              *ngFor="let category of presetCategories"
            >
              <h4>{{ category.name }}</h4>
              <ix-select
                [value]="getPresetSelection(category.key)"
                (valueChange)="onPresetChange(category.key, $event)"
                [placeholder]="'Select ' + category.name.toLowerCase()"
              >
                <ix-select-item
                  *ngFor="let preset of category.options"
                  [value]="preset.value"
                >
                  {{ preset.label }}
                </ix-select-item>
              </ix-select>

              <div *ngIf="getPresetSelection(category.key)" class="preset-info">
                <small>{{
                  getPresetDateRange(
                    category.key,
                    getPresetSelection(category.key)!
                  )
                }}</small>
              </div>
            </div>
          </div>
        </ix-card>
      </div>
    </div>
  `,
  styles: [
    `
      .date-dropdown-demo {
        padding: 1.5rem;

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
          gap: 1.5rem;
        }
      }

      .demo-card {
        padding: 1.5rem;

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: var(--ix-color-primary);
        }

        p {
          margin-bottom: 1rem;
          color: var(--ix-color-text-secondary);
        }
      }

      .selection-info {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--ix-color-neutral-10);
        border-radius: 4px;
      }

      .period-details {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--ix-color-neutral-10);
        border-radius: 4px;

        h4 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: var(--ix-color-primary);
        }

        p {
          margin: 0.25rem 0;
        }
      }

      .quick-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;

        ix-button {
          &.active {
            background: var(--ix-color-primary);
            color: white;
          }
        }
      }

      .quick-result {
        margin-top: 1rem;
      }

      .multi-level {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .level-item {
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--ix-color-text-primary);
        }
      }

      .multi-result {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--ix-color-neutral-10);
        border-radius: 4px;

        h4 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: var(--ix-color-primary);
        }

        p {
          margin: 0.25rem 0;
        }
      }

      .relative-controls {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .relative-result {
        padding: 1rem;
        background: var(--ix-color-neutral-10);
        border-radius: 4px;

        p {
          margin: 0.5rem 0;

          &:first-child {
            margin-top: 0;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .preset-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .preset-category {
        h4 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: var(--ix-color-primary);
        }
      }

      .preset-info {
        margin-top: 0.5rem;

        small {
          color: var(--ix-color-text-secondary);
          font-style: italic;
        }
      }
    `,
  ],
})
export class DateDropdownComponent {
  // Basic dropdown
  basicSelection = signal<string | null>(null);

  // Custom dropdown
  customSelection = signal<string | null>(null);

  // Quick actions
  quickSelection = signal<string | null>(null);
  quickOptions: DateOption[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this-week', label: 'This Week' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-30-days', label: 'Last 30 Days' },
  ];

  // Multi-level selection
  selectedYear = signal<string | null>(null);
  selectedMonth = signal<string | null>(null);
  selectedDay = signal<string | null>(null);

  availableYears = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Relative date
  relativeDirection = signal<string>('past');
  relativeAmount = signal<string>('7');
  relativeUnit = signal<string>('days');

  // Presets
  presetSelections = signal<Record<string, string>>({});

  presetCategories = [
    {
      key: 'reporting',
      name: 'Reporting Periods',
      options: [
        { value: 'mtd', label: 'Month to Date' },
        { value: 'qtd', label: 'Quarter to Date' },
        { value: 'ytd', label: 'Year to Date' },
        { value: 'last-month', label: 'Last Month' },
        { value: 'last-quarter', label: 'Last Quarter' },
      ],
    },
    {
      key: 'fiscal',
      name: 'Fiscal Periods',
      options: [
        { value: 'current-fy', label: 'Current Fiscal Year' },
        { value: 'previous-fy', label: 'Previous Fiscal Year' },
        { value: 'fy-q1', label: 'FY Q1' },
        { value: 'fy-q2', label: 'FY Q2' },
        { value: 'fy-q3', label: 'FY Q3' },
        { value: 'fy-q4', label: 'FY Q4' },
      ],
    },
    {
      key: 'custom',
      name: 'Custom Ranges',
      options: [
        { value: 'rolling-30', label: 'Rolling 30 Days' },
        { value: 'rolling-90', label: 'Rolling 90 Days' },
        { value: 'rolling-365', label: 'Rolling 365 Days' },
        { value: 'last-2-weeks', label: 'Last 2 Weeks' },
        { value: 'next-30-days', label: 'Next 30 Days' },
      ],
    },
  ];

  onBasicSelectionChange(event: any) {
    this.basicSelection.set(event.detail);
  }

  onCustomSelectionChange(event: any) {
    this.customSelection.set(event.detail);
  }

  getActualDate(selection: string | null): string {
    if (!selection) return 'No date selected';

    const today = new Date();
    let targetDate: Date;

    switch (selection) {
      case 'today':
        targetDate = today;
        break;
      case 'yesterday':
        targetDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'tomorrow':
        targetDate = new Date(today.setDate(today.getDate() + 1));
        break;
      case 'last-week':
        targetDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'next-week':
        targetDate = new Date(today.setDate(today.getDate() + 7));
        break;
      default:
        return 'Unknown selection';
    }

    return targetDate.toLocaleDateString();
  }

  getPeriodStart(period: string): string {
    const today = new Date();
    let startDate: Date;

    switch (period) {
      case 'today':
        startDate = today;
        break;
      case 'yesterday':
        startDate = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'this-week':
        startDate = new Date(today.setDate(today.getDate() - today.getDay()));
        break;
      case 'last-week':
        startDate = new Date(
          today.setDate(today.getDate() - today.getDay() - 7)
        );
        break;
      case 'this-month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'last-month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case 'this-quarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), currentQuarter * 3, 1);
        break;
      case 'last-quarter':
        const lastQuarter = Math.floor(today.getMonth() / 3) - 1;
        const year =
          lastQuarter < 0 ? today.getFullYear() - 1 : today.getFullYear();
        const quarter = lastQuarter < 0 ? 3 : lastQuarter;
        startDate = new Date(year, quarter * 3, 1);
        break;
      case 'this-year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'last-year':
        startDate = new Date(today.getFullYear() - 1, 0, 1);
        break;
      default:
        return 'Unknown period';
    }

    return startDate.toLocaleDateString();
  }

  getPeriodEnd(period: string): string {
    const today = new Date();
    let endDate: Date;

    switch (period) {
      case 'today':
      case 'yesterday':
        return this.getPeriodStart(period);
      case 'this-week':
        endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        break;
      case 'last-week':
        endDate = new Date(today.setDate(today.getDate() - today.getDay() - 1));
        break;
      case 'this-month':
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'last-month':
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'this-quarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        endDate = new Date(today.getFullYear(), (currentQuarter + 1) * 3, 0);
        break;
      case 'last-quarter':
        const lastQuarter = Math.floor(today.getMonth() / 3) - 1;
        const year =
          lastQuarter < 0 ? today.getFullYear() - 1 : today.getFullYear();
        const quarter = lastQuarter < 0 ? 3 : lastQuarter;
        endDate = new Date(year, (quarter + 1) * 3, 0);
        break;
      case 'this-year':
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case 'last-year':
        endDate = new Date(today.getFullYear() - 1, 11, 31);
        break;
      default:
        return 'Unknown period';
    }

    return endDate.toLocaleDateString();
  }

  getPeriodDuration(period: string): number {
    const start = new Date(this.getPeriodStart(period));
    const end = new Date(this.getPeriodEnd(period));
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  selectQuickOption(value: string) {
    this.quickSelection.set(value);
  }

  getQuickOptionLabel(value: string): string {
    const option = this.quickOptions.find((opt) => opt.value === value);
    return option?.label || value;
  }

  getQuickDateRange(value: string): string {
    return `${this.getPeriodStart(value)} - ${this.getPeriodEnd(value)}`;
  }

  getBusinessDays(value: string): number {
    const start = new Date(this.getPeriodStart(value));
    const end = new Date(this.getPeriodEnd(value));
    let businessDays = 0;

    const current = new Date(start);
    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Not weekend
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return businessDays;
  }

  onYearChange(event: any) {
    this.selectedYear.set(event.detail);
    this.selectedMonth.set(null);
    this.selectedDay.set(null);
  }

  onMonthChange(event: any) {
    this.selectedMonth.set(event.detail);
    this.selectedDay.set(null);
  }

  onDayChange(event: any) {
    this.selectedDay.set(event.detail);
  }

  availableDays = signal<number[]>([]);

  ngOnInit() {
    // Update available days when month/year changes
    this.updateAvailableDays();
  }

  ngOnChanges() {
    this.updateAvailableDays();
  }

  private updateAvailableDays() {
    const year = this.selectedYear();
    const month = this.selectedMonth();

    if (year && month !== null) {
      const daysInMonth = new Date(
        parseInt(year),
        parseInt(month) + 1,
        0
      ).getDate();
      this.availableDays.set(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
      );
    } else {
      this.availableDays.set([]);
    }
  }

  getSelectedDate(): Date | null {
    const year = this.selectedYear();
    const month = this.selectedMonth();
    const day = this.selectedDay();

    if (year && month !== null && day) {
      return new Date(parseInt(year), parseInt(month), parseInt(day));
    }

    return null;
  }

  formatSelectedDate(): string {
    const date = this.getSelectedDate();
    return (
      date?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) || ''
    );
  }

  getDayOfWeek(): string {
    const date = this.getSelectedDate();
    return date?.toLocaleDateString('en-US', { weekday: 'long' }) || '';
  }

  getWeekNumber(): number {
    const date = this.getSelectedDate();
    if (!date) return 0;

    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  onRelativeDirectionChange(event: any) {
    this.relativeDirection.set(event.detail);
  }

  onRelativeAmountChange(event: any) {
    this.relativeAmount.set(event.detail);
  }

  onRelativeUnitChange(event: any) {
    this.relativeUnit.set(event.detail);
  }

  getRelativeExpression(): string {
    const direction = this.relativeDirection();
    const amount = this.relativeAmount();
    const unit = this.relativeUnit();

    if (!amount || !unit) return 'Select all options';

    const prefix = direction === 'past' ? 'Last' : 'Next';
    const unitText = parseInt(amount) === 1 ? unit.slice(0, -1) : unit;

    return `${prefix} ${amount} ${unitText}`;
  }

  getCalculatedDate(): string {
    const direction = this.relativeDirection();
    const amount = this.relativeAmount();
    const unit = this.relativeUnit();

    if (!amount || !unit) return 'N/A';

    const today = new Date();
    const multiplier = direction === 'past' ? -1 : 1;
    const amountNum = parseInt(amount) * multiplier;

    let targetDate: Date;

    switch (unit) {
      case 'days':
        targetDate = new Date(today.setDate(today.getDate() + amountNum));
        break;
      case 'weeks':
        targetDate = new Date(today.setDate(today.getDate() + amountNum * 7));
        break;
      case 'months':
        targetDate = new Date(today.setMonth(today.getMonth() + amountNum));
        break;
      case 'years':
        targetDate = new Date(
          today.setFullYear(today.getFullYear() + amountNum)
        );
        break;
      default:
        return 'Invalid unit';
    }

    return targetDate.toLocaleDateString();
  }

  getDaysFromToday(): number {
    const calculatedDate = new Date(this.getCalculatedDate());
    const today = new Date();
    const diffTime = calculatedDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getPresetSelection(categoryKey: string): string | null {
    return this.presetSelections()[categoryKey] || null;
  }

  onPresetChange(categoryKey: string, value: any) {
    const current = this.presetSelections();
    this.presetSelections.set({
      ...current,
      [categoryKey]: value.detail,
    });
  }

  getPresetDateRange(categoryKey: string, value: string): string {
    // This would typically calculate actual date ranges based on preset values
    return `${this.getPeriodStart(value)} - ${this.getPeriodEnd(value)}`;
  }
}
