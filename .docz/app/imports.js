export const imports = {
<<<<<<< HEAD
  'src/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-index" */ 'src/index.mdx'),
=======
  'index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "index" */ 'index.mdx'),
  'searchkit.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "searchkit" */ 'searchkit.mdx'),
>>>>>>> Searchkit, complete rewrite
}
