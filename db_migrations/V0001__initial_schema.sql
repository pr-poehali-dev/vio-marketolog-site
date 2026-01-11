-- Пользователи
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Магазины
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    telegram_bot_token VARCHAR(255),
    telegram_bot_username VARCHAR(255),
    banner_url TEXT,
    logo_url TEXT,
    plan_id INTEGER,
    status VARCHAR(50) DEFAULT 'active',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Тарифные планы
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    features JSONB DEFAULT '[]',
    max_products INTEGER,
    max_shops INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Категории товаров
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Товары
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    type VARCHAR(50) DEFAULT 'physical',
    digital_content TEXT,
    images JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Заказы
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_telegram VARCHAR(100),
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    delivery_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Товары в заказе
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    product_name VARCHAR(255),
    product_price DECIMAL(10, 2),
    quantity INTEGER NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- Промокоды
CREATE TABLE IF NOT EXISTS promocodes (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id),
    code VARCHAR(100) UNIQUE NOT NULL,
    discount_type VARCHAR(50),
    discount_value DECIMAL(10, 2),
    min_order_amount DECIMAL(10, 2),
    max_uses INTEGER,
    current_uses INTEGER DEFAULT 0,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Настройки админа
CREATE TABLE IF NOT EXISTS admin_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка тарифных планов по умолчанию
INSERT INTO plans (name, price, description, features, max_products, max_shops)
SELECT 'Пробный', 0, 'Для знакомства с платформой', '["До 50 товаров", "1 магазин", "Базовая аналитика", "Telegram Mini App", "Поддержка в чате"]', 50, 1
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE name = 'Пробный');

INSERT INTO plans (name, price, description, features, max_products, max_shops)
SELECT 'Старт', 990, 'Для начинающих предпринимателей', '["До 100 товаров", "1 магазин", "Базовая аналитика", "Telegram Mini App", "Поддержка в чате"]', 100, 1
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE name = 'Старт');

INSERT INTO plans (name, price, description, features, max_products, max_shops)
SELECT 'Бизнес', 2990, 'Для растущего бизнеса', '["До 1000 товаров", "3 магазина", "Полная аналитика", "Приоритетная поддержка", "Интеграция с СДЭК", "Промокоды и скидки"]', 1000, 3
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE name = 'Бизнес');

INSERT INTO plans (name, price, description, features, max_products, max_shops)
SELECT 'Про', 4990, 'Для масштабирования', '["Неограниченно товаров", "10 магазинов", "Расширенная аналитика", "Персональный менеджер", "API доступ", "Белый лейбл"]', 99999, 10
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE name = 'Про');

INSERT INTO plans (name, price, description, features, max_products, max_shops)
SELECT 'Цифровые товары', 1990, 'Для продажи ключей, игр, аккаунтов', '["До 500 цифровых товаров", "1 магазин", "Автоматическая выдача", "Полная аналитика", "Telegram Mini App", "Поддержка в чате"]', 500, 1
WHERE NOT EXISTS (SELECT 1 FROM plans WHERE name = 'Цифровые товары');

-- Вставка настроек админа по умолчанию
INSERT INTO admin_settings (key, value, description)
SELECT 'payment_account', '{"account": "", "bank": "", "bik": ""}', 'Реквизиты для оплаты тарифов'
WHERE NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'payment_account');

INSERT INTO admin_settings (key, value, description)
SELECT 'support_button', '{"text": "Поддержка", "url": "https://t.me/support"}', 'Настройки кнопки поддержки'
WHERE NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'support_button');

INSERT INTO admin_settings (key, value, description)
SELECT 'contact_button', '{"text": "Связаться", "url": "https://t.me/contact"}', 'Настройки кнопки связи'
WHERE NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'contact_button');

CREATE INDEX IF NOT EXISTS idx_shops_user_id ON shops(user_id);
CREATE INDEX IF NOT EXISTS idx_products_shop_id ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_orders_shop_id ON orders(shop_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);