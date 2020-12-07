<template>
  <div class="bg-gray-200">
    <z-navigation></z-navigation>
    <main>
      <section class="text-gray-700 body-font">
        <div class="lg:px-8 lg:py-8 px-5 py-10 mx-auto">
          <div class="flex flex-wrap -m-4 lg:max-w-5xl mx-auto">
            <div class="w-full p-4">
              <!-- <button @click="generatePost" class="px-4 py-2 bg-blue-600 text-white focus:outline-none hover:bg-blue-700 rounded text-sm">Generate Data</button>
                            <br/><br/> -->
            </div>
            <!-- Main -->
            <div class="p-4w-full h-auto">
              <!-- Informasi Utama -->
              <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                <div class="w-full">
                  <h4 class="text-sm text-gray-900 -mt-1 mb-1">Export</h4>
                  <button @click="onExportInventoryHandler()">
                    Export stock
                  </button>
                </div>
              </div>
            </div>
            <!-- Sidebar -->
          </div>
        </div>
        <!-- import inventory file -->
        <div class="lg:px-8 lg:py-8 px-5 py-10 mx-auto">
          <div class="flex flex-wrap -m-4 lg:max-w-5xl mx-auto">
            <div class="w-full p-4"></div>
            <!-- Main -->
            <div class="p-4w-full h-auto">
              <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                <div class="w-full">
                  <h4 class="text-sm text-gray-900 -mt-1 mb-1">Import</h4>
                  <input type="file" @change="onSetImportFile($event)" />
                  <button @click="onImportInventoryHandler()">
                    Import stock
                  </button>
                </div>
              </div>
            </div>
            <!-- Sidebar -->
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import ZNavigation from '@/components/ZNavigation';
import { AuthApiGetBlob } from '@/utils/httpRequests';
import { AuthApiPostMultipartFormData } from '../../../utils/httpRequests';

export default {
  components: { ZNavigation },
  name: 'Inventory',
  data() {
    return {
      fileImport: null,
    };
  },
  methods: {
    async onExportInventoryHandler() {
      let resp;
      try {
        resp = await AuthApiGetBlob('/inventory/generate-import-inventory');
      } catch (error) {
        console.log('failed to export file');
        console.log(error);
      }
      const url = window.URL.createObjectURL(new Blob([resp.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inventory-export.xlsx');
      document.body.appendChild(link);
      link.click();
    },
    onSetImportFile(event) {
      var input = event.target;
      console.log(input.files);
      // for (let index = 0; index < input.files.length; index++) {
      var reader = new FileReader();

      // reader.onload = (e) => {

      //this.product_images.imageUrl = e.target.result;
      // this.product_images.push({
      //     imageName: imageNameData,
      //     imageFile: imageFileData,
      //     imageURL: e.target.result
      // })
      // this.product_images.push(e.target.result)

      // }

      reader.readAsDataURL(input.files[0]);
      this.fileImport = input.files[0];
      // }
    },
    async onImportInventoryHandler() {
      const formData = new FormData();
      formData.append('stocks_file', this.fileImport, 'file-import.xlsx');

      try {
        await AuthApiPostMultipartFormData(
          '/inventory/update-stocks',
          formData
        );
      } catch (error) {
        console.log(error);
        alert('import failed');
      }
    },
  },
};
</script>

<style scoped></style>
