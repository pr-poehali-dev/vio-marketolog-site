import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface DigitalProduct {
  id: number;
  name: string;
  type: string;
  price: number;
  stock: number;
  content: string;
  status: string;
}

export const DigitalProductsManager = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([
    { id: 1, name: "Microsoft Office 2021", type: "software_key", price: 2500, stock: 10, content: "XXXXX-XXXXX-XXXXX", status: "active" },
    { id: 2, name: "FIFA 24 (Steam)", type: "game", price: 3000, stock: 5, content: "STEAM-KEY-HERE", status: "active" },
    { id: 3, name: "Netflix Premium", type: "account", price: 500, stock: 0, content: "login:pass", status: "inactive" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<DigitalProduct> | null>(null);

  const digitalProductTypes = [
    { value: "software_key", label: "Ключ к ПО" },
    { value: "game", label: "Игра" },
    { value: "account", label: "Аккаунт" },
    { value: "subscription", label: "Подписка" },
    { value: "other", label: "Другое" },
  ];

  const getTypeLabel = (type: string) => {
    return digitalProductTypes.find(t => t.value === type)?.label || type;
  };

  const openCreateDialog = () => {
    setEditingProduct({
      name: '',
      type: 'software_key',
      price: 0,
      stock: 0,
      content: '',
      status: 'active'
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: DigitalProduct) => {
    setEditingProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Key" size={24} className="text-primary" />
              Цифровые товары
            </CardTitle>
            <CardDescription>Ключи, игры, аккаунты, подписки</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog} className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить цифровой товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Добавить цифровой товар</DialogTitle>
                <DialogDescription>
                  Заполните информацию о цифровом товаре
                </DialogDescription>
              </DialogHeader>
              {editingProduct && (
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Название товара</Label>
                    <Input
                      id="name"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="Например: Microsoft Office 2021"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Тип товара</Label>
                      <Select
                        value={editingProduct.type}
                        onValueChange={(value) => setEditingProduct({ ...editingProduct, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          {digitalProductTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) })}
                        placeholder="2500"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Количество в наличии</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                      placeholder="10"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Содержимое (ключи/логины)</Label>
                    <Textarea
                      id="content"
                      value={editingProduct.content}
                      onChange={(e) => setEditingProduct({ ...editingProduct, content: e.target.value })}
                      placeholder="Введите ключи или логины/пароли (по одному на строку)"
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Каждая строка = 1 единица товара. Будут выдаваться автоматически при покупке.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Сохранить</Button>
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
              <TableHead>Тип</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>В наличии</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{getTypeLabel(product.type)}</Badge>
                </TableCell>
                <TableCell>{product.price}₽</TableCell>
                <TableCell>
                  <span className={product.stock === 0 ? "text-destructive" : "text-primary"}>
                    {product.stock} шт
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Eye" size={16} />
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

        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Автоматическая выдача цифровых товаров</p>
              <p className="text-muted-foreground">
                При покупке система автоматически выдаст клиенту ключ или данные аккаунта из списка. 
                После выдачи остаток уменьшится на 1. Пополняйте список товаров вовремя.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
