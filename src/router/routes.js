
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
              component: () => import('components/Menu-Items/GenSpotlight.vue'),
              props: { product: 'curbside' }
            },
            {
              path: '/generate/spotlight',
              component: () => import('components/Menu-Items/GenSpotlight.vue'),
              props: { product: 'spotlight' }
            },
            {
              path: '/generate/test-and-teach',
              component: () => import('components/Menu-Items/GenTestAndTeach.vue')
            },
            {
              path: '/generate/first-response',
              component: () => import('components/Menu-Items/GenFirstResponse.vue')
            },
            {
              path: '/generate/townhall-enduring',
              component: () => import('components/Menu-Items/GenTownhall.vue')
            },
            {
              path: '/generate/townhall-cert',
              component: () => import('components/Menu-Items/GenTHCert.vue')
            },
            {
              path: '/generate/video-lecture',
              component: () => import('components/Menu-Items/GenVideoLecture.vue')
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

            //Format

            {
              path: '/format/learning-objectives',
              component: () => import('components/Menu-Items/FormatLearningObjectives.vue')
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
              component: () => import('components/Menu-Items/ComponentSlidesTranscript.vue')
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
              component: () => import('components/Menu-Items/ComponentTableOfContents.vue')
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
