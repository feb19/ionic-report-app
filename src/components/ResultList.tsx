import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonBadge, IonIcon,
  IonButtons, IonMenuButton,
} from "@ionic/react";
import { checkmarkCircleOutline, chevronForwardOutline, timeOutline } from "ionicons/icons";
import type { Answer } from "../types";

interface ResultListProps {
  answers: Answer[];
  onSelectAnswer: (answerId: string) => void;
}

export function ResultList({ answers, onSelectAnswer }: ResultListProps) {
  const [search, setSearch] = useState("");

  const filtered = answers
    .filter((a) => !search || a.reportTitle.includes(search) || a.reportCategory.includes(search))
    .sort((a, b) => b.answeredAt.getTime() - a.answeredAt.getTime());

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>回答結果一覧</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? "")}
            placeholder="回答を検索..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p style={{ fontSize: '13px', color: '#888', margin: '0 0 12px' }}>{filtered.length} 件の回答</p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#aaa' }}>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>
              {search ? "該当する回答が見つかりません" : "まだ回答はありません"}
            </p>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--ion-color-light)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: 'var(--ion-color-light)' }}>
                <tr>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555', borderBottom: '1px solid var(--ion-color-light-shade)' }}>レポート名</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555', borderBottom: '1px solid var(--ion-color-light-shade)' }}>カテゴリ</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555', borderBottom: '1px solid var(--ion-color-light-shade)' }}>回答日時</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#555', borderBottom: '1px solid var(--ion-color-light-shade)' }}>質問数</th>
                  <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--ion-color-light-shade)' }}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((answer) => (
                  <tr
                    key={answer.id}
                    onClick={() => onSelectAnswer(answer.id)}
                    style={{ cursor: 'pointer', borderBottom: '1px solid var(--ion-color-light)', transition: 'background 0.1s' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'var(--ion-color-light)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = ''}
                  >
                    <td style={{ padding: '14px 16px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: '16px', color: 'var(--ion-color-success)' }} />
                        <span style={{ fontWeight: '500' }}>{answer.reportTitle}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <IonBadge color="medium" style={{ fontSize: '11px' }}>{answer.reportCategory}</IonBadge>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#666' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IonIcon icon={timeOutline} style={{ fontSize: '14px' }} />
                        {answer.answeredAt.toLocaleDateString("ja-JP")} {answer.answeredAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <IonBadge color="light" style={{ fontSize: '11px', color: '#333' }}>{answer.answers.length}問</IonBadge>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <IonIcon icon={chevronForwardOutline} style={{ color: 'var(--ion-color-primary)' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
