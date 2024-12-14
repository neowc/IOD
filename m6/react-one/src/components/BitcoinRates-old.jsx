import { useState, useEffect } from "react";

const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];

function BitcoinRates() {
    const [currency, setCurrency] = useState(currencies[0]);

    const options = currencies.map((curr) => (
        <option value={curr} key={curr}>
            {curr}
        </option>
    ));
    // console.log(options);

    useEffect(() => {
        // fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`)
        // fetch(`https://api.freecryptoapi.com/v1/getDataCurrency?symbol=BTC&local=${currency}`)
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${currency}`)
        .then(response => response.json())
        // .then(data => data.bitcoin[currency.toLowerCase()])
        .then(data => data[currency])
        .then(rate => { setCurrency(rate); })
        .catch(error => console.error(error));
        // .then(json => { setCurrency(json.currency); });
        //console.log(currency);console.log(typeof currency);
        // console.log(currency);console.log(typeof currency);
    }, [currency]);

    return (
        <div className="BitcoinRates componentBox">
        <h3>Bitcoin Exchange Rate</h3>
        <label>
            Choose currency:
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {options}
            </select>
            <p>Rate: {currency}</p>
        </label>
        </div>
    );
}
export default BitcoinRates;
