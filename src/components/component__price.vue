<template>
    <span v-if="typeValue =='eur'">€</span>
    <span v-else-if="typeValue =='usd'">$</span>
    <span v-else-if="typeValue =='gbp'">£</span>
    <span v-else-if="typeValue =='chf'">S₣</span>
    <span v-else-if="typeValue =='jpy'">¥</span>
    <span v-else-if="typeValue =='aud'">AU$</span>
    <span v-else-if="typeValue =='cad'">C$</span>
    <span v-else-if="typeValue =='cny'">¥</span>
    <span v-else-if="typeValue =='hkd'">HK$</span>
    <span v-else-if="typeValue =='nzd'">NZ$</span>
    <span v-else-if="typeValue =='rub'">₽</span>
    <span v-else-if="typeValue == null">£</span>
    <span v-else>£</span>
    {{ convertPrice(priceValue) }}
</template>

<script>
export default {

    props: {
        priceValue: String,
        typeValue: String,
    },
    
    data() {
        return {

        }
    },

    components: {
    
    },

    methods: {
        //convert price
        convertPrice(number){
        // Преобразование числа в строку
        let numberString = number.toString();

        // Разделение числа на целую и десятичную части
        let parts = numberString.split('.');
        let integerPart = parts[0];
        let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

        // Добавление запятых для разделения тысяч
        let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Сбор отформатированного числа
        let formattedNumber = formattedIntegerPart + decimalPart;

        return formattedNumber;
        },
    },

    computed: {

    },

    watch: {

    },

    mounted(){

    },

}
</script>