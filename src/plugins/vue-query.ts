import {
  VueQueryPlugin,
  QueryClient,
  hydrate,
  dehydrate,
} from '@tanstack/vue-query';
import type { DehydratedState } from '@tanstack/vue-query';
import type { NuxtApp } from '#app';

/**
 * Vue Query với SSR hydration:
 * - Server: dehydrate cache sau khi render, gắn vào payload.
 * - Client: hydrate lại từ payload → không refetch những query đã có SSR data.
 */
export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query');

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Tránh refetch ngay khi hydrate trên client.
        staleTime: 1000 * 60,
      },
    },
  });

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    nuxtApp.hooks.hook('app:created', () => {
      if (vueQueryState.value) hydrate(queryClient, vueQueryState.value);
    });
  }
});
