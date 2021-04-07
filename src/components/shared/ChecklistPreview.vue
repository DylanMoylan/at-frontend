<template>
    <div>
        <template v-if="output">
            <div class="q-my-md text-white text-h6 q-ml-lg">Preview:</div>
            <q-card 
                class="q-mt-md q-pa-md preview q-mx-lg at-preview"
            >
                <code>{{output.checklistHTML}}</code>
            </q-card>
        </template>
    </div>
</template>

<script>
export default {
    props: ['output']
}
</script>

<style>

</style>