<template>
   <div class="bg-gray-200">
      <z-navigation></z-navigation>
      <main>
         <section class="text-gray-700 body-font">
            <div class="lg:px-8 lg:py-8 px-5 py-10 mx-auto">
               <div class="flex flex-wrap -m-4 lg:max-w-5xl mx-auto">
                  <div class="w-full p-4">
                     <button
                        @click="exportPrice"
                        class="px-4 py-2 bg-blue-600 text-white focus:outline-none hover:bg-blue-700 rounded text-sm"
                     >
                        Export Template Harga
                     </button>
                     <br /><br />
                     <input
                        type="file"
                        name=""
                        @change="priceFileInputChange($event)"
                     />
                     <button
                        @click="onHandleImportPrice()"
                        class="px-4 py-2 bg-blue-600 text-white focus:outline-none hover:bg-blue-700 rounded text-sm"
                     >
                        Import Harga
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </main>
   </div>
</template>

<script>
import ZNavigation from '@/components/ZNavigation';
import { API } from '../../config/Index';
import { AuthApiPostMultipartFormData } from '../../utils/httpRequests';
// import { AuthApiGet, AuthApiPostMultipartFormData } from '@/utils/httpRequests';
export default {
   data() {
      return {
         priceFile: null,
      };
   },
   components: { ZNavigation },
   methods: {
      async onHandleImportPrice() {
         let importPriceForm = new FormData();
         importPriceForm.append(
            'prices_file',
            this.priceFile,
            this.priceFile.name
         );
         try {
            await AuthApiPostMultipartFormData(
               '/products/import-prices',
               importPriceForm
            );
         } catch (error) {
            console.log(error);
         }
      },
      priceFileInputChange(event) {
         var input = event.target;

         var reader = new FileReader();

         reader.readAsDataURL(input.files[0]);
         this.priceFile = input.files[0];
      },
      exportPrice() {
         window.open(`${API}/products/generate-product-prices-template`);
      },
   },
};
</script>

<style></style>
