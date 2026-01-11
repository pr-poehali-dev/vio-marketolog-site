import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Иван Петров", email: "ivan@example.com", shops: 2, plan: "Бизнес", status: "active", registered: "15.12.2023" },
    { id: 2, name: "Мария Сидорова", email: "maria@example.com", shops: 1, plan: "Старт", status: "active", registered: "20.12.2023" },
    { id: 3, name: "Алексей Смирнов", email: "alex@example.com", shops: 5, plan: "Про", status: "active", registered: "05.01.2024" },
    { id: 4, name: "Елена Иванова", email: "elena@example.com", shops: 0, plan: "Пробный", status: "trial", registered: "10.01.2024" },
  ]);

  const [shops, setShops] = useState([
    { id: 1, name: "Магазин одежды", owner: "Иван Петров", products: 145, orders: 89, revenue: 320000, status: "active" },
    { id: 2, name: "Обувной бутик", owner: "Иван Петров", products: 67, orders: 45, revenue: 180000, status: "active" },
    { id: 3, name: "Электроника", owner: "Мария Сидорова", products: 234, orders: 156, revenue: 890000, status: "active" },
    { id: 4, name: "Косметика", owner: "Алексей Смирнов", products: 89, orders: 23, revenue: 95000, status: "inactive" },
  ]);

  const stats = [
    { label: "Всего пользователей", value: "1,247", change: "+156", icon: "Users", color: "text-blue-500" },
    { label: "Активных магазинов", value: "892", change: "+43", icon: "Store", color: "text-green-500" },
    { label: "Общая выручка", value: "12.5M₽", change: "+18%", icon: "TrendingUp", color: "text-emerald-500" },
    { label: "Заказов сегодня", value: "234", change: "+12", icon: "ShoppingCart", color: "text-purple-500" },
  ];

  const recentActivity = [
    { id: 1, type: "user", action: "Новый пользователь зарегистрирован", user: "Анна Кузнецова", time: "2 мин назад" },
    { id: 2, type: "shop", action: "Создан новый магазин", user: "Дмитрий Волков", time: "15 мин назад" },
    { id: 3, type: "order", action: "Крупный заказ на 45,000₽", user: "Магазин электроники", time: "1 час назад" },
    { id: 4, type: "payment", action: "Оплата тарифа Про", user: "Ольга Морозова", time: "2 часа назад" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: "Активен", className: "bg-green-500/10 text-green-500 border-green-500/20" },
      inactive: { label: "Неактивен", className: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
      trial: { label: "Пробный", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
      suspended: { label: "Приостановлен", className: "bg-red-500/10 text-red-500 border-red-500/20" },
    };
    const config = variants[status] || variants.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      user: "UserPlus",
      shop: "Store",
      order: "ShoppingCart",
      payment: "CreditCard",
    };
    return icons[type] || "Activity";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Shield" size={28} className="text-primary" />
              <span className="text-2xl font-bold">Админ-панель</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Link to="/dashboard">
                <Button variant="outline">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  К магазину
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
          <p className="text-muted-foreground">Управление пользователями, магазинами и системой</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon} size={18} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-primary">
                  {stat.change} за сегодня
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>События в системе за последний час</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={getActivityIcon(activity.type)} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Быстрые действия</CardTitle>
              <CardDescription>Часто используемые функции</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90" variant="default">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Добавить пользователя
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Icon name="Mail" size={18} className="mr-2" />
                Рассылка уведомлений
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Icon name="FileText" size={18} className="mr-2" />
                Отчёты и аналитика
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Icon name="Settings" size={18} className="mr-2" />
                Настройки системы
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="users">
              <Icon name="Users" size={18} className="mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="shops">
              <Icon name="Store" size={18} className="mr-2" />
              Магазины
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Пользователи платформы</CardTitle>
                    <CardDescription>Управление учётными записями пользователей</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative w-64">
                      <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Поиск по имени или email..." className="pl-10" />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Icon name="UserPlus" size={18} className="mr-2" />
                      Добавить
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Магазинов</TableHead>
                      <TableHead>Тариф</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>{user.shops}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.plan}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{user.registered}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Icon name="Pencil" size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shops" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Магазины на платформе</CardTitle>
                    <CardDescription>Все созданные интернет-магазины</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Поиск магазина..." className="pl-10" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Владелец</TableHead>
                      <TableHead>Товаров</TableHead>
                      <TableHead>Заказов</TableHead>
                      <TableHead>Выручка</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shops.map((shop) => (
                      <TableRow key={shop.id}>
                        <TableCell className="font-medium">{shop.name}</TableCell>
                        <TableCell className="text-muted-foreground">{shop.owner}</TableCell>
                        <TableCell>{shop.products}</TableCell>
                        <TableCell>{shop.orders}</TableCell>
                        <TableCell className="font-medium">{shop.revenue.toLocaleString()}₽</TableCell>
                        <TableCell>{getStatusBadge(shop.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Icon name="Settings" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Рост пользователей</CardTitle>
                  <CardDescription>Динамика регистраций за последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    График будет здесь
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Распределение тарифов</CardTitle>
                  <CardDescription>Количество пользователей по тарифным планам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Пробный", count: 234, percent: 18.8, color: "bg-yellow-500" },
                      { name: "Старт", count: 567, percent: 45.5, color: "bg-blue-500" },
                      { name: "Бизнес", count: 312, percent: 25.0, color: "bg-green-500" },
                      { name: "Про", count: 134, percent: 10.7, color: "bg-purple-500" },
                    ].map((plan, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{plan.name}</span>
                          <span className="text-sm text-muted-foreground">{plan.count} ({plan.percent}%)</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className={`h-full ${plan.color}`} style={{ width: `${plan.percent}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Настройки платформы</CardTitle>
                <CardDescription>Общие параметры и конфигурация системы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Тарифные планы</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {["Старт", "Бизнес", "Про"].map((plan, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="font-medium mb-2">{plan}</div>
                        <div className="text-sm text-muted-foreground mb-3">
                          {[990, 2990, 4990][index]}₽/мес
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Редактировать
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Интеграции</h3>
                  <div className="space-y-3">
                    {[
                      { name: "ЮKassa", status: "Подключено", icon: "CreditCard" },
                      { name: "СДЭК", status: "Подключено", icon: "Truck" },
                      { name: "Telegram Bot API", status: "Активно", icon: "Send" },
                    ].map((integration, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name={integration.icon} size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{integration.name}</div>
                            <div className="text-sm text-muted-foreground">{integration.status}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Настроить</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
