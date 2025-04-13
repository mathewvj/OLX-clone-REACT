import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

function Posts() {
  const { db } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [db]);

  const handleProductClick = (product) => {
    setPostDetails(product);
    localStorage.setItem("selectedPost", JSON.stringify(product)); // ✅ Persist data on refresh
    navigate("/viewpost");
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.length > 0 ? (
            products.map(product => (
              <div className="card" key={product.id} onClick={() => handleProductClick(product)}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>
                    {product.createAt?.seconds
                      ? new Date(product.createAt.seconds * 1000).toDateString()
                      : "Date not available"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.length > 0 ? (
            products.slice(0, 4).map(product => (
              <div className="card" key={product.id} onClick={() => handleProductClick(product)}>
                <div className="favorite">
                  <Heart />
                </div>
                <div className="image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name">{product.name}</p>
                </div>
                <div className="date">
                  <span>
                    {product.createAt?.seconds
                      ? new Date(product.createAt.seconds * 1000).toDateString()
                      : "Date not available"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
