<template>
    <div class="bg-gray-200">
        <z-navigation></z-navigation>
        <div class="px-16 py-12">
            <ZTable
                :data="paginatedData.elements"
                :columns="columns"
                :PageNavHandler="pageNavHandler"
                :TableInputSearchHandler="tableInputSearchHandler"
                title="Products"
            >
                <template slot="product_images" slot-scope="props">
                    <div v-for="(image, i) in props.item.product_images" :key="i">
                        <div v-if="i === 0">
                            <img :src="image.product_image.url" width="100" />
                        </div>
                    </div>
                </template>
                <template slot="ID" slot-scope="props">
                    <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 mr-2"
                    >
                        Edit {{ props.item.ID }}
                    </a>
                    <a
                        href="#"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                    >
                        Delete {{ props.item.ID }}
                    </a>
                </template>
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
        {{ paginatedData }}
    </div>
</template>

<script>
import ZNavigation from '@/components/ZNavigation'
import ZTable from '@/components/ZTable'
import { AuthApiGet } from '@/utils/httpRequests'

export default {
    components: { ZNavigation, ZTable },
    data () {
        return {
            paginatedData: {},
            //table
            columns: [
                // {
                //     id: 1,
                //     field: 'ID',
                //     label: 'ID',
                //     visibility: true,
                // },
                {
                    id: 2,
                    field: 'name',
                    label: 'Nama',
                    visibility: true,
                },
                {
                    id: 3,
                    field: 'product_images',
                    label: 'Foto Produk',
                    visibility: true,
                },
                {
                    id: 4,
                    field: 'ID',
                    label: 'Aksi',
                    visibility: true,
                },
            ],
            sortField: 'id',
            sortOrder: 'desc',
            perPage: 10,
            page: 1,
            //end table
        }
    },
    created () {
        this.getResellers(this.page, this.perPage)
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