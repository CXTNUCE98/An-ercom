import { useScroll } from '@vueuse/core';

export const useScrolled = (threshold = 0) => {
  const { y } = useScroll(typeof window !== 'undefined' ? window : null as any);
  const isScrolled = computed(() => y.value > threshold);
  return { isScrolled };
};
