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
        <li>If you encounter an error please send me an email or message on teams containing the error message and file you were trying to process (Dylan Moylan | dmoylan@webmd.net)</li>
      </ul>
      Click on an item in the menu to the left to begin.
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
          <li class="text-warning">
            <q-icon name="help" class="q-mr-sm text-body1"/>
            <span>Generate Video Lecture</span>
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
        <div>
          <span class="text-bold">[4.13.2021]</span>
          <span>
            <ul>
              <li>Updates Clinical Brief goal statement to pull from the prodticket instead of a default statement.</li>
              <li>Updates Clinical Brief to include IPCE additional credit section in activity xml.</li>
              <li>Adds missing TOC label to References XML section.</li>
              <li>Transcripts now include "This is a verbatim transcript..." or "This transcript has been edited..." depending on ticket contents.</li>
              <li>Clinical Brief no longer includes an empty abbreviations section if none exists.</li>
              <li>Fixes an issue with Learning Objectives where "participants will" was being included in the objectives.</li>
            </ul>
          </span>
        </div>
        <div>
          <span class="text-bold">[4.6.2021]</span>
          <span>
            <ul>
              <li>Adds Video Lecture Generator.</li>
              <li>Adds TownHall Enduring Generator.</li>
              <li>Fixes a bug that was preventing submission unless transcript was checked in certain generators.</li>
            </ul>
          </span>
        </div>
        <div>
          <span class="text-bold">[4.5.2021]</span>
          <span>
            <ul>
              <li>Enables Format-Learning Objectives.</li>
              <li>Fixes CB not finding Article/Activity Title</li>
              <li>Fixes CB Clinical Implications section</li>
              <li>Adds nbsp below media code</li>
              <li>Hides content below contributors if peer reviewer isn't checked.</li>
              <li>Fixes the order of references, abbrevs, and content in curbside TOCs.</li>
              <li>Removes "Main Content" from transcript.</li>
              <li>Fixes some issues finding collection page titles.</li>
            </ul>
          </span>
        </div>
        <div>
          <span class="text-bold">[3.31.2021]</span>
          <span>
            <ul>
              <li>Enables First-Response and test-and-teach Generators (Experimental).</li>
              <li>Adds some additional error handling, bad tickets will cause less silent failures.</li>
            </ul>
          </span>
        </div>
        <div>
          <span class="text-bold">[3.30.2021]</span>
          <span>
            <ul>
              <li>Adds some new component generators</li>
              <li>Adds some Snippet generators for Slide TOCs/Downloadable Slides</li>
              <li>Adds copy/reset buttons to a few sections.</li>
            </ul>
          </span>
        </div>
        <div>
          <span class="text-bold">[3.29.2021]</span>
          <span>
            <ul>
              <li>First Release: Experimental Version. Some features may be incomplete.</li>
            </ul>
          </span>
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