import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  storage,
} from "../../../../firebase/firebase.js";
import { Button, Modal, TextField, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close"; // Import Close icon
import "./categorylabel.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function CategoryLabel() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [numProjects, setNumProjects] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, "categories");
        const querySnapshot = await getDocs(categoriesCollection);

        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveCategory = async () => {
    try {
      console.log(
        "Saving new category:",
        newCategoryName,
        categoryImage,
        numProjects
      );

      if (categoryImage) {
        const imageRef = ref(storage, `category_images/${categoryImage.name}`);
        const snapshot = await uploadBytes(imageRef, categoryImage);
        console.log("Image uploaded to Firebase Storage");

        const imageUrl = await getDownloadURL(snapshot.ref);
        console.log("Image URL:", imageUrl);

        const docRef = await addDoc(collection(db, "categories"), {
          name: newCategoryName,
          noofapps: Number(numProjects),
          posterimage: imageUrl,
        });

        console.log("New category added with ID:", docRef.id);

        toast.success("Category added successfully!");

        setNewCategoryName("");
        setCategoryImage(null);
        setNumProjects("");
        setOpenModal(false);

        window.location.reload();
      } else {
        console.error("No category image selected.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId, imageUrl) => {
    try {
      await deleteDoc(doc(db, "categories", categoryId));

      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      toast.success("Category deleted successfully!");

      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category.");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setCategoryImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="Category-Styling">
      <ToastContainer />
      {categories.map((category) => (
        <div
          key={category.id}
          style={{
            position: "relative",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={category.posterimage}
            alt={category.name}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "70%",
              marginBottom: "10px",
            }}
          />
          <span>{category.name}</span>
          <IconButton
            aria-label="delete"
            onClick={() =>
              handleDeleteCategory(category.id, category.posterimage)
            }
            style={{
              position: "absolute",
              top: 0,
              right: 15,
              transform: "translate(50%, -50%)",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      ))}
      <button
        variant="contained"
        onClick={handleAddCategory}
        style={{ marginTop: "20px" }}
      >
        Add more
      </button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>Add New Category</h5>
          <TextField
            label="Category Name"
            variant="outlined"
            borderRadius="15"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />

          <TextField
            label="Number of Projects"
            variant="outlined"
            type="number"
            value={numProjects}
            onChange={(e) => setNumProjects(e.target.value)}
            style={{ marginBottom: "20px", marginTop: "20px" }}
          />
          <div
            {...getRootProps()}
            style={{ marginBottom: "20px", cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            {categoryImage ? (
              <img
                src={URL.createObjectURL(categoryImage)}
                alt="Category"
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            ) : (
              <CloudUploadIcon style={{ fontSize: 20 }} />
            )}
          </div>
          <button
            variant="contained"
            style={{ width: "100%" }}
            onClick={handleSaveCategory}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CategoryLabel;
