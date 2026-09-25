import { describe, it, expect, vi, beforeEach } from 'vitest';
import { announceToScreenReader, trapFocus } from '../accessibility';

describe('accessibility utils', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('creates an aria-live region and announces messages', async () => {
    announceToScreenReader('Document uploaded successfully', 'polite');
    const region = document.getElementById('a11y-live-region');
    expect(region).not.toBeNull();
    expect(region?.getAttribute('aria-live')).toBe('polite');

    await new Promise((r) => setTimeout(r, 60));
    expect(region?.textContent).toBe('Document uploaded successfully');
  });

  it('updates aria-live priority when requested', () => {
    announceToScreenReader('High risk detected', 'assertive');
    const region = document.getElementById('a11y-live-region');
    expect(region?.getAttribute('aria-live')).toBe('assertive');
  });

  it('traps focus within container upon Tab key press', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1">First</button>
      <input id="input1" />
      <button id="btn2">Last</button>
    `;
    document.body.appendChild(container);

    const btn1 = container.querySelector('#btn1') as HTMLElement;
    const btn2 = container.querySelector('#btn2') as HTMLElement;

    btn2.focus();
    expect(document.activeElement).toBe(btn2);

    // Forward tab from last element should wrap to first
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');

    trapFocus(container, tabEvent);
    expect(document.activeElement).toBe(btn1);
    expect(preventDefaultSpy).toHaveBeenCalled();

    // Shift-tab from first element should wrap to last
    btn1.focus();
    const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    trapFocus(container, shiftTabEvent);
    expect(document.activeElement).toBe(btn2);
  });
});
