import { sveltePreprocess } from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess({
    scss: {
      implementation: import('sass-embedded')
    }
  }),

  compilerOptions: {
    dev: true
  }
};
