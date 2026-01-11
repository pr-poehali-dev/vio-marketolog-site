import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface AdminSetting {
  key: string;
  value: any;
  description: string;
}

export const AdminSettingsEditor = () => {
  const [settings, setSettings] = useState<AdminSetting[]>([]);
  const [editedSettings, setEditedSettings] = useState<Record<string, any>>({});

  const loadSettings = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/23adb946-fb78-4336-a320-7d9d54f56d1e?type=settings');
      const data = await response.json();
      setSettings(data.settings || []);
      
      const initialEdits: Record<string, any> = {};
      data.settings?.forEach((s: AdminSetting) => {
        initialEdits[s.key] = s.value;
      });
      setEditedSettings(initialEdits);
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveSetting = async (key: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/23adb946-fb78-4336-a320-7d9d54f56d1e', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'setting',
          key: key,
          value: editedSettings[key]
        })
      });

      if (response.ok) {
        await loadSettings();
      }
    } catch (error) {
      console.error('Ошибка сохранения настройки:', error);
    }
  };

  const updateSetting = (key: string, field: string, value: string) => {
    setEditedSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Настройки платформы</h3>
        <p className="text-muted-foreground">Управление кнопками, реквизитами и ссылками</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-primary" />
              </div>
              <div>
                <CardTitle>Реквизиты для оплаты</CardTitle>
                <CardDescription>Счёт для получения оплаты за тарифы</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editedSettings.payment_account && (
              <>
                <div className="grid gap-2">
                  <Label>Номер счёта</Label>
                  <Input
                    value={editedSettings.payment_account.account || ''}
                    onChange={(e) => updateSetting('payment_account', 'account', e.target.value)}
                    placeholder="40817810000000000000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Название банка</Label>
                  <Input
                    value={editedSettings.payment_account.bank || ''}
                    onChange={(e) => updateSetting('payment_account', 'bank', e.target.value)}
                    placeholder="ПАО Сбербанк"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>БИК</Label>
                  <Input
                    value={editedSettings.payment_account.bik || ''}
                    onChange={(e) => updateSetting('payment_account', 'bik', e.target.value)}
                    placeholder="044525225"
                  />
                </div>
                <Button onClick={() => handleSaveSetting('payment_account')} className="bg-primary hover:bg-primary/90">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить реквизиты
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="MessageCircle" size={20} className="text-primary" />
              </div>
              <div>
                <CardTitle>Кнопка поддержки</CardTitle>
                <CardDescription>Настройки кнопки обратной связи</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editedSettings.support_button && (
              <>
                <div className="grid gap-2">
                  <Label>Текст кнопки</Label>
                  <Input
                    value={editedSettings.support_button.text || ''}
                    onChange={(e) => updateSetting('support_button', 'text', e.target.value)}
                    placeholder="Поддержка"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>URL ссылки</Label>
                  <Input
                    value={editedSettings.support_button.url || ''}
                    onChange={(e) => updateSetting('support_button', 'url', e.target.value)}
                    placeholder="https://t.me/support"
                  />
                </div>
                <Button onClick={() => handleSaveSetting('support_button')} className="bg-primary hover:bg-primary/90">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить настройки
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <CardTitle>Кнопка связи</CardTitle>
                <CardDescription>Кнопка для контактов</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {editedSettings.contact_button && (
              <>
                <div className="grid gap-2">
                  <Label>Текст кнопки</Label>
                  <Input
                    value={editedSettings.contact_button.text || ''}
                    onChange={(e) => updateSetting('contact_button', 'text', e.target.value)}
                    placeholder="Связаться"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>URL ссылки</Label>
                  <Input
                    value={editedSettings.contact_button.url || ''}
                    onChange={(e) => updateSetting('contact_button', 'url', e.target.value)}
                    placeholder="https://t.me/contact"
                  />
                </div>
                <Button onClick={() => handleSaveSetting('contact_button')} className="bg-primary hover:bg-primary/90">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить настройки
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
