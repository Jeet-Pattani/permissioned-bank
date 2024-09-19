import { useState, useEffect } from "react";
import { pinata } from "./utils/config";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [uploadResponse, setUploadResponse] = useState<any>(null); // State to store upload response
  const [isUploading, setIsUploading] = useState(false); // State for showing loading state

  useEffect(() => {
    // Load saved data from local storage when the component mounts
    const savedResponse = localStorage.getItem("uploadResponse");
    if (savedResponse) {
      setUploadResponse(JSON.parse(savedResponse));
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    setSelectedFile(file);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNftName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNftDescription(event.target.value);
  };

  const handleSubmission = async () => {
    if (!selectedFile || !nftName || !nftDescription) {
      alert("Please complete all fields before submitting!");
      return;
    }

    setIsUploading(true); // Set loading state to true
    try {
      // Step 1: Upload image to IPFS
      const imageUpload = await pinata.upload.file(selectedFile);
      const imageHash = imageUpload.IpfsHash;

      // Step 2: Create metadata JSON
      const metadata = {
        name: nftName,
        description: nftDescription,
        image: `https://gateway.pinata.cloud/ipfs/${imageHash}`,
      };

      // Step 3: Upload metadata to IPFS
      const metadataUpload = await pinata.upload.json(metadata);
      const metadataHash = metadataUpload.IpfsHash;

      // Step 4: Update state with results and save to local storage
      const response = {
        imageHash,
        metadataHash,
        pinSize: imageUpload.PinSize,
        timestamp: imageUpload.Timestamp,
      };
      setUploadResponse(response);
      localStorage.setItem("uploadResponse", JSON.stringify(response));

      console.log("Image upload:", imageUpload);
      console.log("Metadata upload:", metadataUpload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false); // Stop loading state
    }
  };

  const handleClearStorage = () => {
    localStorage.removeItem("uploadResponse");
    setUploadResponse(null); // Clear the displayed response
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2>Pinata IPFS NFT Uploader</h2>

      {/* NFT Name Input */}
      <label className="form-label" style={{ display: "block", marginBottom: "10px" }}>
        NFT Name
      </label>
      <input
        type="text"
        value={nftName}
        onChange={handleNameChange}
        placeholder="Enter NFT name"
        style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
      />

      {/* NFT Description Input */}
      <label className="form-label" style={{ display: "block", marginBottom: "10px" }}>
        NFT Description
      </label>
      <textarea
        value={nftDescription}
        onChange={handleDescriptionChange}
        placeholder="Enter NFT description"
        rows={4}
        style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
      />

      {/* File Input */}
      <label className="form-label" style={{ display: "block", marginBottom: "10px" }}>
        Choose File
      </label>
      <input type="file" onChange={handleFileChange} />

      {/* Submit Button */}
      <button
        onClick={handleSubmission}
        disabled={!selectedFile || !nftName || !nftDescription || isUploading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isUploading ? "Uploading..." : "Submit"}
      </button>

      {/* Clear Local Storage Button */}
      <button
        onClick={handleClearStorage}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#dc3545",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
          marginLeft: "10px",
        }}
      >
        Clear Local Storage
      </button>

      {/* Upload Response Section */}
      {uploadResponse && (
        <div style={{ marginTop: "20px", padding: "15px", borderRadius: "4px", backgroundColor: "#f8f9fa" }}>
          <h3>Upload Successful!</h3>
          <p><strong>IPFS Hash of Image:</strong> {uploadResponse.imageHash}</p>
          <p><strong>IPFS Hash of Metadata:</strong> {uploadResponse.metadataHash}</p>
          <p><strong>Pin Size:</strong> {uploadResponse.pinSize} bytes</p>
          <p><strong>Timestamp:</strong> {new Date(uploadResponse.timestamp).toLocaleString()}</p>

          {/* Image Preview */}
          <div style={{ marginTop: "20px" }}>
            <h4>Uploaded Image:</h4>
            <img
              src={`https://gateway.pinata.cloud/ipfs/${uploadResponse.imageHash}`}
              alt="Uploaded"
              style={{ maxWidth: "300px", borderRadius: "10px" }}
            />
          </div>
        </div>
      )}

      {/* Error handling if no file selected */}
      {!selectedFile && !isUploading && !nftName && !nftDescription && (
        <p style={{ color: "red", marginTop: "10px" }}>Please fill out all fields and select a file.</p>
      )}
    </div>
  );
}

export default App;
