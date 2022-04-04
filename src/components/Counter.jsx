import React, { useState } from 'react';

const Counter = function () {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('Текст 111');
    let increment = () => setCount(count + 1);
    function decrement() {
        setCount(count - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <button onClick={increment}>Увеличить</button>
            <button onClick={decrement}>Уменьшить</button>
        </div>
    );
}

export default Counter;