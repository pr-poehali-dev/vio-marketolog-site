import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "Как создать успешный магазин в Telegram: пошаговое руководство",
      excerpt: "Полное руководство по созданию и настройке интернет-магазина в Telegram. От регистрации до первых продаж.",
      category: "Руководства",
      date: "10 января 2024",
      readTime: "8 мин",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      id: 2,
      title: "10 стратегий увеличения конверсии в Telegram-магазинах",
      excerpt: "Проверенные методы, которые помогут увеличить продажи и удержать клиентов в вашем магазине.",
      category: "Маркетинг",
      date: "8 января 2024",
      readTime: "6 мин",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      id: 3,
      title: "Автоматизация работы с заказами: экономим до 5 часов в день",
      excerpt: "Как настроить автоматическую обработку заказов и освободить время для развития бизнеса.",
      category: "Автоматизация",
      date: "5 января 2024",
      readTime: "7 мин",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
    },
    {
      id: 4,
      title: "Промокоды и скидки: как правильно использовать для роста продаж",
      excerpt: "Эффективные стратегии использования промокодов для привлечения и удержания клиентов.",
      category: "Маркетинг",
      date: "3 января 2024",
      readTime: "5 мин",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
    },
    {
      id: 5,
      title: "Аналитика продаж: какие метрики отслеживать в первую очередь",
      excerpt: "Ключевые показатели эффективности для мониторинга здоровья вашего бизнеса.",
      category: "Аналитика",
      date: "1 января 2024",
      readTime: "9 мин",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      id: 6,
      title: "Интеграция с СДЭК: настройка доставки за 15 минут",
      excerpt: "Пошаговая инструкция по подключению и настройке автоматической доставки через СДЭК.",
      category: "Руководства",
      date: "28 декабря 2023",
      readTime: "6 мин",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80"
    }
  ];

  const categories = ["Все статьи", "Руководства", "Маркетинг", "Автоматизация", "Аналитика"];

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
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Главная</Button>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-primary hover:bg-primary/90">
                  Мой магазин
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-16 px-4 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Блог
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Полезные статьи для{" "}
              <span className="text-primary">маркетологов</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Руководства, кейсы и советы по развитию интернет-магазина в Telegram
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск по статьям..." 
                  className="pl-10 h-12"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((category, index) => (
                <Button 
                  key={index} 
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {article.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight mb-2 hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{article.date}</span>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Читать
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Загрузить ещё статьи
                <Icon name="ChevronDown" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-3">
                  Получайте новые статьи первыми
                </CardTitle>
                <CardDescription className="text-base">
                  Подпишитесь на рассылку и будьте в курсе всех обновлений и новостей
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Ваш email" 
                    className="flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    Подписаться
                  </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Никакого спама. Только полезный контент 1-2 раза в неделю.
                </p>
              </CardContent>
            </Card>
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
          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 VIO marketolog. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
