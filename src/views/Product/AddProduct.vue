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
                        <div class="p-4 md:w-2/3 w-full h-auto">
                            <!-- Informasi Utama -->
                            <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Nama Produk</h4>
                                    <input v-model="product_name" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Contoh: Nike E300" type="text">
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Deskripsi</h4>
                                    <vue-editor v-model="desc" class="border border-gray-400 rounded"></vue-editor>
                                </div>
                            </div>
                            <!-- Informasi Media -->
                            <div v-show="variantToogle !== true" class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Media</h4>

                                    <template v-if="product_images.length !== 0">
                                        <div class="grid grid-cols-3 gap-2">
                                            <div v-for="(image, i) in product_images" :key="i">
                                                <div class="flex flex-wrap items-center justify-center w-full rounded-lg border border-gray-400 overflow-hidden" style="height: 195px">
                                                    <img :src="image.imageURL" width="152" class="w-48 h-48 object-contain object-center" />
                                                </div>
                                            </div>
                                            <div>
                                                <input name="photo" id="screenshot" accept="image/*" class="hidden" type="file" multiple @change="uploadFile">
                                                <label 
                                                    for="screenshot"
                                                    type="button"
                                                    class="w-full cursor-pointer focus:outline-none border-dashed border-2 border-gray-400 flex flex-col justify-center items-center rounded-lg shadow-sm text-left text-gray-600 hover:bg-gray-100 font-medium"
                                                    style="height: 195px"
                                                >
                                                    <svg class="w-8 h-8 -mt-1 mb-2 ionicon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>File Tray</title><path d='M384 80H128c-26 0-43 14-48 40L48 272v112a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48V272l-32-152c-5-27-23-40-48-40z' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M48 272h144M320 272h144M192 272a64 64 0 00128 0'/></svg>			
                                                    <span class="text-gray-800 font-semibold">Upload File</span>
                                                    <div class="text-gray-500 text-xs mt-1">Klik untuk upload file</div>
                                                </label>
                                            </div>
                                        </div>
                                    </template>

                                    <!-- Upload Media -->
                                    <template v-else>
                                        <input name="photo" id="screenshot" accept="image/*" class="hidden" type="file" multiple @change="uploadFile">
                                        <label 
                                            for="screenshot"
                                            type="button"
                                            class="w-full cursor-pointer focus:outline-none border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center rounded-lg shadow-sm text-left text-gray-600 hover:bg-gray-100 font-medium"
                                        >
                                            <svg class="w-8 h-8 -mt-1 mb-2 ionicon" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>File Tray</title><path d='M384 80H128c-26 0-43 14-48 40L48 272v112a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48V272l-32-152c-5-27-23-40-48-40z' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M48 272h144M320 272h144M192 272a64 64 0 00128 0'/></svg>			
                                            <span class="text-gray-800 font-semibold">Upload File</span>
                                            <div class="text-gray-500 text-xs mt-1">Klik untuk upload file</div>
                                        </label>
                                    </template>
                                </div>
                            </div>
                            <!-- Informasi Harga -->
                            <div v-show="variantToogle !== true" class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengaturan Harga</h4>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Harga Produk</h4>
                                    <input v-model.number="single_product_detail.harga_jual" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="Rp0.00" type="text">
                                </div>
                            </div>
                            <!-- Informasi Stok -->
                            <div v-show="variantToogle !== true" class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengaturan Stok</h4>
                                    <div class="flex lg:flex-no-wrap flex-wrap">
                                        <div class="lg:w-1/2 w-full lg:mr-2 mb-5 lg:mb-0">
                                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">SKU (Stock Keeping Unit)</h4>
                                            <input v-model="sku" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="" type="text">
                                        </div>
                                        <div class="lg:w-1/2 w-full lg:ml-2">
                                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Barcode</h4>
                                            <input v-model="barcode" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="" type="text">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Informasi Pengiriman -->
                            <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengiriman</h4>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Berat (Per gram)</h4>
                                    <input v-model.number="single_product_detail.weight" class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="Contoh: 1000" type="text">
                                </div>
                            </div>
                            <!-- Informasi Variant -->
                            <div class="bg-white px-5 py-5 rounded-t-lg shadow border-b border-gray-200" :class="variantToogle ? 'rounded-t-lg' : 'rounded-lg'">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Variant Produk</h4>
                                    <div class="flex items-center">
                                        <input id="checkbox" v-model="variantToogle" type="checkbox" class="form-checkbox h-5 w-5 text-orange-500 transition duration-150 focus:shadow-none border-2 border-orange-500 focus:border-orange-500 ease-in-out">
                                        <label for="checkbox" class="ml-2 block text-sm leading-5 text-gray-900">
                                            Aktifkan Variasi Produk
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div v-show="variantToogle" class="bg-white px-5 py-5 rounded-b-lg shadow border-b border-gray-200">
                                <div class="w-full">
                                    <div class="bg-gray-100">
                                        <div class="flex items-center py-2 px-3 border-b border-gray-300">
                                            <div><h4 class="text-sm font-semibold">Variasi 1</h4></div>
                                            <div class="ml-auto">
                                                <button @click="variantToogle = false" class="text-gray-800 hover:text-red-500 flex items-center focus:outline-none">
                                                    <svg class="ionicon w-5 w-5" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Close</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/></svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="px-5 py-5 mb-3">
                                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Nama Variasi</h4>
                                            <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-3" placeholder="Contoh: Warna/Ukuran" type="text">
                                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Pilihan Variasi</h4>
                                            <div class="inline-flex w-full mb-3">
                                                <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="Contoh: Merah/Biru/XL/XXL" type="text">
                                                <button @click="variantToogle = false" class="text-white bg-red-500 border-0 py-2 px-3 focus:outline-none hover:bg-red-600 rounded text-sm ml-1">
                                                    <svg class="ionicon w-5 w-5" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Trash</title><path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/><path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                                </button>
                                            </div>
                                            <button class="inline-flex items-center justify-center text-orange-500 border-dashed border-2 border-orange-500 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-sm w-full">
                                                <svg class="ionicon w-5 w-5" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Add Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 176v160M336 256H176'/></svg>
                                                <span class="ml-2">Tambahkan Pilihan</span>
                                            </button>
                                        </div>
                                    </div>
                                    <button class="inline-flex items-center justify-center text-orange-500 border-dashed border-2 border-orange-500 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-sm w-full">
                                        <svg class="ionicon w-5 w-5" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Add Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 176v160M336 256H176'/></svg>
                                        <span class="ml-2">Tambah Variasi</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Sidebar -->
                        <div class="p-4 md:w-1/3 w-full h-auto">
                            <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Status Produk</h4>
                                    <z-select class="mb-5" v-model="status" :data="['Draf', 'Aktif']">
                                    </z-select>
                                    <button @click="createProduct" class="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-sm w-full">Simpan Produk</button>
                                </div>
                            </div>
                            <div class="bg-white px-5 py-5 rounded-t-lg shadow border-b border-gray-200">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengaturan Produk</h4>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Tipe Produk</h4>
                                    <z-select class="mb-5" v-model="product_type" :data="typeOptions" placeholder="Pilih Tipe Produk">
                                    </z-select>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Brand/Merk</h4>
                                    <z-select v-model="brand" :data="brandOptions" placeholder="Pilih Brand">
                                    </z-select>
                                </div>
                            </div>
                            <div class="bg-white px-5 py-5 rounded-b-lg shadow border-b border-gray-200">
                                <div class="w-full">
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Departemen/Kategori</h4>
                                    <z-select v-model="category" :data="categoryOptions" placeholder="Pilih Departemen/Kategori">
                                    </z-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import ZNavigation from '@/components/ZNavigation'
