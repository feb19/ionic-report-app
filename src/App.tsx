import { useState } from "react";
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { gridOutline, documentTextOutline, checkmarkCircleOutline } from "ionicons/icons";
import { Dashboard } from "./components/Dashboard";
import { ReportList } from "./components/ReportList";
import { AnswerForm } from "./components/AnswerForm";
import { ResultList } from "./components/ResultList";
import { ResultDetail } from "./components/ResultDetail";
import { initialReports, initialAnswers } from "./data/mockData";
import type { Report, Answer, AnswerItem, ViewType } from "./types";

function App() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const pendingReports = reports.filter((r) => r.status === "pending");

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    setSelectedReportId(null);
    setSelectedAnswerId(null);
  };

  const handleSelectReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentView("answer");
  };

  const handleSubmitAnswer = (reportId: string, answerItems: AnswerItem[]) => {
    const report = reports.find((r) => r.id === reportId);
    if (!report) return;

    const newAnswer: Answer = {
      id: `a${Date.now()}`,
      reportId,
      reportTitle: report.title,
      reportCategory: report.category,
      answeredAt: new Date(),
      answers: answerItems,
    };

    setAnswers((prev) => [newAnswer, ...prev]);
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "answered" } : r))
    );

    setTimeout(() => {
      setCurrentView("results");
      setSelectedAnswerId(newAnswer.id);
      setSelectedReportId(null);
    }, 1600);
  };

  const handleSelectAnswer = (answerId: string) => {
    setSelectedAnswerId(answerId);
    setCurrentView("resultDetail");
  };

  const selectedReport = selectedReportId ? reports.find((r) => r.id === selectedReportId) : null;
  const selectedAnswer = selectedAnswerId ? answers.find((a) => a.id === selectedAnswerId) : null;

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard reports={pendingReports} answers={answers} onNavigate={handleNavigate} />;
      case "reports":
        return <ReportList reports={pendingReports} onSelectReport={handleSelectReport} />;
      case "answer":
        return selectedReport ? (
          <AnswerForm
            report={selectedReport}
            onSubmit={(items) => handleSubmitAnswer(selectedReport.id, items)}
            onBack={() => handleNavigate("reports")}
          />
        ) : null;
      case "results":
        return <ResultList answers={answers} onSelectAnswer={handleSelectAnswer} />;
      case "resultDetail":
        return selectedAnswer ? (
          <ResultDetail answer={selectedAnswer} onBack={() => { setCurrentView("results"); setSelectedAnswerId(null); }} />
        ) : null;
      default:
        return null;
    }
  };

  const isActive = (view: ViewType) =>
    currentView === view ||
    (currentView === "answer" && view === "reports") ||
    (currentView === "resultDetail" && view === "results");

  return (
    <IonApp>
      <IonSplitPane contentId="main-content">
        <IonMenu contentId="main-content" type="overlay">
          <IonHeader>
            <IonToolbar>
              <IonTitle>ReportHub</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonNote style={{ padding: '8px 16px', display: 'block', fontSize: '12px' }}>
              レポート管理システム
            </IonNote>
            <IonList>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  button
                  detail={false}
                  onClick={() => handleNavigate("dashboard")}
                  color={isActive("dashboard") ? "primary" : undefined}
                >
                  <IonIcon slot="start" icon={gridOutline} />
                  <IonLabel>ダッシュボード</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  button
                  detail={false}
                  onClick={() => handleNavigate("reports")}
                  color={isActive("reports") ? "primary" : undefined}
                >
                  <IonIcon slot="start" icon={documentTextOutline} />
                  <IonLabel>回答待ちレポート</IonLabel>
                  {pendingReports.length > 0 && (
                    <IonBadge slot="end" color="danger">{pendingReports.length}</IonBadge>
                  )}
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle autoHide={false}>
                <IonItem
                  button
                  detail={false}
                  onClick={() => handleNavigate("results")}
                  color={isActive("results") ? "primary" : undefined}
                >
                  <IonIcon slot="start" icon={checkmarkCircleOutline} />
                  <IonLabel>回答結果</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <div id="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
          {renderContent()}
        </div>
      </IonSplitPane>
    </IonApp>
  );
}

export default App;
