export const useTheme = () => {
  const colorMode = useColorMode() as any;
  const theme = computed({
    get: () => (colorMode.value === 'dark' ? 'dark' : 'light'),
    set: (val) => {
      colorMode.preference = val;
    },
  });

  const toggleTheme = (event: MouseEvent) => {
    // Fallback for browsers not supporting View Transitions
    if (!document.startViewTransition) {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  return {
    theme,
    toggleTheme,
  };
};
