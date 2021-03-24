<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer show-if-above v-model="left" side="left" class="secundo" content-class="secundo">
      <q-item class="primo text-white text-h6" to="/">
        <q-item-section avatar>
            <q-icon name="help" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Automation Tool
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-list separator>
                <q-expansion-item
                  label="Generate Files"
                  group="options">
                    <q-card class="secundo">
                        <q-card-section>
                            <q-list separator bordered>
                                  <q-item clickable to="/generate/captions">
                                    <q-item-section>
                                      <q-item-label>
                                        Generate Captions
                                      </q-item-label>
                                      <q-item-label caption>
                                        Generates .vtt and .xml files for in language captions.
                                      </q-item-label>
                                    </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/curbside">
                                      <q-item-section>
                                        <q-item-label>
                                          Generate Curbside
                                        </q-item-label>
                                        <q-item-label caption>
                                          Generates Curbside Consult XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Snippets"
                  group="options"
                  >
                    <q-card class="secundo">
                        <q-card-section>
                            <q-list separator bordered>
                                <q-item clickable to="/snippets/in-language">
                                  <q-item-section>
                                    <q-item-label>
                                      In-Language
                                    </q-item-label>
                                    <q-item-label caption>
                                      Generates code for in language add-ons.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable disable>
                                    <q-item-section>
                                      <q-item-label>
                                        Downloadable Slides
                                      </q-item-label>
                                      <q-item-label caption>
                                        Generates HTML snippet for downloadable slides.
                                      </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable disable>
                                  <q-item-section>
                                    <q-item-label>
                                      Certificate Links
                                    </q-item-label>
                                    <q-item-label caption>
                                      Generates snippet for activity certificate links.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable disable>
                                  <q-item-section>
                                    <q-item-label>
                                      Media Info
                                    </q-item-label>
                                    <q-item-label caption>
                                      Generates snippet for custom form media info.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable disable>
                                    <q-item-section>
                                      <q-item-label>
                                        Misc Provider Statement
                                      </q-item-label>
                                      <q-item-label caption>
                                        Generates HTML snippet for "Misc Provider Statement" field. Comes with Interprofessional CE logo and Medscape logo.
                                      </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable disable>
                                  <q-item-section>
                                    <q-item-label>
                                      Slide TOCs
                                    </q-item-label>
                                    <q-item-label caption>
                                      Generates XML for TOC elements with empty slide groups.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Components"
                  group="options"
                  disable
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list separator bordered>
                        <q-item clickable>
                          Activity
                        </q-item>
                        <q-item clickable>
                          Text Transcript
                        </q-item>
                        <q-item clickable>
                          Slides Transcript
                        </q-item>
                        <q-item clickable>
                          Abbreviations
                        </q-item>
                        <q-item clickable>
                          References
                        </q-item>
                        <q-item clickable>
                          Table of Contents
                        </q-item>
                        <q-item clickable>
                          Credit Statements
                        </q-item>
                        <q-item clickable>
                          Contributors
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Producer"
                  group="options"
                  disable
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list bordered separator>
                        <q-item clickable>
                          Producer Checklist
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
            </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data() {
    return {
      left: true
    }
  }
}
</script>
