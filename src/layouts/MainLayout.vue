<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer show-if-above v-model="left" side="left">
      <q-item class="bg-primary text-white text-h6" to="/">
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
                    <q-card>
                        <q-card-section>
                            <q-list separator bordered>
                                <!-- <router-link to="/generate/captions"> -->
                                  <q-item clickable to="/generate/captions">
                                      Generate Captions
                                  </q-item>
                                <!-- </router-link> -->
                                <!-- <router-link to="/generate/curbside"> -->
                                  <q-item clickable to="/generate/curbside">
                                      Generate Curbside
                                  </q-item>
                                <!-- </router-link> -->
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Snippets"
                  group="options"
                  disable
                  >
                    <q-card>
                        <q-card-section>
                            <q-list separator bordered>
                                <q-item clickable>
                                    In-Language
                                </q-item>
                                <q-item clickable>
                                    Downloadable Slides
                                </q-item>
                                <q-item clickable>
                                    Certificate Links
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
                  <q-card>
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
                  <q-card>
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
