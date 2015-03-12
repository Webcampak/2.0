#!/bin/bash    
HOST="SERVER"
USER="USERNAME"
PASS="PASSWORD"
LCD="/home/webcampak/webcampak/sources/sourceXX/pictures"
RCD="/pictures"
lftp -c "set ftp:list-options -a;
open ftp://$USER:$PASS@$HOST; 
lcd $LCD;
cd $RCD;
mirror --reverse \
       --only-missing \
       --verbose"