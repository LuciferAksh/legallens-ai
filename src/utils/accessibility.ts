/**
 * Accessibility Helpers (WCAG 2.1 AA Compliance)
 */

let liveRegion: HTMLElement | null = null;

export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof document === 'undefined') return;

  if (!liveRegion || !document.body.contains(liveRegion)) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  } else {
    liveRegion.setAttribute('aria-live', priority);
  }

  // Clear and update to ensure screen reader detects change
  liveRegion.textContent = '';
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, 50);
}

export function trapFocus(element: HTMLElement, event: KeyboardEvent) {
  if (event.key !== 'Tab') return;

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  const focusables = Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors));
  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      last.focus();
      event.preventDefault();
    }
  } else {
    if (document.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  }
}
