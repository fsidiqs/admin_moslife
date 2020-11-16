<template>
    <div class="bg-gray-200">
        <z-navigation></z-navigation>
        <div class="px-16 py-12">
            <div class="flex justify-between">
                <div>
                    <h1 class="text-xl pb-5 font-semibold text-gray-700">Products</h1>
                </div>
                <div>
                    <button class="text-sm px-4 py-2 focus:outline-none">Export</button>
                    <button class="text-sm px-4 py-2 focus:outline-none mr-5">Import</button>
                    <button @click="$router.push('/product/add')" class="relative inline-flex items-center px-4 py-2 text-sm leading-5 font-medium rounded-md text-white bg-green-700 hover:bg-green-600 hover:text-gray-100 focus:outline-none focus:shadow-outline-green focus:border-green-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        Tambah Produk
                    </button>
                </div>
            </div>
            <ZTable
                :data="info"
                :columns="columns"
                :PageNavHandler="pageNavHandler"
                :TableInputSearchHandler="tableInputSearchHandler"
                title="Tutorials"
            >
                <!-- <template slot="product_images" slot-scope="props">
                    <div v-for="(image, i) in props.item.product_images" :key="i">
                        <div v-if="i === 0">
                            <img :src="image.product_image.url" width="100" />
                        </div>
                    </div>
                </template>
                <template slot="ID" slot-scope="props">
                    <button
                        @click="router.push(props.item.ID)"
                        class="relative inline-flex items-center bg-gray-800 px-3 py-2 shadow text-xs leading-5 font-medium rounded-md text-white bg-white hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 mr-2"
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' class='fill-current w-4 h-4 ionicon' viewBox='0 0 512 512'><title>Create</title><path d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z'/></svg>
                        <span class="ml-1">Edit</span>
                    </button>
                    <button
                        @click="router.push(props.item.ID)"
                        class="relative inline-flex items-center bg-red-800 px-3 py-2 shadow text-xs leading-5 font-medium rounded-md text-white bg-white hover:bg-red-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 mr-2"
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' class='fill-current w-4 h-4 ionicon' viewBox='0 0 512 512'><title>Trash</title><path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/><path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                        <span class="ml-1">Hapus</span>
                    </button>
                </template>
                <template slot="brand" slot-scope="props">
                    {{ props.item.brand.name }}
                </template>
                <template slot="category" slot-scope="props">
                    {{ props.item.category.name }}
                </template> -->
                <!-- <template slot="name" slot-scope="props">
                    <input
                        type="button"
                        :value="props.item.name"
                        @click="toResellerHandler(props.item.id)"
                    />
                </template>
                <template slot="role" slot-scope="props">
                    {{ props.item.role.role_name }}
                </template> -->
            </ZTable>
        </div>
        <!-- {{ paginatedData.metadata }} -->
    </div>
</template>

<script>
import axios from 'axios'
import ZNavigation from '@/components/ZNavigation'
import ZTable from '@/components/ZTable'
import { AuthApiGet } from '@/utils/httpRequests'

export default {
    components: { ZNavigation, ZTable },
    data () {
        return {
            paginatedData: {},
            //table
            // columns: [
            //     // {
            //     //     id: 1,
            //     //     field: 'ID',
            //     //     label: 'ID',
            //     //     visibility: true,
            //     // },
            //     {
            //         id: 2,
            //         field: 'product_images',
            //         label: 'Gambar',
            //         visibility: true,
            //     },
            //     {
            //         id: 3,
            //         field: 'name',
            //         label: 'Nama Produk',
            //         visibility: true,
            //     },
            //     {
            //         id: 4,
            //         field: 'brand',
            //         label: 'Brand',
            //         visibility: true,
            //     },
            //     {
            //         id: 5,
            //         field: 'category',
            //         label: 'Kategori',
            //         visibility: true,
            //     },
            //     {
            //         id: 6,
            //         field: 'ID',
            //         label: 'Aksi',
            //         visibility: true,
            //     },
            // ],
            columns: [
                // {
                //     id: 1,
                //     field: 'id',
                //     label: 'ID',
                //     visibility: true,
                // },
                {
                    id: 2,
                    field: 'title',
                    label: 'Judul',
                    visibility: true,
                },
                {
                    id: 3,
                    field: 'description',
                    label: 'Deskripsi',
                    visibility: true,
                },
                {
                    id: 4,
                    field: 'published',
                    label: 'Status',
                    visibility: true,
                },
                {
                    id: 5,
                    field: 'createdAt',
                    label: 'Tanggal Dibuat',
                    visibility: true,
                },
            ],
            sortField: 'id',
            sortOrder: 'desc',
            perPage: 10,
            page: 1,
            //end table
            info: null
        }
    },
    created () {
        //this.getResellers(this.page, this.perPage)
        axios
            .get('http://localhost:4000/api/tutorials')
            .then(response => (this.info = response.data))
    },
    methods: {
        async getResellers(p_page, p_limit) {

            let preload = ["belongs_to", "product_type", "product_image", "product_detail", "price"]

            let preload_filter = JSON.stringify(preload)

            const params = {
                p_page,
                p_limit,
                preload: preload_filter,
                // email_filter: emailFilter,
            };
            
            let res
            
            try {
                res = await AuthApiGet('/products', params);
            } catch (error) {
                console.log(error)
            }
            
            this.paginatedData = res.data.data;
        },
        // pageNavHandler(type) {
        //     switch (type) {
        //         case 'previous':
        //             this.page -= 1;
        //             this.getResellers(this.page, this.perPage);
        //         break;
        //         case 'next':
        //             this.page += 1;
        //             this.getResellers(this.page, this.perPage);
        //         break;
        //     }
        // },
        // tableInputSearchHandler(event) {
        //     const value = event.target.value;
        //     if (value === '') this.getResellers(this.page, this.perPage);
        //     else this.getResellers(1, 1, event.target.value);
        // },
        // toResellerHandler(resellerID) {
        //     this.$router.push('/reseller/' + resellerID + '/edit');
        // },
    }
}
</script>

<style scoped>

</style>