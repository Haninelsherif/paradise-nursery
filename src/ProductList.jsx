import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";
import Navbar from "./Navbar";
import "./ProductList.css";

const plantsArray = [
  { category: "Air-Purifying Plants", plants: [
    { name:"Snake Plant", image:"https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description:"Hardy indoor plant with striking upright leaves.", cost:"$15" },
    { name:"Spider Plant", image:"https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description:"Fast-growing plant with graceful arching leaves.", cost:"$12" },
    { name:"Peace Lily", image:"https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description:"Elegant flowering houseplant for indoor spaces.", cost:"$18" },
    { name:"Boston Fern", image:"https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description:"Lush fern that adds texture and greenery.", cost:"$20" },
    { name:"Rubber Plant", image:"https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description:"Bold, glossy-leaved plant with easy care.", cost:"$17" },
    { name:"Aloe Vera", image:"https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description:"Distinctive succulent with thick fleshy leaves.", cost:"$14" }
  ]},
  { category: "Aromatic & Fragrant Plants", plants: [
    { name:"Lavender", image:"https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop", description:"Fragrant plant with calming purple blooms.", cost:"$20" },
    { name:"Jasmine", image:"https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop", description:"Delicate flowers with a sweet fragrance.", cost:"$18" },
    { name:"Rosemary", image:"https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description:"Fragrant herb useful in gardens and kitchens.", cost:"$15" },
    { name:"Mint", image:"https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description:"Refreshing aromatic herb that grows indoors.", cost:"$12" },
    { name:"Lemon Balm", image:"https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description:"Leafy herb with a fresh citrus-like aroma.", cost:"$14" },
    { name:"Hyacinth", image:"https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description:"Colorful flowering plant famous for fragrance.", cost:"$22" }
  ]},
  { category: "Low-Maintenance Plants", plants: [
    { name:"ZZ Plant", image:"https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=900&auto=format&fit=crop", description:"Resilient plant that tolerates low light.", cost:"$25" },
    { name:"Pothos", image:"https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description:"Versatile trailing plant that is beginner-friendly.", cost:"$10" },
    { name:"Cast Iron Plant", image:"https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg", description:"Tough plant that handles low light and neglect.", cost:"$20" },
    { name:"Succulent Garden", image:"https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description:"Drought-tolerant option with unique textures.", cost:"$18" },
    { name:"Aglaonema", image:"https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description:"Colorful indoor plant requiring little attention.", cost:"$22" },
    { name:"Catnip", image:"https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg", description:"Easy-to-grow leafy herb popular with cats.", cost:"$13" }
  ]}
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const isInCart = (name) => cart.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    if (!isInCart(plant.name)) dispatch(addItem(plant));
  };

  return (
    <div className="shop-page">
      <Navbar onNavigate={onNavigate} />
      <main className="product-page">
        <section className="shop-hero">
          <div>
            <p className="section-eyebrow">OUR COLLECTION</p>
            <h1>Find Your Perfect Plant</h1>
            <p>Explore carefully selected houseplants for every space, lifestyle, and level of plant-care experience.</p>
          </div>
          <div className="shop-summary"><span>{totalItems}</span><small>plants in cart</small></div>
        </section>

        {plantsArray.map((category) => (
          <section className="plant-category" key={category.category}>
            <div className="category-heading"><h2>{category.category}</h2><span>{category.plants.length} plants</span></div>
            <div className="product-list">
              {category.plants.map((plant) => {
                const added = isInCart(plant.name);
                return (
                  <article className="product-card" key={plant.name}>
                    <div className="product-image-wrap">
                      <img className="product-image" src={plant.image} alt={plant.name} loading="lazy" />
                    </div>
                    <div className="product-card-content">
                      <p className="product-category">{category.category}</p>
                      <h3 className="product-title">{plant.name}</h3>
                      <p className="product-description">{plant.description}</p>
                      <div className="product-footer">
                        <span className="product-price">{plant.cost}</span>
                        <button
                          className={"product-button" + (added ? " added-to-cart" : "")}
                          onClick={() => handleAddToCart(plant)}
                          disabled={added}
                        >
                          {added ? "Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
