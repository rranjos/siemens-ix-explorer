import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  inject,
  signal,
  ElementRef,
  viewChild,
  effect,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IxModule, ModalService, ToastService } from '@siemens/ix-angular';
import { CardItem } from './types';

@Component({
  selector: 'lib-card-list',
  imports: [CommonModule, IxModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CardListComponent {
  private cdr = inject(ChangeDetectorRef);

  cards = input<CardItem[]>([]);
  title = input<string>('');

  viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');
  container = viewChild<ElementRef<HTMLDivElement>>('container');

  private currentScrollPosition = signal(0);
  private maxScrollPosition = signal(0);
  private showNavigation = signal(false);

  constructor() {
    effect(() => {
      const cardsArray = this.cards();
      if (cardsArray.length > 0) {
        this.updateScrollBoundaries();
      }
    });
  }

  scrollLeft() {
    const viewportEl = this.viewport()?.nativeElement;
    const containerEl = this.container()?.nativeElement;
    if (viewportEl && containerEl) {
      const firstCard = containerEl.querySelector('.card') as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = 16;
        const totalCardWidth = cardWidth + gap;

        const currentPosition = viewportEl.scrollLeft;
        const currentCard = Math.round(currentPosition / totalCardWidth);
        const targetCard = Math.max(0, currentCard - 1);
        const targetPosition = targetCard * totalCardWidth;

        if (Math.abs(targetPosition - currentPosition) > 5) {
          viewportEl.scrollTo({
            left: targetPosition,
            behavior: 'smooth',
          });

          setTimeout(() => {
            this.currentScrollPosition.set(viewportEl.scrollLeft);
            this.cdr.detectChanges();
          }, 500);
        }
      }
    }
  }

  scrollRight() {
    const viewportEl = this.viewport()?.nativeElement;
    const containerEl = this.container()?.nativeElement;
    if (viewportEl && containerEl) {
      const firstCard = containerEl.querySelector('.card') as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = 16;
        const totalCardWidth = cardWidth + gap;
        const maxScroll = viewportEl.scrollWidth - viewportEl.clientWidth;

        const currentPosition = viewportEl.scrollLeft;
        const currentCard = Math.round(currentPosition / totalCardWidth);
        const targetCard = currentCard + 1;
        const targetPosition = Math.min(maxScroll, targetCard * totalCardWidth);

        if (Math.abs(targetPosition - currentPosition) > 5) {
          viewportEl.scrollTo({
            left: targetPosition,
            behavior: 'smooth',
          });

          setTimeout(() => {
            this.currentScrollPosition.set(viewportEl.scrollLeft);
            this.cdr.detectChanges();
          }, 500);
        }
      }
    }
  }

  isAtStart(): boolean {
    const viewportEl = this.viewport()?.nativeElement;
    if (!viewportEl) return true;
    return viewportEl.scrollLeft <= 5;
  }

  isAtEnd(): boolean {
    const viewportEl = this.viewport()?.nativeElement;
    if (!viewportEl) return true;

    const maxScroll = viewportEl.scrollWidth - viewportEl.clientWidth;
    if (maxScroll <= 0) return true;

    return viewportEl.scrollLeft >= maxScroll - 10;
  }

  shouldShowNavigation(): boolean {
    return this.showNavigation();
  }

  private updateScrollBoundaries() {
    setTimeout(() => {
      const viewportEl = this.viewport()?.nativeElement;
      if (viewportEl) {
        void viewportEl.offsetHeight;

        const maxScroll = viewportEl.scrollWidth - viewportEl.clientWidth;
        this.maxScrollPosition.set(maxScroll);
        this.currentScrollPosition.set(viewportEl.scrollLeft);

        this.showNavigation.set(maxScroll > 5);

        this.updateRightButtonPosition();

        const handleScroll = () => {
          this.currentScrollPosition.set(viewportEl.scrollLeft);
          this.cdr.detectChanges();
        };

        viewportEl.addEventListener('scroll', handleScroll, { passive: true });

        const handleResize = () => {
          setTimeout(() => {
            void viewportEl.offsetHeight;
            const newMaxScroll =
              viewportEl.scrollWidth - viewportEl.clientWidth;
            this.showNavigation.set(newMaxScroll > 5);
            this.updateRightButtonPosition();
            this.cdr.markForCheck();
          }, 100);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        this.cdr.markForCheck();
      }
    }, 100);
  }

  private updateRightButtonPosition() {
    const viewportEl = this.viewport()?.nativeElement;
    if (!viewportEl) return;

    const viewportWidth = viewportEl.clientWidth;

    const rightButtonPosition = viewportWidth - 60;
    const rightButton = viewportEl.parentElement?.querySelector(
      '.card-list__nav--right'
    ) as HTMLElement;
    if (rightButton) {
      rightButton.style.left = `${rightButtonPosition}px`;
      rightButton.style.right = 'auto';
    }
  }
  onCardClick(card: CardItem) {
    switch (card.type) {
      case 'video':
        break;
      case 'link':
        break;
      case 'download':
        break;
    }
  }
}
