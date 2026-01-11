import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DigitalProductsManager } from "@/components/DigitalProductsManager";
import { CreateShopWithBot } from "@/components/CreateShopWithBot";

const Dashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Футболка базовая", price: 1500, stock: 45, category: "Одежда", status: "active" },
    { id: 2, name: "Джинсы классические", price: 3500, stock: 20, category: "Одежда", status: "active" },
    { id: 3, name: "Кроссовки спортивные", price: 5000, stock: 0, category: "Обувь", status: "inactive" },
  ]);

  const [orders, setOrders] = useState([
    { id: 1001, customer: "Иван Петров", total: 6500, status: "pending", date: "12.01.2024" },
    { id: 1002, customer: "Мария Сидорова", total: 3500, status: "completed", date: "11.01.2024" },
    { id: 1003, customer: "Алексей Смирнов", total: 8000, status: "processing", date: "11.01.2024" },
  ]);

  const stats = [
    { label: "Всего заказов", value: "156", change: "+12%", icon: "ShoppingCart" },
    { label: "Выручка", value: "485 000₽", change: "+8%", icon: "TrendingUp" },
    { label: "Товаров", value: "342", change: "+23", icon: "Package" },
    { label: "Клиентов", value: "89", change: "+5", icon: "Users" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      active: { label: "Активен", variant: "default" },
      inactive: { label: "Неактивен", variant: "secondary" },
      pending: { label: "Ожидает", variant: "outline" },
      processing: { label: "В обработке", variant: "default" },
      completed: { label: "Завершен", variant: "secondary" },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Store" size={28} className="text-primary" />
              <span className="text-2xl font-bold">VIO marketolog</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <Icon name="Shield" size={18} className="mr-2" />
                  Админ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Мой магазин</h1>
          <p className="text-muted-foreground">Управляйте товарами, заказами и настройками</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={stat.icon} size={18} className="text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-primary">
                  {stat.change} за последний месяц
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="products">
              <Icon name="Package" size={18} className="mr-2" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="digital">
              <Icon name="Key" size={18} className="mr-2" />
              Цифровые товары
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Товары</CardTitle>
                    <CardDescription>Управление каталогом товаров</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Добавить товар
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Добавить новый товар</DialogTitle>
                        <DialogDescription>
                          Заполните информацию о товаре
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Название товара</Label>
                          <Input id="name" placeholder="Например: Футболка базовая" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="price">Цена</Label>
                            <Input id="price" type="number" placeholder="1500" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="stock">Остаток</Label>
                            <Input id="stock" type="number" placeholder="45" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Категория</Label>
                          <Input id="category" placeholder="Одежда" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Описание</Label>
                          <Textarea id="description" placeholder="Описание товара..." rows={4} />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Отмена</Button>
                        <Button className="bg-primary hover:bg-primary/90">Сохранить</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Товар</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена</TableHead>
                      <TableHead>Остаток</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}₽</TableCell>
                        <TableCell>
                          <span className={product.stock === 0 ? "text-destructive" : ""}>
                            {product.stock} шт
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
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

          <TabsContent value="digital" className="space-y-4">
            <DigitalProductsManager />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle>Заказы</CardTitle>
                <CardDescription>Управление заказами клиентов</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>№ Заказа</TableHead>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.total}₽</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Icon name="Eye" size={16} className="mr-2" />
                            Просмотр
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-6">
              <CreateShopWithBot />
              
              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Настройки магазина</CardTitle>
                  <CardDescription>Основные параметры вашего магазина</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="shop-name">Название магазина</Label>
                    <Input id="shop-name" defaultValue="Мой магазин" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="shop-description">Описание</Label>
                    <Textarea id="shop-description" defaultValue="Интернет-магазин в Telegram" rows={3} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="telegram-bot">Telegram бот</Label>
                    <Input id="telegram-bot" defaultValue="@myshop_bot" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="banner">Баннер магазина</Label>
                    <Input id="banner" type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground">Рекомендуемый размер: 1200x400px</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="logo">Логотип магазина</Label>
                    <Input id="logo" type="file" accept="image/*" />
                    <p className="text-xs text-muted-foreground">Рекомендуемый размер: 200x200px</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Оплата и доставка</CardTitle>
                  <CardDescription>Настройка способов оплаты и доставки</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="CreditCard" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">ЮKassa</div>
                        <div className="text-sm text-muted-foreground">Прием онлайн-платежей</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="Truck" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">СДЭК</div>
                        <div className="text-sm text-muted-foreground">Доставка по России</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;