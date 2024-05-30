import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URLS = {
    'prime': "http://20.244.56.144/test/primes",
    'fibonacci': "http://20.244.56.144/test/fibo",
    'even': "http://20.244.56.144/test/even",
    'random': "http://20.244.56.144/test/rand"
};

const AverageCalculator = () => {
    const [numberType, setNumberType] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (numberType) {
            fetchData(numberType);
        }
    }, [numberType]); // useEffect will trigger when numberType changes

    const fetchData = async (type) => {
        if (!URLS[type]) {
            console.error("Invalid number type");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(URLS[type]);
            setResponse(res.data);
        } catch (error) {
            console.error("Error fetching data", error);
            setError("Failed to fetch data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (numberType) {
            fetchData(numberType);
        } else {
            setError("Please select a number type.");
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Choose a number type:
                    <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
                        <option value="">Select</option>
                        <option value="prime">Prime</option>
                        <option value="fibonacci">Fibonacci</option>
                        <option value="even">Even</option>
                        <option value="random">Random</option>
                    </select>
                </label>
                <button type="submit">Fetch Numbers</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <h2>Results</h2>
                    <p><strong>Previous State:</strong> {response.windowPrevState.join(', ')}</p>
                    <p><strong>Current State:</strong> {response.windowCurrState.join(', ')}</p>
                    <p><strong>Fetched Numbers:</strong> {response.numbers.join(', ')}</p>
                    <p><strong>Average:</strong> {response.avg}</p>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
