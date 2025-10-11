# Create logs directory if it doesn't exist
mkdir -p generated-logs

# Create log file
LOG_FILE="generated-logs/generate-client_$(date +%Y%m%d_%H%M%S).log"
echo "Started: $(date)" > $LOG_FILE

# Check if server is running
echo "🔃 Checking server connection..." | tee -a $LOG_FILE
if ! curl -s --head http://localhost:8080/swagger.json > /dev/null; then
  echo "❌ Cannot connect to server. Please make sure the server is running" | tee -a $LOG_FILE
  exit 1
fi

# Download swagger.json
echo "🔃 Downloading swagger.json..." | tee -a $LOG_FILE
curl -s http://localhost:8080/swagger.json -o swagger.json
if [ $? -ne 0 ]; then
  echo "❌ Error downloading swagger.json" | tee -a $LOG_FILE
  exit 1
fi
echo "✅ Successfully downloaded swagger.json" | tee -a $LOG_FILE

# Create backup of existing API (if exists)
if [ -d "generated-api" ]; then
  BACKUP_DIR="generate-api-backup/api_backup_$(date +%Y%m%d_%H%M%S)"
  echo "🔃 Backing up existing API to $BACKUP_DIR..." | tee -a $LOG_FILE
  cp -r generated-api $BACKUP_DIR
  echo "✅ Backup completed" | tee -a $LOG_FILE
fi

# Generate API client
echo "🔃 Generating API client..." | tee -a $LOG_FILE
npx @openapitools/openapi-generator-cli generate \
  -i src/swagger.json \
  -g typescript-fetch \
  -o generated-api \
  --additional-properties=supportsES6=true,typescriptThreePlus=true,withInterfaces=true,basePath=api

if [ $? -ne 0 ]; then
  echo "❌ Error generating API client" | tee -a $LOG_FILE
  exit 1
fi
echo "✅ API client generated successfully" | tee -a $LOG_FILE

# Copy file from A to B
# copy_file() {
#   local source=$1
#   local destination=$2
  
#   echo "🔃 Copying file from $source to $destination..." | tee -a $LOG_FILE
#   if [ -f "$source" ]; then
#     cp "$source" "$destination"
#     echo "✅ File copied successfully" | tee -a $LOG_FILE
#   else
#     echo "❌ Source file not found: $source" | tee -a $LOG_FILE
#     return 1
#   fi
# }

# Example usage of copy_file function
# copy_file "src/api/models/GeneralRequestModel.ts" "src/models/request/GeneralRequestModel.ts"

echo "✅ Process completed successfully" | tee -a $LOG_FILE
echo "✅ API client generated at: generated-api"