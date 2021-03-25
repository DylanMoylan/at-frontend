
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
            path: '/generate/spotlight',
            component: () => import('components/Menu-Items/GenSpotlight.vue')
          },
          {
            path: '/snippets/in-language',
            component: () => import('components/Menu-Items/SnippetInLanguage.vue')
          },
          {
            path: '/components/activity',
            component: () => import('components/Menu-Items/ComponentActivity.vue')
          },
          {
            path: '/components/text-transcript',
            component: () => import('components/Menu-Items/ComponentTextTranscript.vue')
          },
          {
            path: '/components/slides-transcript',
            component: () => import('components/Menu-Items/GenClinicalBrief.vue')
          },
          {
            path: '/components/abbreviations',
            component: () => import('components/Menu-Items/GenClinicalBrief.vue')
          },
          {
            path: '/components/references',
            component: () => import('components/Menu-Items/GenClinicalBrief.vue')
          },
          {
            path: '/components/table-of-contents',
            component: () => import('components/Menu-Items/GenClinicalBrief.vue')
          },
          {
            path: '/components/credit-statements',
            component: () => import('components/Menu-Items/GenClinicalBrief.vue')
          },
          {
            path: '/components/contributors',
            component: () => import('components/Menu-Items/GenClinicalBrief.vue')
          },
          {
            path: '/snippets/downloadable-slides',
            component: () => import('components/Menu-Items/SnippetDownloadableSlides.vue')
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
