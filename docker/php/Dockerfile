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
    autoconf 

# Configure and install PHP extensions
RUN docker-php-ext-configure gd \
        --with-freetype --with-jpeg --with-webp && \
    docker-php-ext-install \
        pdo pdo_mysql mbstring exif pcntl bcmath gd zip xml

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application files
COPY . /var/www

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --prefer-dist --no-progress && \
    php artisan key:generate

# Expose port for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
