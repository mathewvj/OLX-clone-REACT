import React,{useEffect, useState, useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/PostContext';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';

function View() {

  const [userDetails, setUserDetails] = useState(null)
  const { postDetails} = useContext(PostContext)
  const {db} = useContext(FirebaseContext)
  
  useEffect(() => {
    if (!postDetails) return;
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        const q = query(collection(db, "users"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => setUserDetails(doc.data()));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [postDetails, db]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.imageUrl || "../../../Images/R15V3.jpg"} alt="Product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price || "N/A"} </p>
          <span>{postDetails?.name || "No Name"}</span>
          <p>{postDetails?.category || "Unknown Category"}</p>
          <span>{new Date(postDetails?.createAt?.seconds * 1000).toDateString() || "N/A"}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || "No name"}</p>
          <p>{userDetails?.phone || "No Contact"}</p>
        </div>
      </div>
    </div>
  );
}
export default View;