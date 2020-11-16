<template>
  <div class="relative">
    <!-- <h1
      v-if="title != undefined"
      class="text-2xl pb-5 font-semibold"
    >
      {{ title }}
    </h1> -->

    <!-- Start Alert Selected Rows -->
    <div
      v-show="selectedRows.length"
      class="bg-blue-300 fixed top-0 left-0 right-0 z-40 w-full shadow"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex md:items-center">
          <div class="mr-4 flex-shrink-0">
            <svg
              class="h-8 w-8 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            v-html="selectedRows.length + ' rows are selected'"
            class="text-blue-800 text-lg"
          ></div>
        </div>
      </div>
    </div>
    <!-- End Alert Selected Rows -->

    <!-- Start Filter -->
    <div class="flex justify-between items-center bg-white rounded-t-lg shadow py-3 px-3">
      <div class="flex-1 pr-4">
        <div class="relative md:w-1/3">
          <input
            @change="TableInputSearchHandler($event)"
            type="search"
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:border-gray-800 text-gray-600 font-medium text-sm"
            value=""
            placeholder="Search..."
          />
          <div class="absolute top-0 left-0 inline-flex items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-400"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <div class="border border-gray-500 rounded-md flex">
          <div class="relative">
            <button
              @click="open = !open"
              class="rounded-md inline-flex items-center bg-white hover:bg-gray-100 focus:bg-gray-200 shadow focus:outline-none text-gray-800 font-medium py-2 px-2 md:px-4 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 md:hidden"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <path
                  d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5"
                />
              </svg>
              <span class="hidden md:block">Filter Columns</span>
              <span class="text-gray-600">
                <svg xmlns='http://www.w3.org/2000/svg' class='w-3 h-3 ml-2 -mr-1 fill-current ionicon' viewBox='0 0 512 512'><title>Caret Down</title><path d='M64 144l192 224 192-224H64z'/></svg>
              </span>
              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 ml-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                <polyline points="6 9 12 15 18 9" />
              </svg> -->
            </button>

            <div
              v-show="open"
              @click="open = false"
              class="z-40 absolute top-0 right-0 w-40 bg-white rounded-lg shadow-md mt-12 -mr-1 block py-1 overflow-hidden"
            >
              <label
                v-for="(column, i) in columns"
                :key="i"
                class="flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2"
              >
                <div class="text-blue-600 mr-3">
                  <input
                    type="checkbox"
                    class="form-checkbox focus:outline-none"
                    checked
                    @click="toggleColumn(column.field)"
                  />
                </div>
                <div class="select-none text-gray-700">{{ column.label }}</div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Filter -->

    <!-- Start List Table -->
    <div
      class="overflow-x-auto bg-white rounded-b-lg shadow overflow-y-auto relative"
    >
      <table
        class="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative"
      >
        <!-- Heading -->
        <thead>
          <tr class="text-left">
            <th
              class="py-2 px-3 sticky top-0 border-b border-gray-300 bg-white"
            >
              <label
                class="text-blue-600 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  class="form-checkbox focus:outline-none"
                  @click="selectAllCheckbox($event)"
                />
              </label>
            </th>
            <th
              v-for="(column, i) in columns"
              :key="i"
              class="bg-white sticky top-0 border-b border-gray-300 px-3 py-2 text-gray-800 font-bold tracking-wider uppercase text-xs text-left"
              :ref="column.field"
              :class="{ [column.field]: true }"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <!-- Body -->
        <tbody>
          <tr v-show="data.length === 0">
            <td colspan="8" class="py-10">
              <half-circle-spinner
                :animation-duration="1000"
                :size="40"
                color="#3d3d3d"
                class="mx-auto"
              />
            </td>
          </tr>
          <tr v-for="(row, i) in data" :key="i">
            <td class="border-dashed border-t border-gray-200 px-3">
              <label
                class="text-blue-600 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  class="form-checkbox rowCheckbox focus:outline-none"
                  @click="getRowDetail($event, row.id)"
                />
              </label>
            </td>
            <template v-for="col in columns">
              <td
                v-if="typeof $scopedSlots[col.field] !== 'undefined'"
                :key="col.id"
                class="border-dashed border-t border-gray-200 px-3 py-2"
              >
                <slot :name="col.field" :field="col.field" :item="row"></slot>
              </td>
              <td v-else :key="col.id" class="border-dashed border-t border-gray-200 px-3 py-2">
                {{ row[col.field] }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <!-- End List Table -->

      <!-- Pagination -->
      <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-300 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <a
            href="#"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Previous
          </a>
          <a
            href="#"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Next
          </a>
        </div>
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm leading-5 text-gray-700">
              Showing
              <span class="font-medium">1</span>
              to
              <span class="font-medium" v-if="metadata.total >= 10">10</span>
              <span class="font-medium" v-else>{{ metadata.total }}</span>
              of
              <span class="font-medium">{{ metadata.total }}</span>
              results
            </p>
          </div>
          <div>
            <a
              @click="PageNavHandler('previous')"
              href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              Previous
            </a>
            <a
              @click="PageNavHandler('next')"
              href="#"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              Next
            </a>
          </div>
        </div>
      </div>
      <!-- Pagination -->
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners';

export default {
  components: { HalfCircleSpinner },
  props: {
    data: { default: () => [], type: [Array, Function] },
    PageNavHandler: { default: () => {}, type: Function },
    TableInputSearchHandler: { default: () => ()=>{}, type: Function },
    columns: {
      type: Array,
      required: true,
    },
    metadata: { default: () => [], type: [Array, Function] },

    //title: String,
  },
  data() {
    return {
      open: false,
      selectedRows: [],
    };
  },
  methods: {
    // toggleColumn(key) {
    //     // Note: All td must have the same class name as the headings key!
    //     let columns = document.querySelectorAll('.' + key);

    //     if (this.$refs[key].classList.contains('hidden') && this.$refs[key].classList.contains(key)) {
    //         columns.forEach(column => {
    //             column.classList.remove('hidden');
    //         });
    //     } else {
    //         columns.forEach(column => {
    //             column.classList.add('hidden');
    //         });
    //     }
    // },
    toggleColumn(key) {
      console.log(key);
    },
    getRowDetail($event, id) {
      let rows = this.selectedRows;

      if (rows.includes(id)) {
        let index = rows.indexOf(id);
        rows.splice(index, 1);
      } else {
        rows.push(id);
      }
    },
    selectAllCheckbox($event) {
      let columns = document.querySelectorAll('.rowCheckbox');

      this.selectedRows = [];

      if ($event.target.checked == true) {
        columns.forEach((column) => {
          column.checked = true;
          this.selectedRows.push(parseInt(column.name));
        });
      } else {
        columns.forEach((column) => {
          column.checked = false;
        });
        this.selectedRows = [];
      }

      console.log(this.title);
    },
  },
};
</script>

<style scoped>
[type='checkbox'] {
  box-sizing: border-box;
  padding: 0;
}

.form-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  color: currentColor;
  background-color: #fff;
  border-color: #e2e8f0;
  border-width: 1px;
  border-radius: 0.25rem;
  height: 1.2em;
  width: 1.2em;
}

.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>