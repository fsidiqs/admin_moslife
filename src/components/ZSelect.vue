<template>
  <div class="relative">
    <select :value="value" class="block appearance-none rounded-md w-full text-sm bg-white border-2 border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500" @change="input($event)">
      <option v-show="placeholder !== null" value="" disabled>{{ placeholder }}</option>
      <option v-for="(option, i) in data" :value="option" :key="i">
        {{ option }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg class="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZSelect',
  props: {
    data: Array,
    value: String,
    placeholder: {
      type: String,
      default: null
    }
  },
  methods: {
    input (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
</style>