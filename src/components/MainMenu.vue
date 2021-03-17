<template>
  <div style="width:35%">
      <q-splitter
        v-model="splitter"
      >
        <template v-slot:before>
            <q-list separator>
                <q-expansion-item
                  label="Generate Files"
                  group="options">
                    <q-card>
                        <q-card-section>
                            <q-list separator bordered>
                                <q-item clickable @click="setActiveComponent('GenCaptions')">
                                    Generate Captions
                                </q-item>
                                <q-item clickable @click="setActiveComponent('GenCurbside')">
                                    Generate Curbside
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                  label="Snippets"
                  group="options">
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
            </q-list>
        </template>
        <template v-slot:after>
            <div class="q-pa-md">
                <component :is="activeComponent" />
            </div>
        </template>
      </q-splitter>
  </div>
</template>

<script>
import Initial from './Menu-Items/Initial.vue'
import GenCaptions from './Menu-Items/GenCaptions.vue'
import GenCurbside from './Menu-Items/GenCurbside.vue'

export default {
    data() {
        return {
            splitter: 20,
            activeComponent: 'Initial'
        }
    },
    components: {
        Initial,
        GenCaptions,
        GenCurbside
    },
    methods: {
        setActiveComponent(string) {
            this.activeComponent = string
        }
    }
}
</script>

<style>

</style>