<template>
  <div class="bg-gray-200">
    <z-navigation></z-navigation>

    <div>
      <div>
        brand produk
      </div>
      <z-select
        class="mb-5"
        v-model.number="dataProduct.brand_id"
        :data="dataProductBrands"
        placeholder="Pilih Tipe Produk"
      >
      </z-select>
    </div>
    <div>
      <div>
        category produk
      </div>
      <z-select
        class="mb-5"
        v-model.number="dataProduct.category_id"
        :data="dataProductCategories"
        placeholder="Pilih Tipe Produk"
      >
      </z-select>
    </div>
    <div>
      <div>
        tipe produk
      </div>
      <z-select
        class="mb-5"
        v-model.number="dataProduct.product_type_id"
        :data="dataProductTypes"
        placeholder="Pilih Tipe Produk"
      >
      </z-select>
    </div>

    <div>
      <div>
        name
      </div>
      <input type="text" v-model="dataProduct.name" />
    </div>
    <div>
      <div>
        description
      </div>

      <input type="text" v-model="dataProduct.description" />
    </div>

    <div v-for="(image, idx) in dataProduct.product_images" :key="idx">
      <img :src="image.product_image.url" alt="" srcset="" />
    </div>
    <br />
    variant_product: <br /><br />
    <template v-if="dataProduct.product_kind_id === 2">
      <div
        style="margin-left:40px"
        v-for="item in dataProduct.items"
        :key="item.ID"
      >
        <br />sku: <br />
        <input type="text" name="" v-model="item.sku" /><br />
        weight: <br />
        <input type="text" name="" v-model.number="item.weight" /><br />
        <br />
        <div
          style="margin-left:40px"
          v-for="price in item.prices"
          :key="price.ID"
        >
          price name: <br />
          <label>{{ price.name }}</label>
          <br />
          value: <br />
          <input type="text" name="" v-model.number="price.value" /><br />

          <br />
        </div>
        <br />
        <div
          style="margin-left:40px"
          v-for="variant in dataProduct.variants"
          :key="variant.ID"
        >
          variant name: <br />
          <input type="text" name="" v-model="variant.name" /><br />

          <div
            style="margin-left:40px"
            v-for="option in variant.options"
            :key="option.ID"
          >
            option name: <br />
            <input type="text" name="" v-model="option.name" /><br />

            <br />
          </div>

          <br />
        </div>
      </div>
    </template>

    <input type="button" value="Update" @click="onUpdateHandler" />
  </div>
</template>

<script>
/* eslint-disable */
import { cloneDeep } from 'lodash';
import ZNavigation from '@/components/ZNavigation';
import ZSelect from '../../components/ZSelect.vue';
import {
  PopulateBrand,
  PopulateType,
  PopulateProduct,
  PopulateCategory,
} from '../../utils/productApi';
import { AuthApiPutMultipartFormData } from '../../utils/httpRequests';
export default {
  components: { ZNavigation, ZSelect },
  data() {
    return {
      dataProduct: {},
      dataProductTypes: [],
      dataProductBrands: [],
      dataProductCategories: [],
    };
  },
  async created() {
    this.dataProductTypes = await PopulateType();
    this.dataProductBrands = await PopulateBrand();
    this.dataProductCategories = await PopulateCategory();
    const productParams = {
      p_page: 1,
      p_limit: 1,
      preload: JSON.stringify([
        'belongs_to',
        'product_image',
        'product_detail',
      ]),
      product_id_arr: JSON.stringify([Number(this.$route.params.product_id)]),
    };
    this.dataProduct = await PopulateProduct(productParams);
  },
  methods: {
    async onUpdateHandler() {
      const dataProduct = cloneDeep(this.dataProduct);

      // if (dataProduct.product_kind_id == 2) {
      //   let apiVariantProducts = [];
      //   let apiOptions = [];
      //   let apiVariants = [];

      //   apiVariantProducts = dataProduct.variant_product.map((vp) => {
      //     return {
      //       id: vp.ID,
      //       product_id: vp.product_id,
      //       sku: vp.sku,
      //       weight: vp.weight,
      //     };
      //   });

      //   apiVariants = dataProduct.variants.map((variant) => {
      //     variant.options.forEach((option) => {
      //       apiOptions.push({
      //         id: option.ID,
      //         variant_id: option.variant_id,
      //         variant_product_id: 3,
      //         name: option.name,
      //       });
      //     });

      //     return {
      //       id: variant.ID,
      //       product_id: variant.product_id,
      //       name: variant.name,
      //     };
      //   });
      //   // apiOptions = dataProduct.variants.map((variant) => {
      //   //   return variant.options;
      //   // });
      //   const ProductDetail = {
      //     details: JSON.stringify(apiVariantProducts),
      //     options: JSON.stringify(apiOptions),
      //     variants: JSON.stringify(apiVariants),
      //   };

      //   apiProductResp = {
      //     ...apiProductResp,
      //     product_detail: JSON.stringify(ProductDetail),
      //   };
      // } else if (this.dataProduct.product_kind_id == 1) {
      //   apiProductResp.product_detail = JSON.stringify(
      //     this.dataProduct.single_product
      //   );
      // }
      let apiProduct = {
        id: dataProduct.ID,
        deleted_at: dataProduct.deleted_at,
        brand_id: dataProduct.brand_id,
        category_id: dataProduct.category_id,
        product_type_id: dataProduct.product_type_id,
        product_kind_id: dataProduct.product_kind_id,
        name: dataProduct.name,
        description: dataProduct.description,
        status: dataProduct.status,
      };

      if (dataProduct.product_kind_id == 2) {
        let apiOptions = [];
        let apiVariants = [];

        const apiItems = dataProduct.items.map((item) => ({
          id: item.ID,
          product_id: item.product_id,
          weight: item.weight,
          sku: item.sku,
        }));
        const apiPrices = dataProduct.items.map((item) => item.prices).flat();
        apiVariants = dataProduct.variants.map((variant) => {
          variant.options.forEach((option) => {
            apiOptions.push({
              id: option.ID,
              variant_id: option.variant_id,
              variant_product_id: variant.ID,
              item_id: option.item_id,
              name: option.name,
            });
          });

          return {
            id: variant.ID,
            product_id: variant.product_id,
            name: variant.name,
          };
        });

        apiProduct = {
          ...apiProduct,
          items: JSON.stringify(apiItems),
          item_prices: JSON.stringify(apiPrices),
          variants: JSON.stringify(apiVariants),
          options: JSON.stringify(apiOptions),
        };
      }

      let formData = new FormData();
      formData.append('product', JSON.stringify(apiProduct));
      formData.append('_method', 'PUT');
      try {
        const resp = await AuthApiPutMultipartFormData(
          `/products/${this.$route.params.product_id}/edit`,
          formData
        );
        console.log(resp);
      } catch (error) {
        console.log('error: ', error);
      }
    },
  },
};
/* eslint-disable */
</script>

<style scoped></style>
