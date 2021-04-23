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
          <q-item-label caption class="text-white">
            Updated 4/22/2021 5:39pm EST
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-list separator>
                <q-expansion-item
                  label="Generate Files"
                  group="options"
                  v-model="expanded.generate"
                  dense
                  :duration="0"
                  >
                    <q-card class="secundo">
                        <q-card-section>
                            <q-list separator dense>
                                  <q-item clickable to="/generate/captions" class="at-show">
                                    <q-item-section>
                                      <q-item-label>
                                        Captions
                                      </q-item-label>
                                      <q-item-label caption class="at-hide">
                                        Generates .vtt and .xml files for in language captions.
                                      </q-item-label>
                                    </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/clinical-brief" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Clinical Brief
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates Clinical Brief XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/curbside" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Curbside
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates Curbside Consult XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/spotlight" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Spotlight
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates Spotlight XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/video-lecture" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Video Lecture
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates Video Lecture XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/first-response" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          First Response
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates First Response XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/townhall-enduring" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Townhall Enduring
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates TownHall Enduring XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/townhall-cert" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Townhall Cert
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates TownHall Cert XML code from R2Net html file.
                                        </q-item-label>
                                      </q-item-section>
                                  </q-item>
                                  <q-item clickable to="/generate/test-and-teach" class="at-show">
                                      <q-item-section>
                                        <q-item-label>
                                          Test and Teach
                                        </q-item-label>
                                        <q-item-label caption class="at-hide">
                                          Generates Test and Teach XML code from R2Net html file.
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
                  v-model="expanded.snippets"
                  dense
                  :duration="0"
                  >
                    <q-card class="secundo">
                        <q-card-section>
                            <q-list separator dense>
                                <q-item clickable to="/snippets/in-language" class="at-show">
                                  <q-item-section>
                                    <q-item-label>
                                      In-Language
                                    </q-item-label>
                                    <q-item-label caption class="at-hide">
                                      Generates code for in language add-ons.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/downloadable-slides" class="at-show">
                                    <q-item-section>
                                      <q-item-label>
                                        Downloadable Slides
                                      </q-item-label>
                                      <q-item-label caption class="at-hide">
                                        Generates HTML snippet for downloadable slides.
                                      </q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/certificate-links" class="at-show">
                                  <q-item-section>
                                    <q-item-label>
                                      Certificate Links
                                    </q-item-label>
                                    <q-item-label caption class="at-hide">
                                      Generates snippet for activity certificate links.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/media-info" class="at-show">
                                  <q-item-section>
                                    <q-item-label>
                                      Media Info
                                    </q-item-label>
                                    <q-item-label caption class="at-hide">
                                      Generates snippet for custom form media info.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/slide-tocs" class="at-show">
                                  <q-item-section>
                                    <q-item-label>
                                      Slide TOCs
                                    </q-item-label>
                                    <q-item-label caption class="at-hide">
                                      Generates XML for TOC elements with empty slide groups.
                                    </q-item-label>
                                  </q-item-section>
                                </q-item>
                                <q-item clickable to="/snippets/misc-provider-statement" class="at-show">
                                    <q-item-section>
                                      <q-item-label>
                                        Misc Provider Statement
                                      </q-item-label>
                                      <q-item-label caption class="at-hide">
                                        Generates HTML snippet for "Misc Provider Statement" field. Comes with Interprofessional CE logo and Medscape logo.
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
                  v-model="expanded.components"
                  dense
                  :duration="0"
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list separator dense>
                        <q-item clickable to="/components/activity" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              Activity
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates Activity XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/text-transcript" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              Text Transcript
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates XML code for Sidebar Transcript from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/slides-transcript" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              Slides Transcript
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates XML code for Slides Transcript from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/abbreviations" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              Abbreviations
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates Abbrevations TOC XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/references" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              References
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates References TOC XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/table-of-contents" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              Table of Contents
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates Multicomponent TOC XML code from R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/credit-statements" class="at-show">
                          <q-item-section>
                            <q-item-label>
                              Credit Statements
                            </q-item-label>
                            <q-item-label caption class="at-hide">
                              Generates credit statements HTML code from the R2Net html file.
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable to="/components/contributors" disable>
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
                  v-model="expanded.producer"
                  dense
                  :duration="0"
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
                  v-model="expanded.format"
                  dense
                  :duration="0"
                >
                  <q-card class="secundo">
                    <q-card-section>
                      <q-list bordered separator>
                        <q-item clickable to="/format/learning-objectives">
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
            <!-- <div class="q-ma-md">
              <div>
                <q-icon name="warning_amber" class="q-mr-sm"/><span>Disable previews to improve performance:</span>
              </div>
              <q-toggle
                :value="performanceMode"
                @input="val => setPerformanceMode(val)"
                color="blue"
                label="Hide Previews"
              />
            </div> -->
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MainLayout',
  data() {
    return {
      left: true,
      expanded: {
        format: false,
        producer: false,
        components: false,
        snippets: false,
        generate: false
      }
    }
  },
  methods: {
    ...mapActions('settings', ['setPerformanceMode'])
  },
  computed: {
    ...mapGetters('settings', ['performanceMode'])
  },
  watch: {
    $route(val) {
      Object.keys(this.expanded).forEach(key => {
        if(val.path.includes(key)){
          this.expanded[key] = true
        }else{
          this.expanded[key] = false
        }
      })
    }
  },
  mounted() {
    Object.keys(this.expanded).forEach(key => {
      if(this.$route.path.includes(key)){
        this.expanded[key] = true
      }else{
        this.expanded[key] = false
      }
    })
  }
}
</script>

<style scoped>
  .active-expand {
    color: blue;
  }
  .at-hide {
    display: none;
  }
  .at-show:hover {
    padding: 8px 16px;
  }

  .at-show:hover .at-hide {
    display: initial;
  }
  .q-router-link--active.at-show >>> .at-hide {
    display: initial;
  }
  .q-router-link--active {
    padding: 8px 16px;
  }
</style>
