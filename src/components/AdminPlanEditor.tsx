import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  max_products: number;
  max_shops: number;
  is_active: boolean;
}

export const AdminPlanEditor = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const loadPlans = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/23adb946-fb78-4336-a320-7d9d54f56d1e?type=plans');
      const data = await response.json();
      setPlans(data.plans || []);
    } catch (error) {
      console.error('Ошибка загрузки тарифов:', error);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleSavePlan = async () => {
    if (!editingPlan) return;

    try {
      const response = await fetch('https://functions.poehali.dev/23adb946-fb78-4336-a320-7d9d54f56d1e', {
        method: editingPlan.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'plan',
          ...editingPlan
        })
      });

      if (response.ok) {
        await loadPlans();
        setIsDialogOpen(false);
        setEditingPlan(null);
      }
    } catch (error) {
      console.error('Ошибка сохранения тарифа:', error);
    }
  };

  const openEditDialog = (plan: Plan) => {
    setEditingPlan({ ...plan });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingPlan({
      id: 0,
      name: '',
      price: 0,
      description: '',
      features: [],
      max_products: 100,
      max_shops: 1,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Тарифные планы</h3>
          <p className="text-muted-foreground">Управление тарифами и ценами</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить тариф
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {!plan.is_active && <Badge variant="secondary">Неактивен</Badge>}
              </div>
              <div className="text-3xl font-bold">
                {plan.price}₽ <span className="text-sm text-muted-foreground font-normal">/мес</span>
              </div>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Лимиты:</div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Package" size={16} className="text-primary" />
                  <span>{plan.max_products} товаров</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Store" size={16} className="text-primary" />
                  <span>{plan.max_shops} магазинов</span>
                </div>
              </div>
              <Button onClick={() => openEditDialog(plan)} variant="outline" className="w-full">
                <Icon name="Pencil" size={16} className="mr-2" />
                Редактировать
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id ? 'Редактировать тариф' : 'Создать тариф'}</DialogTitle>
            <DialogDescription>
              Настройте параметры тарифного плана
            </DialogDescription>
          </DialogHeader>
          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Цена (₽/мес)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: parseInt(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max_products">Макс. товаров</Label>
                  <Input
                    id="max_products"
                    type="number"
                    value={editingPlan.max_products}
                    onChange={(e) => setEditingPlan({ ...editingPlan, max_products: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max_shops">Макс. магазинов</Label>
                <Input
                  id="max_shops"
                  type="number"
                  value={editingPlan.max_shops}
                  onChange={(e) => setEditingPlan({ ...editingPlan, max_shops: parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features">Функции (по одной на строку)</Label>
                <Textarea
                  id="features"
                  value={editingPlan.features.join('\n')}
                  onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split('\n') })}
                  rows={5}
                  placeholder="До 100 товаров&#10;1 магазин&#10;Базовая аналитика"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingPlan.is_active}
                  onChange={(e) => setEditingPlan({ ...editingPlan, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_active">Активен</Label>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSavePlan} className="bg-primary hover:bg-primary/90">Сохранить</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
