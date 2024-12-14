import { useState, useEffect } from "react";

const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];

function BitcoinRates() {
    const [price, setPrice] = useState(null);
    const [currency, setCurrency] = useState('USD');

    const options = currencies.map((curr) => (
        <option value={curr} key={curr}>
            {curr}
        </option>
    ));

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${currency}`);
                const data = await response.json();
                setPrice(data[currency]);
            } catch (error) {
                console.error('Error fetching price:', error);
            }
        };

        fetchPrice();
    }, [currency]); // Re-run when currency changes

    return (
        <div>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {/* <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option> */}
                {options}
            </select>
            {price ? (
                <p>Bitcoin price: {price} {currency}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default BitcoinRates;
