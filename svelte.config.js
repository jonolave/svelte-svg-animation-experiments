import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess({
    style: ({ attributes }) => {
      if (attributes.lang === 'scss') {
        return {
          // use the modern Sass JS API
          // No need to set anything unless customizing
        };
      }
    }
  }),

  compilerOptions: {
    dev: true
  }
};