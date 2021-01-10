import { useEffect, useState } from 'react';
import './styles.css';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import { Product } from './types';
import { OrderLocationData } from './types';
import { fetchProducts } from '../api';
import OrderLocation from './OrderLocation';

function Orders(){
    const [products, setProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))
    }, []);

    return( //Quando o componente tem Prop, deve ser implementado como exemplos abaixo (ProductList, Orderlocation)
        <div className="orders-container">
            <StepsHeader />
            <ProductsList products={products} />
            <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
        </div>
    );
}

export default Orders;