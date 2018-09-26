#!/bin/bash

for conf in /etc/nginx/sites/*.conf; do
    mv $conf "/etc/nginx/sites-available/"$(basename $conf) > /dev/null
done

