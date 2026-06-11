import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonSelect, IonSelectOption, IonBadge,
  IonCard, IonCardContent, IonGrid, IonRow, IonCol,
  IonButtons, IonMenuButton,
} from "@ionic/react";
import type { Report } from "../types";

interface ReportListProps {
  reports: Report[];
  onSelectReport: (reportId: string) => void;
}

export function ReportList({ reports, onSelectReport }: ReportListProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = Array.from(new Set(reports.map((r) => r.category)));

  const filtered = reports.filter((r) => {
    const matchSearch = !search || r.title.includes(search) || r.category.includes(search) || r.description.includes(search);
    const matchCategory = categoryFilter === "all" || r.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const getDueBadge = (dueDate: Date) => {
    const days = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0) return { label: "期限切れ", color: "danger" };
    if (days === 0) return { label: "本日期限", color: "danger" };
    if (days <= 3) return { label: `あと${days}日`, color: "warning" };
    return { label: `あと${days}日`, color: "primary" };
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>回答待ちレポート</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={search}
            onIonInput={(e) => setSearch(e.detail.value ?? "")}
            placeholder="レポートを検索..."
            style={{ '--padding-start': '8px' }}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ marginBottom: '12px' }}>
          <IonSelect
            value={categoryFilter}
            onIonChange={(e) => setCategoryFilter(e.detail.value)}
            interface="popover"
            label="カテゴリ"
            labelPlacement="floating"
          >
            <IonSelectOption value="all">すべてのカテゴリ</IonSelectOption>
            {categories.map((cat) => (
              <IonSelectOption key={cat} value={cat}>{cat}</IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <p style={{ fontSize: '13px', color: '#888', margin: '0 0 12px' }}>{filtered.length} 件のレポート</p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>レポートが見つかりません</p>
            <p style={{ fontSize: '13px' }}>検索条件を変更してみてください</p>
          </div>
        ) : (
          <IonGrid>
            <IonRow>
              {filtered.map((report) => {
                const dueBadge = getDueBadge(report.dueDate);
                return (
                  <IonCol key={report.id} size="12" sizeMd="6" sizeLg="4">
                    <IonCard
                      button
                      onClick={() => onSelectReport(report.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <IonCardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '14px', flex: 1, marginRight: '8px', lineHeight: '1.4' }}>
                            {report.title}
                          </strong>
                          <IonBadge color={dueBadge.color}>{dueBadge.label}</IonBadge>
                        </div>
                        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 12px', lineHeight: '1.5' }}>
                          {report.description}
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                          <IonBadge color="medium">{report.category}</IonBadge>
                          <span style={{ fontSize: '11px', color: '#aaa', lineHeight: '20px' }}>
                            作成: {report.createdAt.toLocaleDateString("ja-JP")}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--ion-color-light)' }}>
                          <span style={{ fontSize: '11px', color: '#aaa' }}>質問数: {report.questions.length}問</span>
                          <span style={{ fontSize: '12px', color: 'var(--ion-color-primary)', fontWeight: '500' }}>
                            回答する →
                          </span>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
}
