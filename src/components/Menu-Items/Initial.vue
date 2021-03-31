<template>
  <q-card class="secundo q-my-lg" style="max-width:60vw">
    <q-card-section class="primo text-white text-h6 text-center">
      Automation Tool
    </q-card-section>
    <q-card-section>
      Automation Tool (UI) - A visual update to the Automation Tool. <br />
      <ul>
        <li>All input files should be processed in the same way as with the original tool before uploading<br />(Using R2Net or other tools - See Confluence for more details).</li>
        <li>All output files are the same as those created by the original tool.</li>
      </ul>
      Click on an item in the menu to the left to begin.
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div>	
        <div class="text-center text-bold">ChangeLog</div>
        <div>
          <span class="text-bold">[3.31.2021]</span>
          <span>
            Enables First-Response and test-and-teach Generators (Experimental).<br />
            Adds some additional error handling, bad tickets will cause less silent failures.
          </span>
        </div>
        <div>
          <span class="text-bold">[3.30.2021]</span>
          <span>
            Adds some new component generators, Snippet generators<br /> for Slide TOCs/Downloadable Slides, and adds copy/reset buttons to a few sections.
          </span>
        </div>
        <div>
          <span class="text-bold">[3.29.2021]</span>
          <span>
            Experimental Version. Some features may be incomplete.
          </span>
        </div>
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
            <li class="text-warning">
              <q-icon name="help" class="q-mr-sm text-body1"/>
              <span>Generate Clinical Brief</span>
            </li>
            <li class="text-warning">
              <q-icon name="help" class="q-mr-sm text-body1"/>
              <span>Generate Curbside/Spotlight</span>
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
              <span>Generate Video Lecture</span>
            </li>
            <li class="text-negative">
              <q-icon name="highlight_off" class="q-mr-sm text-body1"/>
              <span>Generate Townhall Enduring/Cert</span>
            </li>
            <li class="text-positive">
              <q-icon name="check" class="q-mr-sm text-body1"/>
              <span>Snippets</span>
            </li>
            <li class="text-warning">
              <q-icon name="help" class="q-mr-sm text-body1"/>
              <span>Components: 5/8</span>
            </li>
            <li class="text-negative">
              <q-icon name="highlight_off" class="q-mr-sm text-body1"/>
              <span>Producer</span>
            </li>
            <li class="text-negative">
              <q-icon name="highlight_off" class="q-mr-sm text-body1"/>
              <span>Format</span>
            </li>
          </ul>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {

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