#!/bin/bash

# Navigate to admin-module and start the server
cd admin-module
node server &  # Run in the background

# Navigate to BankManager-module and start the interact-endpoint
cd ../BankManager-module
node interact-endpoints &  # Run in the background

# Navigate back and start the proxy
cd ..
node proxy &  # Run in the background

# Wait for a moment to ensure all services have started
sleep 5

# Start local tunnel and save output to a temporary file
echo "Starting local tunnel..."
npx localtunnel --port 5500 > url.txt 2>&1 &

# Wait for the tunnel to establish
sleep 5

# Read the content of url.txt
url=$(grep -oP 'https?://[^\s]+' url.txt)

# Echo the extracted URL
echo "Local tunnel URL: $url"

# Update the rootUrl in config.js
sed -i.bak "s|rootUrl: \"[^\"]*\"|rootUrl: \"$url\"|" config.js

# Optional: Remove the backup file created by sed
rm config.js.bak

echo "Updated rootUrl in config.js to $url"

# Optional: Keep the script running to keep background processes alive
wait
