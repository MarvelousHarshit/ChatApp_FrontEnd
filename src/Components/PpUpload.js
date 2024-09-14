import { Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
// import Button from "@material-ui/core/Button";
// import Box from "@material-ui/core/Box";


const FileInput = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <input
                        accept="image/*"
                        type="file"
                        id="select-image"
                        style={{ display: "none" }}
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                    />

                    <label htmlFor="select-image">
                        <Button variant="contained" color="primary" component="span">
                            Upload Image
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {imageUrl && selectedImage && (
                        <Box sm={6} textAlign="right">
                            <img src={imageUrl} alt={selectedImage.name} height="100px" />
                        </Box>
                    )}
                </Grid>
            </Grid>


        </>
    );
};

export default FileInput;