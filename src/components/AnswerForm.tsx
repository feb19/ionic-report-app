import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonBadge, IonButton,
  IonInput, IonRadioGroup, IonRadio, IonItem,
  IonButtons, IonIcon, IonMenuButton,
} from "@ionic/react";
import { checkmarkCircleOutline } from "ionicons/icons";
import type { Report, AnswerItem } from "../types";

interface AnswerFormProps {
  report: Report;
  onSubmit: (answers: AnswerItem[]) => void;
  onBack: () => void;
}

export function AnswerForm({ report, onSubmit, onBack }: AnswerFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors((prev) => { const next = { ...prev }; delete next[questionId]; return next; });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const q of report.questions) {
      if (!answers[q.id] || answers[q.id].trim() === "") {
        newErrors[q.id] = "この質問への回答は必須です";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const answerItems: AnswerItem[] = report.questions.map((q) => ({
      questionId: q.id,
      questionText: q.text,
      questionType: q.type,
      answer: q.type === "select"
        ? q.options?.find((o) => o.value === answers[q.id])?.label ?? answers[q.id]
        : answers[q.id],
    }));
    setSubmitted(true);
    setTimeout(() => onSubmit(answerItems), 1500);
  };

  const daysLeft = Math.ceil((report.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  if (submitted) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonMenuButton /></IonButtons>
            <IonTitle>回答フォーム</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', gap: '16px', padding: '20px' }}>
            <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '64px', color: 'var(--ion-color-success)' }} />
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>回答を送信しました</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#888', textAlign: 'center' }}>ご協力ありがとうございます。結果はレポート一覧から確認できます。</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{report.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={onBack}>← 戻る</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard color="light">
          <IonCardContent>
            <h2 style={{ margin: '0 0 8px' }}>{report.title}</h2>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#555' }}>{report.description}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <IonBadge color="primary">{report.category}</IonBadge>
              <IonBadge color={daysLeft <= 1 ? 'danger' : daysLeft <= 3 ? 'warning' : 'primary'}>
                {daysLeft < 0 ? '期限切れ' : daysLeft === 0 ? '本日期限' : `あと${daysLeft}日`}
              </IonBadge>
              <IonBadge color="medium">{report.questions.length}問</IonBadge>
            </div>
          </IonCardContent>
        </IonCard>

        {report.questions.map((q, idx) => (
          <IonCard key={q.id} style={{ border: errors[q.id] ? '2px solid var(--ion-color-danger)' : undefined }}>
            <IonCardContent>
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ion-color-primary)', marginBottom: '6px', textTransform: 'uppercase' }}>
                質問 {idx + 1} / {report.questions.length}
              </div>
              <p style={{ fontSize: '15px', fontWeight: '600', margin: '0 0 16px' }}>
                {q.text} <span style={{ color: 'var(--ion-color-danger)' }}>*</span>
              </p>

              {q.type === "text" && (
                <IonInput
                  fill="outline"
                  placeholder="回答を入力してください"
                  value={answers[q.id] || ""}
                  onIonInput={(e) => handleChange(q.id, String(e.detail.value ?? ""))}
                />
              )}

              {q.type === "date" && (
                <IonInput
                  type="date"
                  fill="outline"
                  value={answers[q.id] || ""}
                  onIonInput={(e) => handleChange(q.id, String(e.detail.value ?? ""))}
                />
              )}

              {q.type === "select" && q.options && (
                <IonRadioGroup
                  value={answers[q.id] || ""}
                  onIonChange={(e) => handleChange(q.id, e.detail.value)}
                >
                  {q.options.map((opt) => (
                    <IonItem key={opt.value} lines="none">
                      <IonRadio value={opt.value}>{opt.label}</IonRadio>
                    </IonItem>
                  ))}
                </IonRadioGroup>
              )}

              {errors[q.id] && (
                <p style={{ color: 'var(--ion-color-danger)', fontSize: '12px', margin: '8px 0 0' }}>{errors[q.id]}</p>
              )}
            </IonCardContent>
          </IonCard>
        ))}

        <div style={{ display: 'flex', gap: '12px', padding: '8px 0 24px' }}>
          <IonButton expand="block" onClick={handleSubmit} style={{ flex: 1 }}>
            <IonIcon slot="start" icon={checkmarkCircleOutline} />
            回答を送信する
          </IonButton>
          <IonButton fill="outline" onClick={onBack}>
            キャンセル
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
