
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/Index.vue'), 
        children: [
          {
            path: '',
            component: () => import('components/Menu-Items/Initial.vue')
          },
          {
            path: '/generate/captions',
            component: () => import('components/Menu-Items/GenCaptions.vue')
          },
          {
            path: '/generate/curbside',
            component: () => import('components/Menu-Items/GenCurbside.vue')
          },
          {
            path: '/snippets/in-language',
            component: () => import('components/Menu-Items/SnippetInLanguage.vue')
          },
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
