#!/bin/sh
# wait-for-postgres.sh

set -e
  
host="$1"
shift
  
until sqlcmd -S localhost/BASKOI_LMS -U SA -P Motdepasseconforme64; do
  >&2 echo "Test"
  sleep 5
done
  
>&2 echo "MSSQL is up - executing bash script"
exec "$@"