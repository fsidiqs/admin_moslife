import { AuthApiGet } from "./httpRequests"

const PopulateBrand = async () => {
    let res;

    try {
        res = await AuthApiGet('/products/brands');
    } catch (error) {
        console.log(error);
    }
    const brands = res.data.data.map(elem => ({
        label: elem.name,
        value: elem.ID
    }))

    return brands
}

const PopulateType = async () => {
    let res;

    try {
        res = await AuthApiGet('/products/product_types');
    } catch (error) {
        console.log(error);
    }

    const types = res.data.data.map((elem) => ({
        label: elem.name,
        value: elem.ID
    }));

    return Promise.resolve(types)
}

const PopulateCategory = async () => {
    let res;
    try {
        res = await AuthApiGet('/products/categories');
    } catch (error) {
        console.log(error);
    }


    return res.data.data.map(elem => ({
        label: elem.name,
        value: elem.ID
    }))
}



const PopulateProduct = async (params) => {
    const {p_page, p_limit, preload, product_id_arr} = params
    const query = {
        p_page,
        p_limit,
        preload,
        product_id_arr,
    };
    let productRes;
    try {
        productRes = await AuthApiGet('/products', query);
    } catch (error) {
        console.log('error fetching product');
        return;
    }
    return productRes.data.data.elements[0]
}
export {
    PopulateBrand,
    PopulateType,
    PopulateProduct,
    PopulateCategory,
}