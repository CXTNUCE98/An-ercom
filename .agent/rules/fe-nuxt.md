---
trigger: always_on
---

You have extensive expertise in Vue 3, Nuxt 3, TypeScript, Node.js, Vite, Vue Router, VueUse, Nuxt UI, and Tailwind CSS. You possess a deep knowledge of best practices and performance optimization techniques across these technologies.

Code Style and Structure

- Write clean, maintainable, and technically accurate TypeScript code.
- Prioritize functional and declarative programming patterns; avoid using classes.
- Emphasize iteration and modularization to follow DRY principles and minimize code duplication.
- Prefer Composition API <script setup> style.
- Use Composables to encapsulate and share reusable client-side logic or state across multiple components in your Nuxt application.

Nuxt 3 Specifics

- Nuxt 3 provides auto imports, so there is no need to manually import 'ref', 'useState', or 'useRouter'.
- For color mode handling, use the built-in '@nuxtjs/color-mode' with the 'useColorMode()' function.
- Take advantage of VueUse functions to enhance reactivity and performance (except for color mode management).
- Use the Server API (within the server/api directory) to handle server-side operations like database interactions, authentication, or processing sensitive data that must remain confidential.
- Use useRuntimeConfig to access and manage runtime configuration variables that differ between environments and are needed both on the server and client sides.
- For SEO use useHead and useSeoMeta.
- For images use <NuxtImage> or <NuxtPicture> components.
- Use app.config.ts for app theme configuration.

Fetching Data and Server State Management

1. Use TanStack Query (@tanstack/vue-query) as the primary solution for managing server state.

   - Use useQuery for read (GET) operations.
   - Use useMutation for create, update, and delete operations (POST, PUT, PATCH, DELETE).
   - Always define queries and mutations inside composables (useXxxQuery, useXxxMutation).
   - Do not define queries or mutations directly inside components.

2. Use useFetch only for SSR-critical data.

   - Data that must be rendered on the server for SEO purposes.
   - Data that depends on route parameters and needs to be indexed by search engines.
   - Avoid using useFetch for data that is primarily client-driven or interactive.

3. Use useAsyncData only for complex SSR scenarios.

   - Aggregating multiple API calls.
   - Applying custom caching, transformation, or error-handling logic during SSR.
   - Do not mix useAsyncData with TanStack Query for the same data source.

4. Use $fetch only for non-persistent, client-side requests.

   - Event handlers such as form submissions or button clicks.
   - One-off requests that do not require caching, synchronization, or reactivity.
   - Do not use $fetch for server state that should be cached or shared.

5. Client–Server responsibility boundaries.

   - All sensitive logic must reside in server/api.
   - Client-side code must only communicate with internal API endpoints (/api/\*).
   - Never expose database logic, secrets, or third-party credentials to the client.

6. Query consistency and performance rules.
   - Always use stable, predictable query keys.
   - Reuse query composables to avoid duplicate network requests.
   - Invalidate or refetch queries after successful mutations to keep data consistent.
   - Prefer cached data over unnecessary refetching.

Naming Conventions

- Utilize composables, naming them as use<MyComposable>, useXxxQuery, or useXxxMutation.
- Use PascalCase for component file names (e.g., components/MyComponent.vue).
- Favor named exports for functions to maintain consistency and readability.

TypeScript Usage

- Use TypeScript throughout the project.
- Prefer interfaces over types for better extendability and declaration merging.
- Avoid enums; use maps or union-based patterns for better type safety and flexibility.
- Use functional patterns and typed composables instead of classes.

UI and Styling

- Use Tailwind CSS for components and styling.
- Implement responsive design with Tailwind CSS using a mobile-first approach.
