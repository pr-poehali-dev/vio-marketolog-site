import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Store" size={28} className="text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                VIO marketolog
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Возможности</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Тарифы</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Блог</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="hidden md:block">
                <Button variant="ghost">Войти</Button>
              </Link>
              <Link to="/dashboard" className="hidden md:block">
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="ArrowRight" size={18} className="mr-2" />
                  Создать магазин
                </Button>
              </Link>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col gap-6 mt-8">
                    <a href="#features" className="text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Возможности
                    </a>
                    <a href="#pricing" className="text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Тарифы
                    </a>
                    <a href="#faq" className="text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      FAQ
                    </a>
                    <Link to="/blog" className="text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Блог
                    </Link>
                    <div className="border-t border-border pt-6 flex flex-col gap-3">
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">Войти</Button>
                      </Link>
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Создать магазин
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 md:py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Запуск за 15 минут
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Продавайте прямо в{" "}
                  <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
                    мессенджере
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Создавайте и управляйте интернет-магазинами прямо в Telegram. Всё необходимое для запуска и развития вашего бизнеса в мессенджере.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Создать магазин
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Поддержка
                  </Button>
                </div>
              </div>
              <div className="animate-scale-in">
                <Card className="bg-card/50 backdrop-blur border-border/50 p-6">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="text-2xl">Пробный</CardTitle>
                      <Badge variant="outline" className="text-primary border-primary">Бесплатно</Badge>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      0₽ <span className="text-lg text-muted-foreground font-normal">/месяц</span>
                    </div>
                    <CardDescription>
                      Месяц полного доступа ко всем возможностям платформы без ограничений.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span>Настройка доставки</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span>Приём оплаты</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={18} className="text-primary" />
                      <span>Промокоды и скидки</span>
                    </div>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                      Попробовать бесплатно
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Все <span className="text-primary">возможности</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Полный набор инструментов для успешной торговли в мессенджерах
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "Package",
                  title: "Управление товарами",
                  description: "Загружайте товары с фотографиями и описаниями, настраивайте цены и остатки в едином рабочем пространстве."
                },
                {
                  icon: "Smartphone",
                  title: "Telegram Mini App",
                  description: "Покупатели открывают Mini App, смотрят каталог, добавляют товары в корзину и оформляют заказы без перехода на внешние сайты."
                },
                {
                  icon: "BarChart3",
                  title: "Аналитика и статистика",
                  description: "Смотрите сколько заказов, какая выручка и какие товары продаются лучше всего. Отслеживайте продажи и оптимизируйте ассортимент."
                },
                {
                  icon: "Layers",
                  title: "Несколько магазинов",
                  description: "Ведите несколько магазинов в одном аккаунте — удобное для разных брендов или направлений."
                },
                {
                  icon: "Truck",
                  title: "Доставка СДЭК",
                  description: "Интеграция с СДЭК для расчета стоимости доставки и отправки посылок напрямую из системы."
                },
                {
                  icon: "CreditCard",
                  title: "Оплата ЮKassa",
                  description: "Принимайте оплату банковскими картами через ЮKassa — безопасно и удобно для клиентов."
                },
                {
                  icon: "Tags",
                  title: "Каталог товаров",
                  description: "Организуйте товары по категориям, добавляйте описания, цены и фотографии для удобного просмотра."
                },
                {
                  icon: "ShoppingCart",
                  title: "Управление заказами",
                  description: "Принимайте и обрабатывайте заказы, отслеживайте статусы, управляйте доставкой из единого интерфейса."
                },
                {
                  icon: "Zap",
                  title: "Быстрый запуск",
                  description: "Запустите магазин за 15 минут. Современный интерфейс — всё интуитивно понятно с первого раза."
                },
                {
                  icon: "Key",
                  title: "Цифровые товары",
                  description: "Продавайте ключи к ПО, игры, аккаунты и подписки с автоматической выдачей покупателям."
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name={feature.icon} size={24} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Прозрачные <span className="text-primary">тарифы</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Выберите план, который подходит для вашего бизнеса
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Старт",
                  price: "990",
                  description: "Для начинающих предпринимателей",
                  features: [
                    "До 100 товаров",
                    "1 магазин",
                    "Базовая аналитика",
                    "Telegram Mini App",
                    "Поддержка в чате"
                  ]
                },
                {
                  name: "Бизнес",
                  price: "2990",
                  description: "Для растущего бизнеса",
                  popular: true,
                  features: [
                    "До 1000 товаров",
                    "3 магазина",
                    "Полная аналитика",
                    "Приоритетная поддержка",
                    "Интеграция с СДЭК",
                    "Промокоды и скидки"
                  ]
                },
                {
                  name: "Про",
                  price: "4990",
                  description: "Для масштабирования",
                  features: [
                    "Неограниченно товаров",
                    "10 магазинов",
                    "Расширенная аналитика",
                    "Персональный менеджер",
                    "API доступ",
                    "Белый лейбл"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-border/50'} bg-card/50 backdrop-blur`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Популярный</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold mt-4">
                      {plan.price}₽ <span className="text-lg text-muted-foreground font-normal">/мес</span>
                    </div>
                    <CardDescription className="text-base mt-2">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    <Button className={`w-full mt-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                      Выбрать план
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Часто задаваемые <span className="text-primary">вопросы</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Сколько времени нужно для запуска магазина?",
                  answer: "В среднем 15-20 минут. Создайте аккаунт, загрузите товары, настройте доставку и оплату — магазин готов к работе."
                },
                {
                  question: "Есть ли бесплатный тариф?",
                  answer: "Да! Пробный период на 1 месяц с полным доступом ко всем функциям платформы без ограничений."
                },
                {
                  question: "Какие способы оплаты доступны?",
                  answer: "Мы поддерживаем оплату через ЮKassa — банковские карты, СБП, электронные кошельки и другие популярные методы."
                },
                {
                  question: "Как работает доставка?",
                  answer: "Интеграция с СДЭК позволяет автоматически рассчитывать стоимость доставки и создавать заказы на отправку прямо из системы."
                },
                {
                  question: "Можно ли иметь несколько магазинов?",
                  answer: "Да, в зависимости от тарифа вы можете создать от 1 до 10 магазинов в одном аккаунте."
                },
                {
                  question: "Нужно ли создавать своего Telegram бота?",
                  answer: "Нет, платформа автоматически создаст Mini App для вашего магазина. Просто настройте товары и начинайте продавать."
                }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-lg font-medium">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Остались вопросы?</p>
              <Button variant="outline" size="lg">
                <Icon name="Mail" size={20} className="mr-2" />
                Напишите нам
              </Button>
            </div>
          </div>
        </section>

        <section id="instructions" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Начать работу <span className="text-primary">легко</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Следуйте простой инструкции для запуска вашего магазина
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: "UserPlus",
                  title: "Регистрация",
                  description: "Создайте аккаунт за 1 минуту. Укажите email и придумайте пароль."
                },
                {
                  step: "02",
                  icon: "Package",
                  title: "Добавьте товары",
                  description: "Загрузите фото, описания и цены для ваших товаров. Организуйте по категориям."
                },
                {
                  step: "03",
                  icon: "Settings",
                  title: "Настройте магазин",
                  description: "Подключите оплату и доставку. Настройте дизайн под ваш бренд."
                },
                {
                  step: "04",
                  icon: "Rocket",
                  title: "Запустите продажи",
                  description: "Поделитесь ссылкой на магазин в Telegram и начинайте принимать заказы."
                }
              ].map((instruction, index) => (
                <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="text-6xl font-bold text-primary/10 absolute -top-4 -left-2">
                    {instruction.step}
                  </div>
                  <Card className="relative bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon name={instruction.icon} size={28} className="text-primary" />
                      </div>
                      <CardTitle className="text-xl">{instruction.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {instruction.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12">
                Начать работу
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы начать продавать?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Присоединяйтесь к сотням предпринимателей, которые уже зарабатывают с VIO marketolog
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-10">
                Создать магазин бесплатно
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10">
                Посмотреть демо
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Store" size={24} className="text-primary" />
                <span className="text-xl font-bold">VIO marketolog</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа для создания и управления интернет-магазинами в Telegram
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Документация</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Руководство</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API документация</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Видеоуроки</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Политики</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Пользовательское соглашение</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Send" size={16} />
                  Поддержка в Telegram
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@vio-marketolog.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 VIO marketolog. Все права защищены.
            </p>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Начать работу
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;