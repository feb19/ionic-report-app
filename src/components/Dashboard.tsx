import {
  IonCard, IonCardContent, IonGrid, IonRow, IonCol,
  IonItem, IonLabel, IonBadge, IonButton, IonProgressBar,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonPage, IonContent,
} from "@ionic/react";
import type { Report, Answer } from "../types";

interface DashboardProps {
  reports: Report[];
  answers: Answer[];
  onNavigate: (view: "reports" | "results") => void;
}

export function Dashboard({ reports, answers, onNavigate }: DashboardProps) {
  const pendingReports = reports.filter((r) => r.status === "pending");
  const answeredCount = answers.length;
  const totalReports = reports.length + answeredCount;
  const responseRate = totalReports > 0 ? Math.round((answeredCount / totalReports) * 100) : 0;

  const urgentReports = pendingReports
    .filter((r) => {
      const diff = r.dueDate.getTime() - new Date().getTime();
      return diff < 3 * 24 * 60 * 60 * 1000;
    })
    .slice(0, 5);

  const recentAnswers = [...answers]
    .sort((a, b) => b.answeredAt.getTime() - a.answeredAt.getTime())
    .slice(0, 5);

  const categoryCount = reports.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>ダッシュボード</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p style={{ color: '#888', fontSize: '13px', marginTop: 0 }}>レポートの収集状況と最新情報を確認できます</p>

        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard color="primary" style={{ margin: 0 }}>
                <IonCardContent>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>{pendingReports.length}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>回答待ちレポート</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ margin: 0 }}>
                <IonCardContent>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>{answeredCount}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>回答済みレポート</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard style={{ margin: 0 }}>
                <IonCardContent>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>{urgentReports.length}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>期限間近（3日以内）</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ margin: 0 }}>
                <IonCardContent>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>{responseRate}%</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>回答率</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonCard>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <strong>期限間近のレポート</strong>
              <IonButton fill="clear" size="small" onClick={() => onNavigate("reports")}>すべて見る</IonButton>
            </div>
            {urgentReports.length === 0 ? (
              <p style={{ color: '#888', fontSize: '13px' }}>期限間近のレポートはありません</p>
            ) : (
              urgentReports.map((report) => {
                const daysLeft = Math.ceil((report.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <IonItem key={report.id} lines="full" button onClick={() => onNavigate("reports")}>
                    <IonLabel>
                      <h3>{report.title}</h3>
                      <p>{report.category}</p>
                    </IonLabel>
                    <IonBadge slot="end" color={daysLeft <= 1 ? 'danger' : 'warning'}>
                      {daysLeft <= 0 ? '期限切れ' : `あと${daysLeft}日`}
                    </IonBadge>
                  </IonItem>
                );
              })
            )}
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>全体の回答進捗</span>
                <span>{responseRate}%</span>
              </div>
              <IonProgressBar value={responseRate / 100} />
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <strong>最近の回答</strong>
              <IonButton fill="clear" size="small" onClick={() => onNavigate("results")}>すべて見る</IonButton>
            </div>
            {recentAnswers.length === 0 ? (
              <p style={{ color: '#888', fontSize: '13px' }}>まだ回答はありません</p>
            ) : (
              recentAnswers.map((answer) => (
                <IonItem key={answer.id} lines="full" button onClick={() => onNavigate("results")}>
                  <IonLabel>
                    <h3>{answer.reportTitle}</h3>
                    <p>{answer.answeredAt.toLocaleDateString("ja-JP")} {answer.answeredAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}</p>
                  </IonLabel>
                  <IonBadge slot="end" color="success">回答済</IonBadge>
                </IonItem>
              ))
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <strong style={{ display: 'block', marginBottom: '12px' }}>カテゴリ別レポート数</strong>
            <IonGrid>
              <IonRow>
                {Object.entries(categoryCount).map(([cat, count]) => (
                  <IonCol key={cat} size="6" style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'var(--ion-color-light)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '12px' }}>{cat}</span>
                      <IonBadge color="primary">{count}</IonBadge>
                    </div>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
