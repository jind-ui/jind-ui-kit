import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders without crashing', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('applies width and height', () => {
    render(<Skeleton width={200} height={20} />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('20px');
  });

  it('applies default radius (sm = 5px)', () => {
    render(<Skeleton />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.borderRadius).toBe('5px');
  });

  it('applies custom radius', () => {
    render(<Skeleton radius="full" />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.borderRadius).toBe('999px');
  });

  it('applies animation style', () => {
    render(<Skeleton />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.animation).toContain('jind-skeleton-pulse');
  });

  it('applies custom style', () => {
    render(<Skeleton style={{ marginTop: 16 }} />);
    const el = screen.getByTestId('skeleton');
    expect(el.style.marginTop).toBe('16px');
  });

  it('injects style tag into document head', () => {
    render(<Skeleton />);
    const styleTag = document.head.querySelector('[data-jind-skeleton]');
    expect(styleTag).toBeTruthy();
  });
});
