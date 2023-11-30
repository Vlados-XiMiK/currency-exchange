import axios from 'axios';
import {useEffect, useState} from "react";
import styles from './currencyExchange.module.css';


interface Currency {
    currencyCodeA: number
    currencyCodeB: number
    date: number
    rateBuy: number
    rateSell: number
}

const CurrencyExchange = () => {
    const [exchangeRates, setExchangeRates] = useState<Currency[]>([]);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await axios.get('https://api.monobank.ua/bank/currency');
                setExchangeRates(response.data);
            } catch (error) {
                console.error('Помилка при отриманні курсів валют:', error);
            }
        };

        fetchExchangeRates();
    }, []);

    const filteredRates = exchangeRates.filter(rate =>
        [840, 978, 826].includes(rate.currencyCodeA)
    );


    const test = filteredRates.filter(rate => !(rate.currencyCodeA === 978 && rate.currencyCodeB === 840))


    const getCurrencyName = (currency: Currency) => {
        if (currency.currencyCodeB == 980 && currency.currencyCodeA == 978) {
            return 'Євро';
        } else if (currency.currencyCodeB == 980 && currency.currencyCodeA == 826) {
            return 'Фунт стерлінгів';
        } else if (currency.currencyCodeB == 980 && currency.currencyCodeA == 840) {
            return 'Долар США';
        } else {
            return 'Невідома валюта';
        }

        // switch (currencyCode) {
        //     case 840:
        //         return 'Долар США';
        //     case 978:
        //         return 'Євро';
        //     case 826:
        //         return 'Фунт стерлінгів';
        //     default:
        //         return 'Невідома валюта';
        // }
    };

    return (
        <div className={styles.currencyExchangeContainer}>
            <h1>Курс валют для гривні</h1>
            <table className={styles.currencyTable}>
                <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Дата</th>
                    <th>Продаж</th>
                    <th>Купівля</th>
                </tr>
                </thead>
                <tbody>
                {test.map(rate => (
                    <tr key={rate.date}>
                        <td>{getCurrencyName(rate)}</td>
                        <td>{new Date(rate.date * 1000).toLocaleString()}</td>
                        <td>{rate.rateSell ? rate.rateSell : 'Нема інформації'}</td>
                        <td>{rate.rateBuy ? rate.rateBuy : 'Нема інформації'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrencyExchange;
