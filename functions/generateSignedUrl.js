const BUCKET = "personal-upload";
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();
exports.generateSignedUrl = async (req, res) => {
  const options = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: "application/octet-stream",
  };

  // Get a v4 signed URL for uploading file
  try {
    const [url] = await storage
      .bucket(BUCKET)
      .file(req.body.name)
      .getSignedUrl(options);
    res.status(200).send(url);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
};
