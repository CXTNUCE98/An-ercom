import { ref, computed, onMounted, onBeforeUnmount, unref, type MaybeRef } from 'vue';

export function useCountdown(targetDate: MaybeRef<Date | string>) {
  const now = ref(new Date());
  let timer: ReturnType<typeof setInterval> | null = null;

  const target = computed(() => new Date(unref(targetDate)));

  const diff = computed(() => {
    const ms = target.value.getTime() - now.value.getTime();
    return Math.max(0, ms);
  });

  const days = computed(() => Math.floor(diff.value / (1000 * 60 * 60 * 24)));
  const hours = computed(() => Math.floor((diff.value / (1000 * 60 * 60)) % 24));
  const minutes = computed(() => Math.floor((diff.value / (1000 * 60)) % 60));
  const seconds = computed(() => Math.floor((diff.value / 1000) % 60));
  const isExpired = computed(() => diff.value <= 0);

  onMounted(() => {
    timer = setInterval(() => {
      now.value = new Date();
    }, 1000);
  });

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
  });

  return { days, hours, minutes, seconds, isExpired };
}
