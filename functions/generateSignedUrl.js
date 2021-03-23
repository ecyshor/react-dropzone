const BUCKET = "personal-upload";
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();
exports.generateSignedUrl = async (req, res) => {
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s

  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  } else {
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
  }
};
