import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  db,
  collection,
  getDocs,
  storage,
} from "../../../../firebase/firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import "./portfolio.css";

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        console.log("Fetching portfolio items from Firestore...");
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        if (querySnapshot.empty) {
          console.warn("No portfolio items found.");
          toast.warn("No portfolio items found.");
        } else {
          console.log("Portfolio items fetched successfully.");
        }

        const items = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            console.log("Data fetched for document:", doc.id, data);

            const imageUrl = await getDownloadURL(
              ref(storage, data.previewImage)
            );
            console.log("Image URL fetched:", imageUrl);

            return { ...data, id: doc.id, imageUrl };
          })
        );
        setPortfolioItems(items);
        console.log("Portfolio items set in state:", items);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        toast.error("Failed to fetch portfolio items");
      }
    };

    fetchPortfolioItems();
  }, []);

  const handleCardHover = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="portfolio-container">
      <ToastContainer />
      <div className="portfolio-scroll">
        {portfolioItems.map((item) => (
          <Card
            key={item.id}
            className="portfolio-card"
            onMouseEnter={() => handleCardHover(item)}
          >
            <CardMedia
              component="img"
              height="140"
              image={item.imageUrl}
              alt={item.description}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedItem && (
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="portfolio-item-title"
          aria-describedby="portfolio-item-description"
          className="portfolio-modal-backdrop"
        >
          <Box className="portfolio-modal">
            <Typography id="portfolio-item-title" variant="h6" component="h2">
              {selectedItem.description}
            </Typography>
            <CardMedia
              component="img"
              height="200"
              image={selectedItem.imageUrl}
              alt={selectedItem.description}
              className="portfolio-modal-image"
            />
            <Typography
              id="portfolio-item-developedBy"
              sx={{ mt: 2, fontSize: 18 }}
            >
              Developed By: {selectedItem.developedBy}
            </Typography>
            <Typography id="portfolio-item-downloads" sx={{ mt: 1 }}>
              Downloads: {selectedItem.downloads}
            </Typography>
            <Typography id="portfolio-item-specs-title" sx={{ mt: 2 }}>
              Specifications:
            </Typography>
            <Box className="specs-container">
              {selectedItem.specs.map((spec, index) => (
                <Box key={index} className="spec-item">
                  <Avatar src={spec.image} alt={spec.description} />
                  <Typography variant="body2">{spec.description}</Typography>
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

export default Portfolio;
