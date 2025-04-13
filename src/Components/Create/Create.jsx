import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import axios from 'axios'
import { AuthContext, FirebaseContext } from '../../store/Context';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice ] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const {db } = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const handleSubmit = async() =>{
    if(!name || !category || !price ||!image) {
      alert("please fill all fields and select a image")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file',image)
      formData.append("upload_preset","zlkki5xg")
      formData.append("cloud_name","dhg9nxurm")

      const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dhg9nxurm/image/upload",
          formData
      );
      const imageUrl = cloudinaryResponse.data.secure_url; 

      await addDoc(collection(db,"products"),{
        name, 
        category,
        price: Number(price),
        imageUrl,
        userId: user.uid,
        createAt: serverTimestamp()
      })
      alert("Product added successfully")
      setName('')
      setCategory('')
      setPrice('')
      setImage(null)
      navigate("/")

    } catch (error) {
      console.error("error uploading:",error)
      alert("error uploading:",error.message)
    }
    setLoading(false)
  }

  return (
    <Fragment>
      <Header />
 
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" value={price} onChange={(e)=> setPrice(e.target.value)} name="Price" />
            <br />
         
          <br />
          {image && <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />}
          
            <br />
            <input type="file" onChange={(e)=> setImage(e.target.files[0])} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>{loading ? "Submitting..." : "Upload & Submit"}</button>
          
        </div>
 
    </Fragment>
  );
};

export default Create;