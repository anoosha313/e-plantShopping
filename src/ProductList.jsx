import React, { useState } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState([]);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    const plantsArray = [
        // ... aapka pura plantsArray wahi rahega, change mat karna
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        // Baqi 4 categories bhi yahi paste kar do
        { category: "Aromatic Fragrant Plants", plants: [...] },
        { category: "Insect Repellent Plants", plants: [...] },
        { category: "Medicinal Plants", plants: [...] },
        { category: "Low Maintenance Plants", plants: [...] }
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // yahan spelling theek kar di
        fontSize: '20px',
    }
    const styleObjUl = { display: 'flex', gap: '30px', alignItems: 'center' }
    const styleA = { color: 'white', fontSize: '20px', textDecoration: 'none' }

    const handleHomeClick = (e) => { e.preventDefault(); onHomeClick(); };
    const handleCartClick = (e) => { e.preventDefault(); setShowCart(true); setShowPlants(false); };
    const handlePlantsClick = (e) => { e.preventDefault(); setShowPlants(true); setShowCart(false); };
    const handleContinueShopping = (e) => { e.preventDefault(); setShowCart(false); };

    const handleAddToCart = (plant) => {
        dispatch(addItem({ ...plant, id: plant.name, quantity: 1 }));
        setAddedToCart([...addedToCart, plant.name]);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury" style={{display: 'flex', gap: '10px'}}>
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" width="50" />
                        <a href="/" onClick={handleHomeClick}>
                            <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                            <i style={{ color: 'white', fontSize: '12px' }}>Where Green Meets Serenity</i>
                        </a>
                    </div>
                </div>
                <div style={styleObjUl}>
                    <div><a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a></div>
                    <div> 
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            Cart ({totalQuantity})
                        </a>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid" style={{padding: '20px'}}>
                    {showPlants || !showCart ? plantsArray.map((category) => (
                        <div key={category.category}>
                            <h2 style={{textAlign: 'center', marginTop: '30px'}}>{category.category}</h2>
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center'}}>
                                {category.plants.map((plant) => (
                                    <div key={plant.name} style={{border: '1px solid #ccc', padding: '15px', width: '250px', textAlign: 'center'}}>
                                        <img src={plant.image} alt={plant.name} width="200" height="200" style={{objectFit: 'cover'}} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p><b>{plant.cost}</b></p>
                                        <button 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart.includes(plant.name)}
                                            style={{padding: '10px', background: addedToCart.includes(plant.name) ? 'gray' : 'green', color: 'white', border: 'none', cursor: 'pointer'}}
                                        >
                                            {addedToCart.includes(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : <h2 style={{textAlign: 'center', padding: '50px'}}>Click "Plants" to see products</h2>}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