import ZSelect from '@/components/ZSelect'
import { VueEditor } from "vue2-editor";
import { AuthApiGet, AuthApiPost } from '@/utils/httpRequests'

export default {
    components: { ZNavigation, ZSelect, VueEditor },
    data () {
        return {
            // Product Information
            product_name: '',
            desc: '',
            //price: '', ---
            sku: '',
            barcode: '',
            //weight: '', ---
            product_images: [],
            single_product_detail: {
                weight: null,
                harga_jual: null
            },

            // Product Setting
            status: 'Draf',
            product_type: null,
            brand: null,
            category: null,

            // Product Variant
            variantToogle: false,
            variant_product_detail: [],

            // Data Category, Brand, Type, and Kind
            categoryData: [],
            categoryOptions: [],
            brandData: [],
            brandOptions: [],
            typeData: [],
            typeOptions: [],
            kindData: [],
            kindOptions: [],

            generatePostData: []
        }
    },
    created () {
        this.getCategory()
        this.getBrand()
        this.getType()
        this.getKind()
    },
    methods: {
        async getCategory () {
            let res
            
            try {
                res = await AuthApiGet('/products/categories');
            } catch (error) {
                console.log(error)
            }
            
            this.categoryData = res.data.data;

            for(var i=0; i < this.categoryData.length; i++){
                this.categoryOptions.push({
                    label: this.categoryData[i].name,
                    value: this.categoryData[i].ID
                })
            }
        },
        async getBrand () {
            let res
            
            try {
                res = await AuthApiGet('/products/brands');
            } catch (error) {
                console.log(error)
            }
            
            this.brandData = res.data.data;

            for(var i=0; i < this.brandData.length; i++){
                this.brandOptions.push({
                    label: this.brandData[i].name,
                    value: this.brandData[i].ID
                })
            }
        },
        async getType () {
            let res
            
            try {
                res = await AuthApiGet('/products/product_types');
            } catch (error) {
                console.log(error)
            }
            
            this.typeData = res.data.data;

            for(var i=0; i < this.typeData.length; i++){
                this.typeOptions.push({
                    label: this.typeData[i].name,
                    value: this.typeData[i].ID
                })
            }
        },
        async getKind () {
            let res
            
            try {
                res = await AuthApiGet('/products/product_kinds');
            } catch (error) {
                console.log(error)
            }
            
            this.kindData = res.data.data;

            for(var i=0; i < this.kindData.length; i++){
                this.kindOptions.push({
                    label: this.kindData[i].name,
                    value: this.kindData[i].ID
                })
            }
        },
        generatePost () {
            this.generatePostData = []

            this.generatePostData.push({
                product_name: this.product_name,
                desc: this.desc,
                sku: this.sku,
                barcode: this.barcode,
                product_images: this.product_images,
                single_product_detail: this.single_product_detail,

                status: this.status,
                product_type: this.product_type,
                brand: this.brand,
                category: this.category
            })
        },
        uploadFile () {
            // console.log(event.target.files.length);
            var input = event.target;

            for (var i = 0; i < input.files.length; i++) {
                //alert(input[i].name);

                // this.product_images.push({
                //     imageName: input.files[i].name,
                //     imageFile: input.files[i],
                //     imageURL: null
                // })

                let imageNameData = input.files[i].name
                let imageFileData = input.files[i]

                if (input.files && input.files[i]) {

                    var reader = new FileReader();

                    reader.onload = (e) => {
                    
                        //this.product_images.imageUrl = e.target.result;
                        console.log(e)
                        this.product_images.push({
                            imageName: imageNameData,
                            imageFile: imageFileData,
                            imageURL: e.target.result
                        })

                    }

                    reader.readAsDataURL(input.files[i]);
                
                }
            }
        },
        async createProduct () {
            // brand_id: 1, // done
            // category_id: 1, // done
            // product_type_id: 1, // done
            // product_kind_id: 1, // done
            // name: "product input single", // done
            // description: "abcde", // done
            // sku: "sku2", // done

            // product_images: JSON.stringify( // done
            //     [
            //         {
            //             url: "fffffffffffffffffff"
            //         },
            //         {
            //             url: "product input single image 2"
            //         },
            //     ]
            // ),
            // status: 9, // done
            // single_product_detail: JSON.stringify({ // done
            //     weight: 100,
            //     harga_jual: 123123.333
            // }) 10
            let res

            let data = new FormData()

            // data.set('name', this.product_name)
            // data.set('description', this.desc)
            // data.set('sku', this.sku)
            // data.set('brand_id', this.brand)
            // data.set('category_id', this.category)
            // data.set('product_type_id', this.product_type)
            // data.set('product_kind_id', this.product_kind)
            // data.set('product_images', this.product_images)
            // data.set('status', this.status)
            // data.set('single_product_detail', this.single_product_detail)
            const singleProduct = {
                brand_id: parseInt(this.brand),
                category_id: parseInt(this.category),
                product_type_id: parseInt(this.product_type),
                product_kind_id: parseInt(this.product_kind),
                name: this.product_name,
                description: this.desc,
                sku: this.sku,
                single_product_detail: JSON.stringify(this.single_product_detail)
            }
            data.append('product_images', this.product_images)
            data.append('product', JSON.stringify(singleProduct))

            try {
                res = await AuthApiPost('/products/create-product-basic-structure', data);
            } catch (error) {
                console.log(error)
            }

            console.log(res)
        }
    }
}
</script>

<style scoped>

</style>