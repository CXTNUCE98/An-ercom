import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'
import type { NuxtApp } from '#app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
    const queryClient = new QueryClient()

    nuxtApp.vueApp.use(VueQueryPlugin, {
        queryClient,
    })
})
