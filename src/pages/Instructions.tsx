import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Instructions = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Store" size={28} className="text-primary" />
              <span className="text-2xl font-bold">VIO marketolog</span>
            </Link>
            <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90">
              <Icon name="Printer" size={18} className="mr-2" />
              Скачать PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Инструкция по работе с VIO marketolog</h1>
            <p className="text-xl text-muted-foreground">
              Полное руководство по созданию и управлению магазином в Telegram
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="UserPlus" size={28} className="text-primary" />
                1. Регистрация на платформе
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Шаг 1: Подача заявки</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground">
                  <li>Перейдите на сайт vio-marketolog.ru</li>
                  <li>Нажмите кнопку "Создать магазин"</li>
                  <li>Заполните форму регистрации:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>ФИО полностью</li>
                      <li>ИНН (12 цифр для физ. лиц, 10 для ИП)</li>
                      <li>Номер телефона в формате +7...</li>
                      <li>Telegram username (без @)</li>
                      <li>Email для связи</li>
                    </ul>
                  </li>
                  <li>Нажмите "Отправить заявку"</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Шаг 2: Ожидание модерации</h3>
                <p className="text-muted-foreground">
                  После отправки заявки администраторы проверят ваши данные. Обычно это занимает 1-2 часа.
                  Вы получите уведомление в Telegram об одобрении или отклонении заявки.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Шаг 3: Получение доступа</h3>
                <p className="text-muted-foreground">
                  После одобрения заявки вы получите 30 дней пробного периода бесплатно.
                  В течение этого времени вы можете пользоваться всеми функциями платформы без ограничений.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Send" size={28} className="text-primary" />
                2. Создание магазина в Telegram
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Шаг 1: Создание бота</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground">
                  <li>Откройте Telegram и найдите @BotFather</li>
                  <li>Отправьте команду /newbot</li>
                  <li>Придумайте название для вашего бота (например: "Мой магазин")</li>
                  <li>Придумайте username для бота (должен заканчиваться на "bot", например: myshop_bot)</li>
                  <li>Скопируйте токен бота (начинается с цифр, формат: 123456:ABCdef...)</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Шаг 2: Подключение бота к платформе</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground">
                  <li>Войдите в личный кабинет на vio-marketolog.ru</li>
                  <li>Перейдите в раздел "Настройки"</li>
                  <li>Найдите секцию "Создать магазин с Telegram ботом"</li>
                  <li>Введите название магазина</li>
                  <li>Вставьте токен бота, полученный от @BotFather</li>
                  <li>Нажмите "Создать магазин"</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Шаг 3: Проверка</h3>
                <p className="text-muted-foreground">
                  После создания магазина автоматически создаются 3 базовые категории: Популярное, Новинки, Акции.
                  Теперь можно добавлять товары!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="Package" size={28} className="text-primary" />
                3. Добавление товаров
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Физические товары</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground">
                  <li>Перейдите во вкладку "Товары"</li>
                  <li>Нажмите "Добавить товар"</li>
                  <li>Заполните информацию:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>Название товара</li>
                      <li>Цена</li>
                      <li>Количество на складе</li>
                      <li>Категория</li>
                      <li>Описание</li>
                    </ul>
                  </li>
                  <li>Загрузите фотографии товара (до 5 шт)</li>
                  <li>Нажмите "Сохранить"</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Цифровые товары</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground">
                  <li>Перейдите во вкладку "Цифровые товары"</li>
                  <li>Нажмите "Добавить цифровой товар"</li>
                  <li>Выберите тип товара (ключ к ПО / игра / аккаунт / подписка)</li>
                  <li>Укажите название и цену</li>
                  <li>В поле "Содержимое" добавьте ключи или логины/пароли (по одному на строку)</li>
                  <li>Каждая строка = 1 единица товара</li>
                  <li>При покупке система автоматически выдаст ключ клиенту</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="ShoppingCart" size={28} className="text-primary" />
                4. Управление заказами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 ml-4 text-muted-foreground">
                <li>Все заказы отображаются во вкладке "Заказы"</li>
                <li>Статусы заказов:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li><strong>Ожидает</strong> - новый заказ, требует обработки</li>
                    <li><strong>В обработке</strong> - заказ принят в работу</li>
                    <li><strong>Завершен</strong> - заказ выполнен</li>
                  </ul>
                </li>
                <li>Для цифровых товаров ключи выдаются автоматически</li>
                <li>Для физических товаров укажите данные доставки</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="CreditCard" size={28} className="text-primary" />
                5. Тарифы и оплата
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Пробный период</h3>
                <p className="text-muted-foreground">
                  Первые 30 дней работы бесплатно. Без комиссий, без ограничений.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Тарифы после пробного периода</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Старт (990₽/мес)</strong> - до 100 товаров, 1 магазин</li>
                  <li><strong>Бизнес (2990₽/мес)</strong> - до 1000 товаров, 3 магазина, промокоды</li>
                  <li><strong>Про (4990₽/мес)</strong> - без ограничений, 10 магазинов, API</li>
                  <li><strong>Цифровые товары (1990₽/мес)</strong> - 500 цифровых товаров, автовыдача</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Оплата</h3>
                <p className="text-muted-foreground">
                  Оплатить подписку можно через личный кабинет. Реквизиты для оплаты отображаются в разделе "Настройки" → "Тарифы".
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="HelpCircle" size={28} className="text-primary" />
                6. Поддержка
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Если у вас возникли вопросы или проблемы:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>📧 Email: info@vio-marketolog.ru</li>
                <li>💬 Telegram: @vio_support</li>
                <li>📞 Телефон: +7 (800) 123-45-67</li>
                <li>🌐 Сайт: vio-marketolog.ru</li>
              </ul>
            </CardContent>
          </Card>

          <div className="print:hidden text-center pt-8">
            <Button onClick={handlePrint} size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="Printer" size={20} className="mr-2" />
              Скачать инструкцию в PDF
            </Button>
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          @page {
            margin: 2cm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Instructions;
