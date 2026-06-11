import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonBadge, IonIcon, IonButton, IonButtons, IonMenuButton,
} from "@ionic/react";
import { checkmarkCircleOutline, timeOutline } from "ionicons/icons";
import type { Answer } from "../types";

const questionTypeLabel = { text: "テキスト", date: "日付", select: "選択" };

interface ResultDetailProps {
  answer: Answer;
  onBack: () => void;
}

export function ResultDetail({ answer, onBack }: ResultDetailProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{answer.reportTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={onBack}>← 戻る</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard color="success">
          <IonCardContent>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '28px', color: 'white', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h2 style={{ margin: '0 0 8px', color: 'white', fontSize: '18px' }}>{answer.reportTitle}</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <IonBadge style={{ background: 'rgba(255,255,255,0.3)', color: 'white' }}>{answer.reportCategory}</IonBadge>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IonIcon icon={timeOutline} />
                    {answer.answeredAt.toLocaleDateString("ja-JP")} {answer.answeredAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        <p style={{ fontSize: '13px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
          回答内容（{answer.answers.length}問）
        </p>

        {answer.answers.map((item, idx) => (
          <IonCard key={item.questionId}>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ion-color-primary)' }}>Q{idx + 1}</span>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: '500' }}>{item.questionText}</span>
                <IonBadge color="light" style={{ fontSize: '10px', color: '#555' }}>{questionTypeLabel[item.questionType]}</IonBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: 'var(--ion-color-light)', borderRadius: '8px' }}>
                <IonIcon icon={checkmarkCircleOutline} style={{ color: 'var(--ion-color-success)', fontSize: '18px' }} />
                <span style={{ fontSize: '15px', fontWeight: '500' }}>{item.answer}</span>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}
