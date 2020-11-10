<template>
    <div class="bg-gray-200">
        <z-navigation></z-navigation>
        <main>
            <section class="text-gray-700 body-font">
                <div class="lg:px-8 lg:py-8 px-5 py-10 mx-auto">
                    <div class="flex flex-wrap -m-4 lg:max-w-5xl mx-auto">
                        <!-- Main -->
                        <div class="p-4 md:w-2/3 w-full h-auto">
                            <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Nama Produk</h4>
                                    <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full mb-5" placeholder="Contoh: Nike E300" type="text">
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Deskripsi</h4>
                                    <vue-editor class="border border-gray-400 rounded"></vue-editor>
                                </div>
                            </div>
                            <div v-show="variantToogle !== true" class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengaturan Harga</h4>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Harga Produk</h4>
                                    <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="Rp0.00" type="text">
                                </div>
                            </div>
                            <div v-show="variantToogle !== true" class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengaturan Stok</h4>
                                    <div class="flex lg:flex-no-wrap flex-wrap">
                                        <div class="lg:w-1/2 w-full lg:mr-2 mb-5 lg:mb-0">
                                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">SKU (Stock Keeping Unit)</h4>
                                            <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="" type="text">
                                        </div>
                                        <div class="lg:w-1/2 w-full lg:ml-2">
                                            <h4 class="text-sm text-gray-900 -mt-1 mb-1">Barcode</h4>
                                            <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="" type="text">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-white px-5 py-5 rounded-lg shadow mb-5">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengiriman</h4>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Berat (Per gram)</h4>
                                    <input class="bg-white text-sm rounded border-2 border-gray-400 focus:outline-none focus:border-orange-500 px-3 py-2 w-full" placeholder="Contoh: 1000" type="text">
                                </div>
                            </div>
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
                                    <button class="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-sm w-full">Simpan Produk</button>
                                </div>
                            </div>
                            <div class="bg-white px-5 py-5 rounded-t-lg shadow border-b border-gray-200">
                                <div class="w-full">
                                    <h4 class="text-md text-gray-900 font-semibold pt-2 pb-5 -mt-1 mb-1">Pengaturan Produk</h4>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Tipe Produk</h4>
                                    <z-select class="mb-5" v-model="product_type" :data="['Dropship', 'Konsinyasi', 'PO']" placeholder="Pilih Tipe Produk">
                                    </z-select>
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Brand/Merk</h4>
                                    <z-select v-model="brand" :data="['Nike', 'Adidas']" placeholder="Pilih Brand">
                                    </z-select>
                                </div>
                            </div>
                            <div class="bg-white px-5 py-5 rounded-b-lg shadow border-b border-gray-200">
                                <div class="w-full">
                                    <h4 class="text-sm text-gray-900 -mt-1 mb-1">Departemen/Kategori</h4>
                                    <z-select v-model="category" :data="['Busana Muslim', 'Makanan']" placeholder="Pilih Departemen/Kategori">
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

export default {
    components: { ZNavigation, ZSelect, VueEditor },
    data () {
        return {
            status: 'Draf',
            product_type: '',
            brand: '',
            category: '',

            variantToogle: false
        }
    }
}
</script>

<style scoped>

</style>