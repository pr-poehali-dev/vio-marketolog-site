-- Добавление полей модерации в users
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS telegram_username VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS inn VARCHAR(12);
ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS moderation_status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE users ADD COLUMN IF NOT EXISTS moderation_notes TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_expires_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'trial';

-- Добавление таблицы для заявок на регистрацию
CREATE TABLE IF NOT EXISTS registration_requests (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    inn VARCHAR(12) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    telegram_username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by INTEGER REFERENCES users(id)
);

-- Настройки модерации
INSERT INTO admin_settings (key, value, description)
SELECT 'moderation_email', '{"email": "admin@vio-marketolog.ru"}', 'Email для получения заявок на модерацию'
WHERE NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'moderation_email');

INSERT INTO admin_settings (key, value, description)
SELECT 'trial_period_days', '{"days": 30}', 'Длительность пробного периода в днях'
WHERE NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'trial_period_days');

CREATE INDEX IF NOT EXISTS idx_registration_requests_status ON registration_requests(status);
CREATE INDEX IF NOT EXISTS idx_users_moderation_status ON users(moderation_status);