# Database Backup Script
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/projectmpa_backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

echo "Creating database backup..."
docker-compose -f docker/docker-compose.yml exec -T postgres pg_dump -U projectmpa projectmpa > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
    gzip $BACKUP_FILE
    echo "Compressed backup: $BACKUP_FILE.gz"
    
    # Keep only last 7 backups
    ls -t $BACKUP_DIR/projectmpa_backup_*.sql.gz | tail -n +8 | xargs -r rm
else
    echo "Backup failed!"
    exit 1
fi