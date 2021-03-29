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
                                  <q-item clickable to="/generate/clinical-brief">
                                      <q-item-section>
                                        <q-item-label>
                                          Generate Clinical Brief
                                        </q-item-label>
                                        <q-item-label caption>
                                          Generates Clinical Brief XML code from R2Net html file.
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
                                  <q-item clickable to="/generate/spotlight">
                                      <q-item-section>
                                        <q-item-label>
                                          Generate Spotlight
                                        </q-item-label>
                                        <q-item-label caption>
                                          Generates Spotlight XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/spotlight" disable>
                                      <q-item-section>
                                        <q-item-label>
                                          Generate Video Lecture
                                        </q-item-label>
                                        <q-item-label caption>
                                          Generates Video Lecture XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/spotlight" disable>
                                      <q-item-section>
                                        <q-item-label>
                                          Generate First Response
                                        </q-item-label>
                                        <q-item-label caption>
                                          Generates First Response XML code from R2Net html file.
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
                                <q-item clickable to="/snippets/downloadable-slides">
                                    <q-item-section>
                                      <q-item-label>
                                        Downloadable Slides
                                      </q-item-label>
                                      <q-item-label caption>
                                        Generates HTML snippet for downloadable slides.
                                      </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/certificate-links">
                                  <q-item-section>
                                    <q-item-label>
                                      Certificate Links
                                    </q-item-label>
                                    <q-item-label caption>
                                      Generates snippet for activity certificate links.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/media-info">
                                  <q-item-section>
                                    <q-item-label>
                                      Media Info
                                    </q-item-label>
                                    <q-item-label caption>
                                      Generates snippet for custom form media info.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/misc-provider-statement">
                                    <q-item-section>
                                      <q-item-label>
                                        Misc Provider Statement
                                      </q-item-label>
                                      <q-item-label caption>
                                        Generates HTML snippet for "Misc Provider Statement" field. Comes with Interprofessional CE logo and Medscape logo.
                                      </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable disable to="/snippets/slide-tocs">
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
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list separator bordered>
                        <q-item clickable to="/components/activity">
                          <q-item-section>
                            <q-item-label>
                              Activity
                            </q-item-label>
                            <q-item-label caption>
                              Generates Activity XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/text-transcript" disable>
                          <q-item-section>
                            <q-item-label>
                              Text Transcript
                            </q-item-label>
                            <q-item-label caption>
                              Generates XML code for Sidebar Transcript from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/slides-transcript" disable>
                          <q-item-section>
                            <q-item-label>
                              Slides Transcript
                            </q-item-label>
                            <q-item-label caption>
                              Generates XML code for Slides Transcript from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/abbreviations" disable>
                          <q-item-section>
                            <q-item-label>
                              Abbreviations
                            </q-item-label>
                            <q-item-label caption>
                              Generates Abbrevations TOC XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/references" disable>
                          <q-item-section>
                            <q-item-label>
                              References
                            </q-item-label>
                            <q-item-label caption>
                              Generates References TOC XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/table-of-contents" disable>
                          <q-item-section>
                            <q-item-label>
                              Table of Contents
                            </q-item-label>
                            <q-item-label caption>
                              Generates Multicomponent TOC XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/credit-statements" disable>
                          <q-item-section>
                            <q-item-label>
                              Credit Statements
                            </q-item-label>
                            <q-item-label caption>
                              Generates credit statements HTML code from the R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="components/contributors" disable>
                          <q-item-section>
                            <q-item-label>
                              Contributors
                            </q-item-label>
                            <q-item-label caption>
                              Generates XML code for contributors using the R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Producer"
                  group="options"
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list bordered separator>
                        <q-item clickable disable>
                          <q-item-section>
                            <q-item-label>
                              Producer Checklist
                            </q-item-label>
                            <q-item-label caption>
                              Generates Checklist of D2 properties for Producers.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Format"
                  group="options"
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list bordered separator>
                        <q-item clickable disable>
                          <q-item-section>
                            <q-item-label>
                              Format Learning Objectives
                            </q-item-label>
                            <q-item-label caption>
                              Formats raw Learning Objectives from the prodticket into the proper format for D2.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
            </q-list>
    </q-drawer>
    <q-btn
      icon="menu"
      v-if="!left"
      @click="left = !left"
    />
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
