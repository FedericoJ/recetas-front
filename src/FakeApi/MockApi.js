import {products} from '../../assets/fakeDb'; 

export function getProductByCode(code){
    let product
    products.map(data => {
        if(data.code === code){
            product = data.product_name_es
        }
    });
    return product;
}