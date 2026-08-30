import { type TouchEvent as ReactTouchEvent, useCallback, useRef } from "react";

const SWIPE_THRESHOLD_PX = 40;

/**
 * Horizontal touch-swipe navigation for carousels.
 *
 * Shared by the project gallery and the team bio dialog so both respond to the
 * same gesture distance; a swipe shorter than the threshold is treated as a tap
 * rather than a navigation.
 */
export function useSwipeNav(onPrev: () => void, onNext: () => void) {
  const startX = useRef<number | null>(null);

  const onTouchStart = useCallback((e: ReactTouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent) => {
      const start = startX.current;
      startX.current = null;
      const end = e.changedTouches[0]?.clientX;
      if (start === null || end === undefined) {
        return;
      }
      const dx = end - start;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) {
        return;
      }
      (dx < 0 ? onNext : onPrev)();
    },
    [onPrev, onNext]
  );

  return { onTouchStart, onTouchEnd };
}
