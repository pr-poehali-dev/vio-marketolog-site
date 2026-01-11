import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    inn: '',
    phone: '',
    telegram_username: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/439b18e3-c8aa-4755-b545-4db59ff36f45', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: data.message,
        });
        setFormData({ full_name: '', inn: '', phone: '', telegram_username: '', email: '' });
      } else {
        toast({
          title: "Ошибка",
          description: data.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Icon name="Store" size={28} className="text-primary" />
            <span className="text-2xl font-bold">VIO marketolog</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Регистрация магазина</CardTitle>
            <CardDescription className="text-base">
              Заполните данные для создания магазина в Telegram
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Пробный период 30 дней бесплатно!</p>
                    <p className="text-muted-foreground">
                      После подачи заявки мы проверим данные и отправим уведомление в Telegram. 
                      Обычно это занимает 1-2 часа.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="full_name">ФИО полностью *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Иванов Иван Иванович"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="inn">ИНН *</Label>
                  <Input
                    id="inn"
                    value={formData.inn}
                    onChange={(e) => setFormData({ ...formData, inn: e.target.value })}
                    placeholder="123456789012"
                    maxLength={12}
                    required
                  />
                  <p className="text-xs text-muted-foreground">12 цифр для физ. лиц, 10 цифр для ИП</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Номер телефона *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (900) 123-45-67"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telegram_username">Telegram (без @) *</Label>
                  <Input
                    id="telegram_username"
                    value={formData.telegram_username}
                    onChange={(e) => setFormData({ ...formData, telegram_username: e.target.value.replace('@', '') })}
                    placeholder="username"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    На этот аккаунт придёт уведомление об одобрении
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.ru"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg space-y-2 text-sm">
                <p className="font-medium">Что будет дальше:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
                  <li>Мы проверим ваши данные (обычно 1-2 часа)</li>
                  <li>Отправим уведомление в Telegram об одобрении</li>
                  <li>Вы получите доступ к платформе на 30 дней бесплатно</li>
                  <li>Сможете создать магазин и начать продавать</li>
                </ol>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link to="/" className="text-primary hover:underline">
                  условиями использования
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Register;
