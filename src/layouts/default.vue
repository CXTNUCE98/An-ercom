<template>
  <LayoutTheHeader />
  <main>
    <slot />
  </main>
  <LayoutTheFooter />
  <LayoutNoiseOverlay />
  <LayoutFloatingContactWidget />
  <CartDrawer />
</template>
