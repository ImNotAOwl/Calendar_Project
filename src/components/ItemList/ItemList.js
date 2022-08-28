import React from "react";
import { useEffect, useState } from "react";
import "./ItemList.css";


// name : nom de la liste
// data : JSON contenant les données à afficher
// keys : tableau contenant les noms des colonnes de la table listée
// headers : tableau contenant les en-têtes de la table listée
const ItemList = ({ name, data, keys, headers, ExtraContent, colorstyle }) => {
    const [items, setItems] = useState();
    const [targetOpen, setTargetOpen] = useState();
    var color = '';
    if (colorstyle) color = colorstyle;

    useEffect(() => {
        if (data) setItems(data);
        // console.log(data);
    }, [data]);

    // toggle extra content at index of click
    const toggle = (index) => {
        if (targetOpen === index) setTargetOpen();
        else setTargetOpen(index);
    }

    // set sextra content if there is one given
    const setExtraContent = (item) => {
        if (ExtraContent) return <ExtraContent item={item} />
    }

    return (

        <div className={`item-list${color} ${name}-list`} key={`${name}-list-key`}>
            {/* headers */}
            <ul className={`item headers ${name}-headers`} key={`headers-key`}>
                {headers &&
                    headers.map((header, index) => (
                        <li key={`${name}-headers-key-${index}`}>{header}</li>
                    ))}
            </ul>

            {/* item rows */}
            {items &&
                items.map((item, index) => (
                    <React.Fragment key={`fragment-${index}`}>
                        <ul className={`item ${name}-item`} key={`item-${item.id}`} onClick={() => toggle(index)}>
                            {/* item columns */}
                            {keys.map((key, index) => (
                                <li key={`${name}-key-${index}-${item['id']}`}> {item[key]} </li>
                            ))}
                        </ul>
                        <div className="extra-content" key={`extraC-${item.id}`} style={{ display: targetOpen === index ? "flex" : "none" }}>{setExtraContent(item)} </div>
                    </React.Fragment>
                ))}
        </div>
    );
};

export default ItemList;