import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  db,
  collection,
  getDocs,
  storage,
} from "../../../firebase/firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from Firestore...");
        const querySnapshot = await getDocs(collection(db, "products"));
        if (querySnapshot.empty) {
          console.warn("No products found.");
          toast.warn("No products found.");
        } else {
          console.log("Products fetched successfully.");
        }

        const items = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            console.log("Data fetched for document:", doc.id, data);

            let imageUrl = "";
            try {
              imageUrl = await getDownloadURL(ref(storage, data.posterimage));
              console.log("Image URL fetched:", imageUrl);
            } catch (imageError) {
              console.error("Error fetching image URL:", imageError);
              toast.error("Failed to fetch product image");
            }

            return { ...data, id: doc.id, imageUrl };
          })
        );
        setProducts(items);
        console.log("Products set in state:", items);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleCardHover = (item) => {
    setSelectedProduct(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="portfolio-container">
      <ToastContainer />
      <div className="portfolio-scroll">
        {products.map((product) => (
          <Card
            key={product.id}
            className="portfolio-card"
            onMouseEnter={() => handleCardHover(product)}
          >
            <CardMedia
              component="img"
              height="140"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedProduct && (
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="product-item-title"
          aria-describedby="product-item-description"
          className="portfolio-modal-backdrop"
        >
          <Box className="portfolio-modal">
            <Typography id="product-item-title" variant="h6" component="h2">
              {selectedProduct.name}
            </Typography>
            <Slider {...sliderSettings} className="carousel">
              {selectedProduct.Images.map((image, index) => (
                <div key={index}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`Product Image ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
            <Typography
              id="product-item-basicprice"
              sx={{ mt: 2, fontSize: 18 }}
            >
              Basic Price: {selectedProduct.basicprice}
            </Typography>
            <Typography
              id="product-item-offer-price"
              sx={{ mt: 1, fontSize: 18 }}
            >
              Offer Price: {selectedProduct.offer_price}
            </Typography>
            <Typography
              id="product-item-premiumprice"
              sx={{ mt: 1, fontSize: 18 }}
            >
              Premium Price: {selectedProduct.premiumprice}
            </Typography>
            <Typography id="product-item-basic-title" sx={{ mt: 2 }}>
              Basic:
            </Typography>
            <Box className="specs-container">
              {selectedProduct.basic.map((spec, index) => (
                <Box key={index} className="spec-item">
                  <Typography variant="body2">{spec}</Typography>
                </Box>
              ))}
            </Box>
            <Typography id="product-item-standard-title" sx={{ mt: 2 }}>
              Standard:
            </Typography>
            <Box className="specs-container">
              {selectedProduct.standard.map((spec, index) => (
                <Box key={index} className="spec-item">
                  <Typography variant="body2">{spec}</Typography>
                </Box>
              ))}
            </Box>
            <Typography id="product-item-premium-title" sx={{ mt: 2 }}>
              Premium:
            </Typography>
            <Box className="specs-container">
              {selectedProduct.premium.map((spec, index) => (
                <Box key={index} className="spec-item">
                  <Typography variant="body2">{spec}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleModalClose}
              sx={{ mt: 2 }}
              className="close-button"
            >
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Products;
