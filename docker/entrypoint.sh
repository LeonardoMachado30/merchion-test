#!/bin/bash

echo "Aguardando o banco de dados..."

until mysqladmin ping -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
    echo "Banco de dados não está pronto ainda..."
    sleep 3
done

echo "Banco de dados pronto! Executando migrations..."
php artisan migrate --force

echo "Iniciando o PHP-FPM..."
php-fpm
