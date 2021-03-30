
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

            //Generate

            {
              path: '/generate/captions',
              component: () => import('components/Menu-Items/GenCaptions.vue')
            },
            {
              path: '/generate/clinical-brief',
              component: () => import('components/Menu-Items/GenClinicalBrief.vue')
            },
            {
              path: '/generate/curbside',
              component: () => import('components/Menu-Items/GenCurbside.vue')
            },
            {
              path: '/generate/spotlight',
              component: () => import('components/Menu-Items/GenSpotlight.vue')
            },

            //Snippets

            {
              path: '/snippets/in-language',
              component: () => import('components/Menu-Items/SnippetInLanguage.vue')
            },
            {
              path: '/snippets/downloadable-slides',
              component: () => import('components/Menu-Items/SnippetDownloadableSlides.vue')
            },
            {
              path: '/snippets/media-info',
              component: () => import('components/Menu-Items/SnippetMediaInfo.vue')
            },
            {
              path: '/snippets/certificate-links',
              component: () => import('components/Menu-Items/SnippetCertificateLinks.vue')
            },
            {
              path: '/snippets/misc-provider-statement',
              component: () => import('components/Menu-Items/SnippetProviderStatement.vue')
            },
            {
              path: '/snippets/slide-tocs',
              component: () => import('components/Menu-Items/SnippetSlideTocs.vue')
            },

            //Components

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
              component: () => import('components/Menu-Items/ComponentAbbreviations.vue')
            },
            {
              path: '/components/references',
              component: () => import('components/Menu-Items/ComponentReferences.vue')
            },
            {
              path: '/components/table-of-contents',
              component: () => import('components/Menu-Items/GenClinicalBrief.vue')
            },
            {
              path: '/components/credit-statements',
              component: () => import('components/Menu-Items/ComponentCreditStatements.vue')
            },
            {
              path: '/components/contributors',
              component: () => import('components/Menu-Items/GenClinicalBrief.vue')
            }
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
