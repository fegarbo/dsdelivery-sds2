import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StyleSheet, ScrollView, Alert, Text} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchData = () => {
        setIsLoading(true);
        fetchOrders()
            .then(response => setOrders(response.data))
            .catch(() => Alert.alert('Houve um erro ao buscar os pedidos'))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    const handleOnPress = (order: Order) => {
        navigation.navigate('OrderDetails', { //Chama o OrderDetails passando como parametro o order
            order
        });
    }

    return (
        <>
            <Header/>
            <ScrollView style={styles.container} /*Para habilitar rolagem */>
                {isLoading ? (
                    <Text>Buscando pedidos...</Text>
                ) : (
                    orders.map(order => ( //sempre o elemento raiz do map precisa do key
                        <TouchableWithoutFeedback
                            key={order.id}
                            onPress={() => handleOnPress(order)}
                        > 
                            <OrderCard order={order}/>
                        </TouchableWithoutFeedback>
                    ))
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%', //utiliza porcentagem para a responsividade
        paddingLeft: '5%',
    }
});

export default Orders;