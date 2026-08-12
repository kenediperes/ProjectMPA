# Database Restore Script
if [ -z "$1" ]; then
    echo "Usage: ./restore.sh <backup_file.sql.gz>"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "Stopping containers..."
docker-compose -f docker/docker-compose.yml stop backend

echo "Restoring database..."
gunzip -c $BACKUP_FILE | docker-compose -f docker/docker-compose.yml exec -T postgres psql -U projectmpa projectmpa

if [ $? -eq 0 ]; then
    echo "Restore successful!"
    docker-compose -f docker/docker-compose.yml start backend
else
    echo "Restore failed!"
    exit 1
fi