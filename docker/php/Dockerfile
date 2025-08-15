FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    pcre-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    oniguruma-dev \
    curl \
    freetype \
    libpng \
    libjpeg-turbo \
    libwebp \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    build-base \
    autoconf \
    postgresql-dev

# Configure and install PHP extensions
RUN docker-php-ext-configure gd \
        --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install \
        pdo pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd zip xml

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Yarn
RUN apk add --no-cache nodejs npm && npm install -g yarn

# Set working directory
WORKDIR /var/www

# Copy existing application files
COPY . /var/www

COPY .env.example .env

RUN mkdir -p bootstrap/cache \
    storage/framework/{cache/data,views} \
    storage/logs \
  && chmod -R 0777 bootstrap/cache storage

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --prefer-dist --no-progress && \
    php artisan package:discover --ansi && \
    php artisan key:generate && \
    npm install && \
    npm run build

# remove laravel boost and input y on the next prompt
RUN composer remove laravel/boost --dev

ENV DB_HOST=db
ENV DB_PORT=5432
ENV DB_DATABASE=swift_medica
ENV DB_USERNAME=laravel
ENV DB_PASSWORD=secret

# RUN php artisan migrate:fresh --seed

# Expose port for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
