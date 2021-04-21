<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import firebaseConfig from '../firebaseConfig.json'
import firebase from 'firebase/app'
import 'firebase/analytics'

export default {
  name: 'App',
  mounted() {
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    if(!/localhost/.test(window.location.href)){
      firebase.analytics();
    }
  }
}
</script>
