import type { Report, Answer } from "../types";

const weatherOptions = [
  { value: "sunny", label: "晴れ" },
  { value: "cloudy", label: "曇り" },
  { value: "rainy", label: "雨" },
];

const satisfactionOptions = [
  { value: "very_good", label: "とても良い" },
  { value: "good", label: "良い" },
  { value: "bad", label: "悪い" },
];

const frequencyOptions = [
  { value: "daily", label: "毎日" },
  { value: "weekly", label: "週に1回" },
  { value: "monthly", label: "月に1回" },
];

const moodOptions = [
  { value: "great", label: "絶好調" },
  { value: "normal", label: "普通" },
  { value: "tired", label: "疲れ気味" },
];

const yesNoOptions = [
  { value: "yes", label: "はい" },
  { value: "no", label: "いいえ" },
];

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000);
const daysFromNow = (d: number) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000);

export const initialReports: Report[] = [
  {
    id: "r001",
    title: "週次コンディションチェック",
    category: "健康管理",
    description: "今週のコンディションを記録してください",
    questions: [
      { id: "q1", text: "今日の気分はいかがですか？", type: "select", options: moodOptions },
      { id: "q2", text: "記録日", type: "date" },
      { id: "q3", text: "体調で気になることがあれば教えてください", type: "text" },
    ],
    status: "pending",
    createdAt: daysAgo(2),
    dueDate: daysFromNow(5),
  },
  {
    id: "r002",
    title: "今日の業務振り返り",
    category: "業務報告",
    description: "本日の業務内容を振り返り記入してください",
    questions: [
      { id: "q1", text: "今日の業務で一番注力したことは何ですか？", type: "text" },
      { id: "q2", text: "今日の天気はどうでしたか？", type: "select", options: weatherOptions },
      { id: "q3", text: "報告日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(1),
    dueDate: daysFromNow(3),
  },
  {
    id: "r003",
    title: "ランチ満足度調査",
    category: "社内アンケート",
    description: "本日の社員食堂のランチについてお聞きします",
    questions: [
      { id: "q1", text: "今日のランチはいかがでしたか？", type: "select", options: satisfactionOptions },
      { id: "q2", text: "一番好きなメニューを教えてください", type: "text" },
    ],
    status: "pending",
    createdAt: daysAgo(3),
    dueDate: daysFromNow(4),
  },
  {
    id: "r004",
    title: "リモートワーク環境調査",
    category: "社内アンケート",
    description: "在宅勤務の環境についてご回答ください",
    questions: [
      { id: "q1", text: "自宅での作業環境で改善したい点を教えてください", type: "text" },
      { id: "q2", text: "リモートワークの頻度はどのくらいですか？", type: "select", options: frequencyOptions },
      { id: "q3", text: "回答日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(4),
    dueDate: daysFromNow(7),
  },
  {
    id: "r005",
    title: "チームビルディング意向調査",
    category: "社内アンケート",
    description: "次回のチームイベントに向けた意見を集めます",
    questions: [
      { id: "q1", text: "参加したいアクティビティのアイデアを教えてください", type: "text" },
      { id: "q2", text: "希望する開催日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(5),
    dueDate: daysFromNow(10),
  },
  {
    id: "r006",
    title: "月次目標進捗確認",
    category: "業務報告",
    description: "今月の目標に対する進捗を報告してください",
    questions: [
      { id: "q1", text: "今月最も達成感を感じたことを教えてください", type: "text" },
      { id: "q2", text: "進捗状況はいかがですか？", type: "select", options: satisfactionOptions },
      { id: "q3", text: "報告日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(6),
    dueDate: daysFromNow(2),
  },
  {
    id: "r007",
    title: "研修満足度フィードバック",
    category: "研修・教育",
    description: "先日の研修についてフィードバックをお願いします",
    questions: [
      { id: "q1", text: "研修の満足度を教えてください", type: "select", options: satisfactionOptions },
      { id: "q2", text: "特に役立ったと感じた内容を教えてください", type: "text" },
    ],
    status: "pending",
    createdAt: daysAgo(7),
    dueDate: daysFromNow(3),
  },
  {
    id: "r008",
    title: "オフィス設備リクエスト",
    category: "総務",
    description: "オフィス環境の改善要望を受け付けます",
    questions: [
      { id: "q1", text: "改善を希望する設備・環境を教えてください", type: "text" },
      { id: "q2", text: "緊急性はありますか？", type: "select", options: yesNoOptions },
      { id: "q3", text: "希望する対応完了日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(8),
    dueDate: daysFromNow(14),
  },
  {
    id: "r009",
    title: "1on1 事前アンケート",
    category: "マネジメント",
    description: "来週の1on1ミーティングに向けて事前に記入してください",
    questions: [
      { id: "q1", text: "今週一番気になっているトピックを教えてください", type: "text" },
      { id: "q2", text: "今の仕事のモチベーションはいかがですか？", type: "select", options: moodOptions },
      { id: "q3", text: "1on1の希望日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(1),
    dueDate: daysFromNow(6),
  },
  {
    id: "r010",
    title: "有給取得意向調査",
    category: "総務",
    description: "来期の有給休暇取得計画をお聞きします",
    questions: [
      { id: "q1", text: "有給取得を希望する時期や用途を教えてください", type: "text" },
      { id: "q2", text: "取得希望日（代表日）", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(9),
    dueDate: daysFromNow(21),
  },
  {
    id: "r011",
    title: "社内ツール使いやすさ調査",
    category: "IT・システム",
    description: "現在使用している社内ツールの評価をお願いします",
    questions: [
      { id: "q1", text: "最も使いにくいと感じているツールと理由を教えてください", type: "text" },
      { id: "q2", text: "全体的な使い勝手の評価はいかがですか？", type: "select", options: satisfactionOptions },
    ],
    status: "pending",
    createdAt: daysAgo(10),
    dueDate: daysFromNow(5),
  },
  {
    id: "r012",
    title: "新製品アイデア募集",
    category: "企画・開発",
    description: "新製品・新サービスのアイデアを募集しています",
    questions: [
      { id: "q1", text: "あなたが考える新製品・新サービスのアイデアを教えてください", type: "text" },
      { id: "q2", text: "アイデアの市場性はどう思いますか？", type: "select", options: satisfactionOptions },
      { id: "q3", text: "回答日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(11),
    dueDate: daysFromNow(30),
  },
  {
    id: "r013",
    title: "職場環境満足度調査",
    category: "社内アンケート",
    description: "現在の職場環境について率直なご意見をお聞かせください",
    questions: [
      { id: "q1", text: "職場で最も改善してほしいことを教えてください", type: "text" },
      { id: "q2", text: "全体的な満足度はいかがですか？", type: "select", options: satisfactionOptions },
    ],
    status: "pending",
    createdAt: daysAgo(12),
    dueDate: daysFromNow(7),
  },
  {
    id: "r014",
    title: "コミュニケーション改善提案",
    category: "マネジメント",
    description: "チーム内コミュニケーションの改善に向けた意見を募集します",
    questions: [
      { id: "q1", text: "チームのコミュニケーションで改善したい点を教えてください", type: "text" },
      { id: "q2", text: "コミュニケーションの頻度は適切ですか？", type: "select", options: yesNoOptions },
      { id: "q3", text: "回答日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(13),
    dueDate: daysFromNow(10),
  },
  {
    id: "r015",
    title: "スキルアップ希望調査",
    category: "研修・教育",
    description: "今後のキャリア開発に向けたスキルアップ希望を収集します",
    questions: [
      { id: "q1", text: "習得したいスキルや受けたい研修を教えてください", type: "text" },
      { id: "q2", text: "学習への意欲はいかがですか？", type: "select", options: moodOptions },
    ],
    status: "pending",
    createdAt: daysAgo(14),
    dueDate: daysFromNow(14),
  },
  {
    id: "r016",
    title: "顧客対応品質チェック",
    category: "業務報告",
    description: "今週の顧客対応について振り返ってください",
    questions: [
      { id: "q1", text: "今週印象に残った顧客対応を教えてください", type: "text" },
      { id: "q2", text: "対応品質の自己評価はいかがですか？", type: "select", options: satisfactionOptions },
      { id: "q3", text: "報告日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(2),
    dueDate: daysFromNow(5),
  },
  {
    id: "r017",
    title: "安全衛生チェックリスト",
    category: "総務",
    description: "職場の安全衛生状況を確認します",
    questions: [
      { id: "q1", text: "気になる安全上の問題はありますか？", type: "text" },
      { id: "q2", text: "職場の安全環境に問題はありますか？", type: "select", options: yesNoOptions },
      { id: "q3", text: "確認日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(3),
    dueDate: daysFromNow(7),
  },
  {
    id: "r018",
    title: "プロジェクト完了後アンケート",
    category: "企画・開発",
    description: "先日完了したプロジェクトの振り返りをお願いします",
    questions: [
      { id: "q1", text: "プロジェクトで学んだ最大の教訓を教えてください", type: "text" },
      { id: "q2", text: "プロジェクトの進め方への満足度はいかがですか？", type: "select", options: satisfactionOptions },
    ],
    status: "pending",
    createdAt: daysAgo(4),
    dueDate: daysFromNow(3),
  },
  {
    id: "r019",
    title: "昼食後のエネルギーレベル調査",
    category: "健康管理",
    description: "食後の午後の作業効率に関する調査です",
    questions: [
      { id: "q1", text: "好きな食べ物はなんですか？", type: "text" },
      { id: "q2", text: "今日の天気はどうでしたか？", type: "select", options: weatherOptions },
      { id: "q3", text: "回答日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(5),
    dueDate: daysFromNow(2),
  },
  {
    id: "r020",
    title: "年末年始の予定確認",
    category: "総務",
    description: "年末年始の出勤・休暇予定を確認します",
    questions: [
      { id: "q1", text: "年末年始の予定や過ごし方を教えてください", type: "text" },
      { id: "q2", text: "休暇中も連絡可能ですか？", type: "select", options: yesNoOptions },
      { id: "q3", text: "初出勤予定日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(6),
    dueDate: daysFromNow(20),
  },
  {
    id: "r021",
    title: "社内SNS活用状況調査",
    category: "IT・システム",
    description: "社内コミュニケーションツールの活用状況をお聞きします",
    questions: [
      { id: "q1", text: "社内SNSで改善したい点を教えてください", type: "text" },
      { id: "q2", text: "利用頻度はいかがですか？", type: "select", options: frequencyOptions },
    ],
    status: "pending",
    createdAt: daysAgo(7),
    dueDate: daysFromNow(10),
  },
  {
    id: "r022",
    title: "部署間連携改善調査",
    category: "マネジメント",
    description: "他部署との連携についての意見を収集します",
    questions: [
      { id: "q1", text: "他部署との連携で困っていることを教えてください", type: "text" },
      { id: "q2", text: "部署間のコミュニケーションは十分ですか？", type: "select", options: yesNoOptions },
      { id: "q3", text: "回答日", type: "date" },
    ],
    status: "pending",
    createdAt: daysAgo(8),
    dueDate: daysFromNow(7),
  },
];

export const initialAnswers: Answer[] = [
  {
    id: "a001",
    reportId: "done001",
    reportTitle: "先月のコンディションチェック",
    reportCategory: "健康管理",
    answeredAt: daysAgo(15),
    answers: [
      { questionId: "q1", questionText: "今日の気分はいかがですか？", questionType: "select", answer: "普通" },
      { questionId: "q2", questionText: "記録日", questionType: "date", answer: daysAgo(15).toLocaleDateString("ja-JP") },
      { questionId: "q3", questionText: "体調で気になることがあれば教えてください", questionType: "text", answer: "少し疲れ気味ですが問題ありません" },
    ],
  },
  {
    id: "a002",
    reportId: "done002",
    reportTitle: "前週の業務振り返り",
    reportCategory: "業務報告",
    answeredAt: daysAgo(8),
    answers: [
      { questionId: "q1", questionText: "今日の業務で一番注力したことは何ですか？", questionType: "text", answer: "新機能の設計レビューと実装計画の策定に集中しました" },
      { questionId: "q2", questionText: "今日の天気はどうでしたか？", questionType: "select", answer: "晴れ" },
      { questionId: "q3", questionText: "報告日", questionType: "date", answer: daysAgo(8).toLocaleDateString("ja-JP") },
    ],
  },
  {
    id: "a003",
    reportId: "done003",
    reportTitle: "先月のランチ満足度調査",
    reportCategory: "社内アンケート",
    answeredAt: daysAgo(20),
    answers: [
      { questionId: "q1", questionText: "今日のランチはいかがでしたか？", questionType: "select", answer: "良い" },
      { questionId: "q2", questionText: "一番好きなメニューを教えてください", questionType: "text", answer: "日替わり定食の唐揚げが特に美味しかったです" },
    ],
  },
  {
    id: "a004",
    reportId: "done004",
    reportTitle: "研修フィードバック（6月）",
    reportCategory: "研修・教育",
    answeredAt: daysAgo(10),
    answers: [
      { questionId: "q1", questionText: "研修の満足度を教えてください", questionType: "select", answer: "とても良い" },
      { questionId: "q2", questionText: "特に役立ったと感じた内容を教えてください", questionType: "text", answer: "ケーススタディを通じた実践的な演習が非常に参考になりました" },
    ],
  },
  {
    id: "a005",
    reportId: "done005",
    reportTitle: "1on1 事前アンケート（先週）",
    reportCategory: "マネジメント",
    answeredAt: daysAgo(7),
    answers: [
      { questionId: "q1", questionText: "今週一番気になっているトピックを教えてください", questionType: "text", answer: "来四半期のロードマップについて相談したいです" },
      { questionId: "q2", questionText: "今の仕事のモチベーションはいかがですか？", questionType: "select", answer: "絶好調" },
      { questionId: "q3", questionText: "1on1の希望日", questionType: "date", answer: daysAgo(5).toLocaleDateString("ja-JP") },
    ],
  },
];
