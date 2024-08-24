import { useEffect, useState } from "react";

export default function List({ getItems }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getItems(1));
        console.log("Updating Items");
    }, [getItems]);

    return (
        <div className="list-container">
            {items.map((item) => (
                <div className="list-item" key={item}>
                    {item}
                </div>
            ))}
        </div>
    );
}
