# Automation Tool UI (automationtoolui)

A user interface for the Automation Tool

## Set up environment

- Project uses firebase for hosting: see [Firebase CLI Reference](https://firebase.google.com/docs/hosting/quickstart)

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```
### Run test watchers:
Run tests continiously on each save:
```bash
npm run watch
```
or run single pass:
```bash
npm test
```

### Build the app for production
```bash
quasar build
```


### Deploy
```bash
firebase deploy
```
- **Note:** Requires public hosting directory in firebase CLI to be set to ```<project dir>/dist/spa```. This is configured in firebase.json

### Git Flow
Squash and rebase commit flow: 
- Create new branch
- Code and commit changes. Write tests if possible.
- Get the number of commits from the start of the branch:
```bash
git log --graph --decorate --pretty=oneline --abbrev-commit
```
- Rebase to initial commit:
```bash
git rebase --interactive [commit SHA code]
```
- Push branch
- Start pull request. Github actions runs automated tests. Passing tests are required for merge.

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
