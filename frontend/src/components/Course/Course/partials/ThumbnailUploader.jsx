import React from "react";
import { Box } from "@mui/material";
import { Card, CloseButton } from "react-bootstrap";

const ThumbnailUploader = ({
  getRootProps,
  getInputProps,
  selectedImage,
  removeThumbnail,
  isDragActive,
  error,
}) => (
  <>
    <Box {...getRootProps()} className="course-thumbnail">
      <Card.Body className="text-center">
        <input {...getInputProps()} type="file" />
        {selectedImage ? (
          <Card>
            <CloseButton
              className="position-absolute top-0 end-0"
              style={{ color: "red" }}
              onClick={removeThumbnail}
              aria-label="Remove image"
            />

            <img
              className="thumbnail-image"
              src={selectedImage}
              alt="Course thumbnail"
            />
          </Card>
        ) : (
          <p>
            {isDragActive ? (
              "Drag the course thumbnail here ..."
            ) : (
              <span>
                Click to select thumbnail image or{" "}
                <span className="upload-link">Click to upload</span>
              </span>
            )}
          </p>
        )}
      </Card.Body>
    </Box>
    {error && <p className="error">{error}</p>}
  </>
);

export default ThumbnailUploader;
