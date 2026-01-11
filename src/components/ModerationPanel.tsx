import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationRequest {
  id: number;
  full_name: string;
  inn: string;
  phone: string;
  telegram_username: string;
  email: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

export const ModerationPanel = () => {
  const [requests, setRequests] = useState<RegistrationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RegistrationRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const { toast } = useToast();

  const loadRequests = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/439b18e3-c8aa-4755-b545-4db59ff36f45?status=pending');
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleModeration = async (requestId: number, action: 'approve' | 'reject') => {
    try {
      const response = await fetch('https://functions.poehali.dev/439b18e3-c8aa-4755-b545-4db59ff36f45', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          action: action,
          admin_notes: adminNotes
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: action === 'approve' ? "Заявка одобрена" : "Заявка отклонена",
          description: data.message,
        });
        setIsDialogOpen(false);
        setSelectedRequest(null);
        setAdminNotes('');
        await loadRequests();
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
        description: "Не удалось обработать заявку",
        variant: "destructive"
      });
    }
  };

  const openReviewDialog = (request: RegistrationRequest) => {
    setSelectedRequest(request);
    setAdminNotes('');
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: "На модерации", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
      approved: { label: "Одобрена", className: "bg-green-500/10 text-green-500 border-green-500/20" },
      rejected: { label: "Отклонена", className: "bg-red-500/10 text-red-500 border-red-500/20" },
    };
    const config = variants[status] || variants.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <>
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Модерация заявок</CardTitle>
              <CardDescription>Заявки на регистрацию новых магазинов</CardDescription>
            </div>
            <Button onClick={loadRequests} variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="CheckCircle2" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Нет новых заявок на модерацию</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>ИНН</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Telegram</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.full_name}</TableCell>
                    <TableCell>{request.inn}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>@{request.telegram_username}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(request.created_at).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell className="text-right">
                      {request.status === 'pending' && (
                        <Button
                          onClick={() => openReviewDialog(request)}
                          variant="ghost"
                          size="sm"
                        >
                          <Icon name="Eye" size={16} className="mr-2" />
                          Проверить
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Проверка заявки #{selectedRequest?.id}</DialogTitle>
            <DialogDescription>
              Проверьте данные и одобрите или отклоните заявку
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">ФИО</Label>
                  <p className="font-medium">{selectedRequest.full_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">ИНН</Label>
                  <p className="font-medium">{selectedRequest.inn}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Телефон</Label>
                  <p className="font-medium">{selectedRequest.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Telegram</Label>
                  <p className="font-medium">@{selectedRequest.telegram_username}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedRequest.email}</p>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="admin_notes">Заметки администратора (необязательно)</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Например: Все данные проверены, ИНН действующий"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleModeration(selectedRequest.id, 'reject')}
                  className="text-destructive"
                >
                  <Icon name="X" size={16} className="mr-2" />
                  Отклонить
                </Button>
                <Button
                  onClick={() => handleModeration(selectedRequest.id, 'approve')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Icon name="Check" size={16} className="mr-2" />
                  Одобрить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
