<template>
  <q-card class="secundo q-my-lg" style="max-width:60vw">
    <q-card-section class="primo text-white text-h6 text-center">
      Automation Tool
    </q-card-section>
    <q-card-section>
      Automation Tool (UI) - A visual update to the Automation Tool. <br />
      <ul>
        <li>All input files should be processed in the same way as with the original tool before uploading (Using R2Net or other tools - See Confluence for more details).</li>
        <li>All output files are the same as those created by the original tool.</li>
        <li>If you encounter an error please send me an email or message on teams containing the error message and a link to the Workfront Issue. (Dylan Moylan | dmoylan@webmd.net)</li>
      </ul>
      Click on an item in the menu to the left to begin.
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="q-my-md text-center text-bold">
        Known Issues
      </div>
      <ul>
        <li><b>Learning Objectives:</b> If a prodticket fails to generate, check the learning objectives in the input file. Replace any special characters at the start of each objective heading (Have increased, Demonstrate Greater, etc).</li>
        <li><b>Contributors: </b>The code for generating contributor groups (all products) isn't implemented yet. They need to be added manually.</li>
        <li>
          <b>Content section: </b>
          <span>There may be some issues with the formatting of tables in the content section. These sections may need to be coded manually or updated. Example:</span> 
          <div class="row items-start justify-center q-py-lg">
            <div>
              <div>Original Table:</div>
              <img 
                src="~/src/assets/content-table.png" 
                style="margin:15px; max-width:500px"
              />
            </div>
            <div>
              <div>Correct Code:</div>
              <img 
                src="~/src/assets/content-table-code-example.png" 
                style="margin:15px; max-width:500px"
              />
            </div>
          </div>
        </li>
      </ul>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="q-my-md text-center">
          <span class="q-mr-md text-positive">
            <q-icon name="check" color="positive" class="q-mr-sm text-body1" />
            <span>Confirmed functional</span>
          </span>
          <span class="q-mr-md text-warning">
            <q-icon name="help" color="warning" class="q-mr-sm text-body1" />
            <span>Added, possible errors.</span>
          </span>
          <span class="q-mr-md text-negative">
            <q-icon
              name="highlight_off"
              color="negative"
              class="q-mr-sm text-body1" />
            <span>Not added.</span>
          </span>
      </div>
      <div>
        <ul class="feature-list">
          <li class="text-positive">
            <q-icon name="check" class="q-mr-sm text-body1"/>
            <span>Generate Captions</span>
          </li>
          <li class="text-positive">
            <q-icon name="check" class="q-mr-sm text-body1"/>
            <span>Generate Clinical Brief</span>
          </li>
          <li class="text-positive">
            <q-icon name="check" class="q-mr-sm text-body1"/>
            <span>Generate Curbside/Spotlight</span>
          </li>
          <li class="text-positive">
            <q-icon name="check" class="q-mr-sm text-body1"/>
            <span>Generate Video Lecture</span>
          </li>
          <li class="text-warning">
            <q-icon name="help" class="q-mr-sm text-body1"/>
            <span>Generate First-Response</span>
          </li>
          <li class="text-warning">
            <q-icon name="help" class="q-mr-sm text-body1"/>
            <span>Generate Test and Teach</span>
          </li>
          <li class="text-negative">
            <q-icon name="highlight_off" class="q-mr-sm text-body1"/>
            <span>Generate Townhall Cert</span>
          </li>
          <li class="text-warning">
            <q-icon name="help" class="q-mr-sm text-body1"/>
            <span>Generate Townhall Enduring</span>
          </li>
          <li class="text-positive">
            <q-icon name="check" class="q-mr-sm text-body1"/>
            <span>Snippets</span>
          </li>
          <li class="text-warning">
            <q-icon name="help" class="q-mr-sm text-body1"/>
            <span>Components: 7/8</span>
          </li>
          <li class="text-negative">
            <q-icon name="highlight_off" class="q-mr-sm text-body1"/>
            <span>Producer</span>
          </li>
          <li class="text-positive">
            <q-icon name="check" class="q-mr-sm text-body1"/>
            <span>Format</span>
          </li>
        </ul>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section style="max-height: 300px;overflow-y:scroll">
        <div class="text-center text-bold">ChangeLog</div>
        <div v-for="(item, index) in changes" :key="`change${index}`">
          <div class="text-bold">
            {{ item.date }}
          </div>
          <div>
            <ul>
              <li v-for="(message, key) in item.messages" :key="`messg${index}-${key}`">{{ message }}</li>
            </ul>
          </div>
        </div>
    </q-card-section>
  </q-card>
</template>

<script>
import ChangeLog from 'src/mixins/changelog'

export default {
  computed: {
    changes() {
      return ChangeLog.sort((a,b)=> (parseInt(a.date.replace(/\./g, '')) > parseInt(b.date.replace('.', ''))) ? - 1 : 1)
    }
  }
}
</script>

<style>
  .feature-list {
    margin: 0;
    padding: 0;
  }
  .feature-list>li {
    list-style: none!important;
  }
</style>