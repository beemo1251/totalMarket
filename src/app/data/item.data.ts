import { ItemResponse } from '../models/item.models';
export let items : ItemResponse[] = [
    {
        idItem: "100",
        desc1Item: "AFILADOR DE CUCHILLOS",
        desc2Item: "📌Afilador de cuchillos con mango ergonómico. 📌Antideslizante",
        price: 12.00,
        stock: 15,
        estado: {id: 1, descEstado: "Disponible"}
    },
    {
        idItem: "101",
        desc1Item: "BANDEJA PARA DESCONGELAR",
        desc2Item: "📌Bandeja de descongelación rápida de aluminio antiadherente para carne y otros alimentos.",
        price: 38.00,
        stock: 10,
        estado: {id: 1, descEstado: "Disponible"}
    },
    {
        idItem: "102",
        desc1Item: "BANDEJA PARA HUEVOS",
        desc2Item: "📌Bandeja organizadora de huevos 📌15 divisiones 📌Disponible: Verde",
        price: 10.00,
        stock: 0,
        estado: {id: 2, descEstado: "Agotado"}
    },
    {
        idItem: "103",
        desc1Item: "DISPENSADOR DE LAVAVAJILLA",
        desc2Item: "📌Dispensador de detergente liquido, distribuye de forma perfecta y ahorrativa para una mejor limpieza",
        price: 10.00,
        stock: 8,
        estado: {id: 1, descEstado: "Disponible"}
    },
    {
        idItem: "104",
        desc1Item: "ESQUINERO ESCURRIDOR",
        desc2Item: "📌Escurridor esquinero para lavadero de cocina 📌Disponible: crema, plomo y celeste",
        price: 7.00,
        stock: 20,
        estado: {id: 1, descEstado: "Disponible"}
    },
    {
        idItem: "105",
        desc1Item: "ORGANIZADOR DE REFRIGERADOR",
        desc2Item: "📌Organizador adecuado para almacenar alimentos en el refrigerador 📌Disponible en: Rosado y verde",
        price: 5.50,
        stock: 0,
        estado: {id: 2, descEstado: "Agotado"}
    }
] 