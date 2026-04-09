import { useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ParallaxOptions {
  yPercent?: number;
  xPercent?: number;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  invalidateOnRefresh?: boolean;
}

/**
 * Attach a scroll-scrubbed parallax tween to a target element.
 * The trigger defaults to the element itself unless overridden.
 */
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ParallaxOptions = {},
  triggerRef?: RefObject<HTMLElement | null>
) {
  const {
    yPercent = -20,
    xPercent,
    scrub = 1,
    start = "top bottom",
    end = "bottom top",
    invalidateOnRefresh = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = triggerRef?.current ?? el;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent,
        ...(xPercent !== undefined ? { xPercent } : {}),
        ease: "none",
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          invalidateOnRefresh,
        },
      });
    });

    return () => ctx.revert();
  }, []);
}

/**
 * Attach scroll-scrubbed parallax tweens to multiple elements with
 * per-element yPercent values. All share the same trigger.
 */
export function useMultiParallax(
  items: Array<{ ref: RefObject<HTMLElement | null>; yPercent: number }>,
  triggerRef: RefObject<HTMLElement | null>,
  options: Omit<ParallaxOptions, "yPercent"> = {}
) {
  const {
    scrub = 1,
    start = "top bottom",
    end = "bottom top",
    invalidateOnRefresh = true,
  } = options;

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      items.forEach(({ ref, yPercent }) => {
        const el = ref.current;
        if (!el) return;
        gsap.to(el, {
          yPercent,
          ease: "none",
          scrollTrigger: { trigger, start, end, scrub, invalidateOnRefresh },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
