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
    firebase.analytics();
  }
}
</script>
