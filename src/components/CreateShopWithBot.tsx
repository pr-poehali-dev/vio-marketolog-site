import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const CreateShopWithBot = () => {
  const [botToken, setBotToken] = useState('');
  const [shopName, setShopName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateShop = async () => {
    if (!botToken || !shopName) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/705befde-2466-45b7-83e5-48b891b31b69', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_token: botToken,
          shop_name: shopName,
          user_id: 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Успешно!",
          description: data.message || "Магазин создан",
        });
        setBotToken('');
        setShopName('');
      } else {
        toast({
          title: "Ошибка",
          description: data.error || "Не удалось создать магазин",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при создании магазина",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur border-border/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Send" size={24} className="text-primary" />
          </div>
          <div>
            <CardTitle>Создать магазин с Telegram ботом</CardTitle>
            <CardDescription>
              Подключите своего бота и автоматически создайте магазин
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="shop_name">Название магазина</Label>
            <Input
              id="shop_name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Мой интернет-магазин"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bot_token">Токен Telegram бота</Label>
            <Input
              id="bot_token"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              type="password"
            />
            <p className="text-xs text-muted-foreground">
              Получите токен у{" "}
              <a
                href="https://t.me/BotFather"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @BotFather
              </a>
            </p>
          </div>

          <Button
            onClick={handleCreateShop}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Создание...
              </>
            ) : (
              <>
                <Icon name="Plus" size={18} className="mr-2" />
                Создать магазин
              </>
            )}
          </Button>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg space-y-3">
          <div className="font-medium flex items-center gap-2">
            <Icon name="Info" size={18} className="text-primary" />
            Как это работает
          </div>
          <ol className="text-sm text-muted-foreground space-y-2 ml-6 list-decimal">
            <li>Создайте бота через @BotFather в Telegram</li>
            <li>Скопируйте токен бота (начинается с цифр)</li>
            <li>Вставьте токен и название магазина выше</li>
            <li>Система автоматически настроит магазин с категориями</li>
            <li>Начинайте добавлять товары и продавать!</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
