import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
const ReadOnlyStarRating = ({ ratings }) => {
  return (
    <Box>
      <Rating
        name="read-only"
        value={ratings}
        precision={0.5}
        readOnly
        icon={<StarIcon style={{ fontSize: 14 }} />}
        emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: 14 }} />}
      />
    </Box>
  );
};

export default ReadOnlyStarRating;
