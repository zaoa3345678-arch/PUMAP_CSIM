// 靜宜大學資訊管理學系（靜宜資管）導覽資料
// 規則：所有事實皆取自系所官網 https://csim.pu.edu.tw/ 之公開頁面（擷取日期 2026-11-16），
// 每筆項目以 src 指向下方 SOURCES 的鍵。請勿加入官網沒有的名稱、數字或活動。

export const SOURCES = {
  home: { label: "系所首頁", url: "https://csim.pu.edu.tw/" },
  intro: { label: "系所簡介", url: "https://csim.pu.edu.tw/p/412-1141-4853.php?Lang=zh-tw" },
  faculty: { label: "師資陣容", url: "https://csim.pu.edu.tw/p/412-1141-4793.php?Lang=zh-tw" },
  space: { label: "系所空間", url: "https://csim.pu.edu.tw/p/412-1141-4886.php?Lang=zh-tw" },
  programs: { label: "專業學程", url: "https://csim.pu.edu.tw/p/412-1141-4835.php?Lang=zh-tw" },
  undergrad: { label: "課程資訊－大學部", url: "https://csim.pu.edu.tw/p/412-1141-4840.php?Lang=zh-tw" },
  master: { label: "課程資訊－碩士班", url: "https://csim.pu.edu.tw/p/412-1141-4842.php?Lang=zh-tw" },
  intern: { label: "企業實習", url: "https://csim.pu.edu.tw/p/412-1141-4847.php?Lang=zh-tw" },
  career: { label: "畢業出路", url: "https://csim.pu.edu.tw/p/412-1141-4851.php?Lang=zh-tw" },
};

export const META = {
  title: "靜宜資管島",
  dept: "靜宜大學 資訊管理學系",
  tagline: "人工智慧應用 · 智慧企業 · 大數據分析與社群商務應用",
  address: "433303 臺中市沙鹿區臺灣大道7段200號",
  phone: "04-26328001 分機 18011–18013",
  email: "pu20710@pu.edu.tw",
  social: [
    { label: "Facebook", url: "https://www.facebook.com/pucsim/" },
    { label: "YouTube", url: "https://www.youtube.com/@pucsim401" },
    { label: "Instagram", url: "https://www.instagram.com/pu_csim/" },
  ],
};

// 學年階段（用於時間軸視圖與篩選）
export const STAGES = [
  { id: "y1", label: "大一", note: "學習家族・認識環境" },
  { id: "y2", label: "大二", note: "開始選修實務課群・學程" },
  { id: "y3", label: "大三", note: "分組製作畢業專題" },
  { id: "y4", label: "大四", note: "企業實習・升學或就業" },
  { id: "ms", label: "碩士班", note: "研究方法・論文寫作" },
];

// 每座島 = 一個主題；每個 item = 島上一棟建築（一張資訊卡）
export const ISLANDS = [
  {
    id: "core", name: "系務中心", icon: "🏛️", color: "#2B6CB0", kind: "hub",
    summary: "民國70年成立，中部地區大專院校歷史最悠久的資管系；設學士班及碩士班，隸屬資訊學院。",
    items: [
      { id: "core-history", name: "系所簡介與沿革", src: "intro", stages: ["y1"],
        facts: ["本系成立於民國70年，為中部地區大專院校歷史最悠久的資管系", "畢業系友遍佈全國資通訊、製造業、服務業等各種產業", "學制完整，共設立學士班及碩士班"] },
      { id: "core-axis", name: "三大發展主軸", src: "intro",
        facts: ["人工智慧應用", "智慧企業", "大數據分析與社群商務應用", "培育具備資訊技術能力、AI應用能力、程式設計能力與管理思維能力之專業人才"] },
      { id: "core-ieet", name: "IEET 資訊教育認證（CAC）", src: "intro",
        facts: ["2016年通過第一週期、2020年通過第二週期 IEET（CAC 資訊教育認證）", "代表本系畢業生學歷已受到國際認可", "CAC 目前有9個會員國，會員國承認彼此文憑"] },
      { id: "core-scale", name: "師資與空間規模", src: "intro",
        facts: ["13位專任教師：4位教授、6位副教授、3位助理教授", "7間實驗室供研究生及專題生使用", "另設專業電腦教室及研討室"] },
      { id: "core-contact", name: "系辦聯絡資訊", src: "home",
        facts: ["地址：433303 臺中市沙鹿區臺灣大道7段200號", "電話：04-26328001 分機 18011–18013", "信箱：pu20710@pu.edu.tw"] },
    ],
  },
  {
    id: "goals", name: "教育目標與核心能力", icon: "🎯", color: "#805AD5",
    summary: "培育具有研發、管理及整合資訊系統能力的專業人才，理論與實務並重。",
    items: [
      { id: "goals-aim", name: "教育目標", src: "intro",
        facts: ["培育具有研發、管理及整合資訊系統能力的專業人才", "大學部開設四大專業學程與實務課群", "培養資訊技術能力、AI應用能力、管理思維，以及服務合群品格、國際化視野"] },
      { id: "goals-c1", name: "核心能力一～三", src: "intro",
        facts: ["資訊科技之專業應用與軟體開發的能力", "資訊系統之分析規劃與維護管理的能力", "企業流程之資訊整合與使用評估的能力"] },
      { id: "goals-c2", name: "核心能力四～六", src: "intro",
        facts: ["積極主動之自我學習與解決問題的能力", "專業文件之閱讀理解與組織彙整的能力", "資訊專業之工作倫理與團隊合作的精神"] },
      { id: "goals-ms", name: "碩士班課程重點", src: "intro", stages: ["ms"],
        facts: ["碩士班課程強調研究方法、論文寫作和資訊管理應用等領域"] },
    ],
  },
  {
    id: "fresh", name: "新生學習家族", icon: "🏠", color: "#DD6B20",
    summary: "「學習家族制度」讓新生儘快熟悉環境與專業課程。",
    items: [
      { id: "fresh-family", name: "學習家族制度", src: "intro", stages: ["y1"],
        facts: ["每年招生二班共100多位新生", "每班規劃4個學習家族", "每一學習家族設置1位輔導導師及4位學習助教，每週安排固定家族輔導時間"] },
      { id: "fresh-training", name: "新技術教育訓練", src: "intro", stages: ["y1", "y2", "y3", "y4"],
        facts: ["本系針對最新的資訊技術，每學期規劃多場的教育訓練"] },
      { id: "fresh-assoc", name: "資管系學會", src: "home", stages: ["y1", "y2", "y3", "y4"],
        facts: ["系學會與各式社團協助同學走過大學生活", "系學會 Instagram：@pucsim__29th"], link: "https://www.instagram.com/pucsim__29th/" },
    ],
  },
  {
    id: "p-soft", name: "資訊軟體學程", icon: "💻", color: "#3182CE", kind: "program",
    summary: "四大套裝學程之一：程式設計、演算法、網頁與行動應用、系統分析。修滿15學分可取得學程證書。",
    items: [
      { id: "soft-a", name: "程式基礎", src: "programs", stages: ["y1", "y2"], facts: ["程式語言", "演算法概論", "進階資料結構"] },
      { id: "soft-b", name: "網頁與網路程式", src: "programs", stages: ["y2", "y3"], facts: ["網路程式設計", "網頁前端程式設計", "動態網頁設計"] },
      { id: "soft-c", name: "行動與系統開發", src: "programs", stages: ["y2", "y3"], facts: ["行動應用軟體開發", "資訊軟體實作", "系統分析與設計"] },
    ],
  },
  {
    id: "p-ai", name: "人工智慧應用學程", icon: "🤖", color: "#38A169", kind: "program",
    summary: "四大套裝學程之一：Python、機器學習、深度學習、物聯網與雲端。修滿15學分可取得學程證書。",
    items: [
      { id: "ai-a", name: "AI 基礎", src: "programs", stages: ["y1", "y2"], facts: ["人工智慧概論", "Python程式設計", "Python應用實務"] },
      { id: "ai-b", name: "機器學習與深度學習", src: "programs", stages: ["y2", "y3"], facts: ["機器學習", "深度學習", "大數據分析"] },
      { id: "ai-c", name: "AIoT 與雲端", src: "programs", stages: ["y2", "y3"], facts: ["物聯網概論", "智慧物聯網應用實務", "雲端技術與應用", "行動應用軟體開發"] },
    ],
  },
  {
    id: "p-erp", name: "智慧企業學程（SAP ERP）", icon: "🏢", color: "#2C5282", kind: "program",
    summary: "全台唯一單一科系開設最完整的 SAP ERP 學程，涵蓋人資、採購、財務、生產、配銷到物流。",
    items: [
      { id: "erp-a", name: "ERP 核心課程", src: "programs", stages: ["y2", "y3"], facts: ["企業資源規劃", "企業資源規劃系統管理", "ABAP 程式設計"] },
      { id: "erp-b", name: "企業功能資訊系統", src: "programs", stages: ["y2", "y3"], facts: ["運籌管理資訊系統", "財務會計資訊系統", "人力資源管理系統"] },
      { id: "erp-c", name: "流程與決策", src: "programs", stages: ["y3", "y4"], facts: ["管理科學", "企業流程管理", "專案管理", "商業智慧與資料倉儲"] },
      { id: "erp-d", name: "SAP ERP 特色", src: "intro",
        facts: ["中部大專院校最積極推動SAP ERP的系所", "選用德國研發、全球市佔率第一的 SAP ERP 軟體", "規劃從人力資源、採購、財務、生產、配銷到物流的完整課程"] },
    ],
  },
  {
    id: "p-data", name: "大數據與社群商務學程", icon: "📊", color: "#D53F8C", kind: "program",
    summary: "四大套裝學程之一：巨量資料分析、商業智慧、電子商務與網路行銷。修滿15學分可取得學程證書。",
    items: [
      { id: "data-a", name: "資料分析", src: "programs", stages: ["y2", "y3"], facts: ["巨量資料分析導論", "大數據分析", "商業智慧與資料倉儲", "機器學習"] },
      { id: "data-b", name: "電子商務與行銷", src: "programs", stages: ["y2", "y3"], facts: ["行銷管理", "電子商務", "網路行銷", "電商社群媒體經營"] },
      { id: "data-c", name: "顧客與消費者", src: "programs", stages: ["y3", "y4"], facts: ["網路消費者行為", "顧客關係管理"] },
    ],
  },
  {
    id: "labs", name: "專業實驗室群（主顧樓）", icon: "🔬", color: "#319795",
    summary: "7間專業實驗室位於主顧樓 403–415，供專題生及研究生使用。",
    items: [
      { id: "lab-403", name: "APP與人機互動實驗室（主顧403）", src: "space", stages: ["y3", "ms"],
        facts: ["iMac（macOS）與一般個人電腦，開發APP、數位內容與遊戲", "提供 XBOX One 設備開發 Kinect 遊戲", "發展方向：APP 設計、遊戲設計", "負責教師：康贊清、顏永森"] },
      { id: "lab-405", name: "企業資源規劃實驗室（主顧405）", src: "space", stages: ["y3", "ms"],
        facts: ["與華苓科技合作創立前瞻數位轉型研究中心", "發展方向：企業資源規劃、ABAP 程式設計、網路應用系統、網路行銷、地理資訊系統、策略資訊系統", "負責教師：楊子青、馬宏諭"] },
      { id: "lab-407", name: "物聯網與行動裝置應用實驗室（主顧407）", src: "space", stages: ["y3", "ms"],
        facts: ["發展方向：家庭、校園、健康及各產業之物聯網應用與行動裝置應用系統", "負責教師：吳建興、張怡君"] },
      { id: "lab-409", name: "資料庫與資料探勘實驗室（主顧409）", src: "space", stages: ["y3", "ms"],
        facts: ["發展方向：資料庫與資料倉儲、多媒體資料庫、XML、資料探勘技術", "負責教師：簡永仁、陳武林"] },
      { id: "lab-411", name: "資訊安全與網路管理實驗室（主顧411）", src: "space", stages: ["y3", "ms"],
        facts: ["發展方向：作業系統安全、電子商務安全、資料庫安全、網路與 TCP/IP 安全、密碼學、無線通訊管理等", "負責教師：葉介山、王孝熙"] },
      { id: "lab-413", name: "多媒體技術與應用實驗室（主顧413）", src: "space", stages: ["y3", "ms"],
        facts: ["發展方向：數位影像處理、影像壓縮、資訊隱藏、數位浮水印、3D 動畫製作等", "負責教師：王耀德"] },
      { id: "lab-415", name: "人工智慧應用實驗室（主顧415）", src: "space", stages: ["y3", "ms"],
        facts: ["發展方向：互動機器人、智慧醫療、智慧製造、智慧金融等 AI 應用", "負責教師：王逸民、鄭婉淑"] },
    ],
  },
  {
    id: "faculty", name: "專任師資", icon: "👩‍🏫", color: "#B7791F", kind: "faculty",
    summary: "13位專任教師，資訊技術與資訊管理背景並重。",
    items: [
      { id: "t-whh", name: "王孝熙 教授兼副校長", src: "faculty", facts: ["研究專長：叢集運算、計算機網路、分散式處理、作業系統", "國立交通大學 資訊工程 博士", "分機 18102、11060"] },
      { id: "t-cwl", name: "陳武林 教授兼系主任", src: "faculty", facts: ["研究專長：隨機模式、生產管理、作業研究、系統模擬", "美國普渡大學 工業工程 博士", "分機 18109"] },
      { id: "t-yys", name: "顏永森 教授", src: "faculty", facts: ["研究專長：行銷管理、電子商務、全通路商務管理", "國立政治大學 企業管理學系 博士", "分機 18106"] },
      { id: "t-wym", name: "王逸民 教授", src: "faculty", facts: ["研究專長：程式設計訓練、軟體設計與開發、演算法", "國立交通大學 資訊科學系 博士", "分機 18105"] },
      { id: "t-cyc", name: "張怡君 副教授", src: "faculty", facts: ["研究專長：智慧物聯網應用、數位學習科技、創新網路應用及服務", "成功大學 資訊工程所 博士", "分機 18127"] },
      { id: "t-cyr", name: "簡永仁 副教授", src: "faculty", facts: ["研究專長：XML、圖形資料庫、資料庫系統", "國立中興大學 應數研究所資訊組 博士", "分機 18104"] },
      { id: "t-yjs", name: "葉介山 副教授兼國際長", src: "faculty", facts: ["研究專長：資料探勘、資料分析、雲端運算、資訊安全", "美國俄亥俄州州立大學 數學 博士", "分機 18113、11700"] },
      { id: "t-ytc", name: "楊子青 副教授", src: "faculty", facts: ["研究專長：資訊管理、企業資源規劃、網路行銷、行動應用軟體開發", "國立中山大學 資訊管理 博士", "分機 18110"] },
      { id: "t-wyt", name: "王耀德 副教授", src: "faculty", facts: ["研究專長：資料探勘、大數據分析、物聯網、數位邏輯", "國立台灣大學 資訊管理學 博士", "分機 18114"] },
      { id: "t-ktc", name: "康贊清 助理教授", src: "faculty", facts: ["研究專長：資訊接受、虛擬社群、電子商務、知識管理、區塊鏈應用、多變量統計分析", "國立中正大學 資訊管理學系 博士", "分機 18124"] },
      { id: "t-wjs", name: "吳建興 助理教授", src: "faculty", facts: ["研究專長：教育大數據、生醫資訊、大數據、演算法、資料庫", "國立中山大學 資訊工程研究所 博士", "分機 18118"] },
      { id: "t-cws", name: "鄭婉淑 助理教授", src: "faculty", facts: ["研究專長：大數據分析、AI物聯網、深度學習、精準醫療、單晶片資訊通訊", "成功大學 資訊工程所 博士", "分機 18128"] },
      { id: "t-mhy", name: "馬宏諭 助理教授", src: "faculty", facts: ["研究專長：電子商務、統計分析、管理資訊系統", "國立陽明交通大學 資訊管理 博士", "分機 18120"] },
    ],
  },
  {
    id: "capstone", name: "畢業專題與競賽", icon: "🏆", color: "#C53030",
    summary: "大三開始分組製作畢業專題，參與成果發表及校內外競賽。",
    items: [
      { id: "cap-flow", name: "畢業實務專題", src: "intro", stages: ["y3", "y4"],
        facts: ["同學們從大三開始分組進行畢業專題製作", "參與成果發表及參加校內外競賽", "與台中榮民總醫院等實際場域問題為導向進行實務專題製作"] },
      { id: "cap-2025", name: "2025 資訊學院畢業專題競賽", src: "home", stages: ["y4"],
        facts: ["金牌：推拉不NG（資訊應用與創新服務類）", "金牌：AICPR心肺拯救之旅（人工智慧與系統整合類）", "金牌：E-Clothes（物聯網與APP應用類）", "銀牌：永續智能小屋；銅牌：Capybara 兒童互動遊戲"] },
      { id: "cap-ext", name: "校外競賽獲獎", src: "intro",
        facts: ["2023 永續智慧創新黑客松競賽 智慧醫療組 第1名", "2021 第26屆大專校院資訊應用服務創新競賽 資訊應用組三 第3名", "2019 第24屆大專校院資訊應用服務創新競賽 資訊應用組(IP3) 第2名、EDUOD組 第2名", "2019 第6屆瑪利MuMu盃 第1名"] },
      { id: "cap-works", name: "學生專題作品（影音專區）", src: "home",
        facts: ["食光冰箱、智慧藥盒、藥你好、辨色龍、倉鼠智能管家", "寵物電商平台APP、Brain Bubble、Easy Bus、居家健身輔助系統", "就醫推薦系統、復健趣、玩食部落 等"] },
    ],
  },
  {
    id: "industry", name: "企業實習與產學合作", icon: "🤝", color: "#2F855A",
    summary: "暑期實習、全學年（期）實習與海外實習，與產業鏈結、銜接就業。",
    items: [
      { id: "ind-summer", name: "暑期企業實習", src: "intro", stages: ["y2", "y3"],
        facts: ["學生於七月至九月進行企業實習", "開設「企業實習」課程 3學分，每學分60小時，共180小時"] },
      { id: "ind-year", name: "全學年（期）企業實習（含海外）", src: "intro", stages: ["y4", "ms"],
        facts: ["大四、碩班上與下學期各開設「企業實習」課程 9學分", "每學分60小時，共540小時", "實習表現良好者有機會直接獲錄取為正職員工"] },
      { id: "ind-partners", name: "產學合作夥伴", src: "intro",
        facts: ["2023年11月與華苓科技聯合成立前瞻數位轉型研究／人才培育中心", "2023年與遠傳電信產學合作（開發校園新生活App等）", "2023年與台中榮民總醫院急診科、職業醫學科、感染科、骨科等各科產學合作"] },
      { id: "ind-ai", name: "AI 智慧創新跨域人才", src: "intro",
        facts: ["智慧商務／智慧醫療／智慧機械／智慧服務／智慧醫療照護等創新跨領域人才培育"] },
    ],
  },
  {
    id: "cert", name: "專業證照與學程證書", icon: "📜", color: "#6B46C1",
    summary: "課程儘量搭配實務專業證照；每一學程修滿15學分可取得學程證書。",
    items: [
      { id: "cert-erp", name: "ERP / BI 證照輔導", src: "intro", stages: ["y2", "y3", "y4"],
        facts: ["ERP規劃師", "ERP軟體應用師（財務、配銷、生管製造模組）", "進階ERP規劃師（財務管理、運籌管理、人力資源管理）", "BI規劃師", "SAP Certified Business Associate with SAP ERP（SAP TERP 原廠認證）"] },
      { id: "cert-prog", name: "學程證書", src: "programs", stages: ["y2", "y3", "y4"],
        facts: ["每一學程修滿15學分，可取得學程證書", "畢業前未強制取得學程，但鼓勵修習以聚焦學習、有利就業"] },
      { id: "cert-other", name: "其他專業證照", src: "career",
        facts: ["專業技術人員考試含高普考", "CCNA（CISCO）工程師認證", "MCSE 工程師認證"] },
    ],
  },
  {
    id: "future", name: "升學與就業出路", icon: "🚀", color: "#2D3748",
    summary: "五年學碩一貫、碩士班，或投入資訊產業各職務。",
    items: [
      { id: "fut-5y", name: "五年學碩一貫學程", src: "intro", stages: ["y4", "ms"],
        facts: ["可於五年內獲得學士與碩士雙學位", "修讀碩士學費比照國立大學"] },
      { id: "fut-study", name: "升學方向", src: "career", stages: ["y4"],
        facts: ["資訊管理、資訊科學、資訊工程、企業管理、資訊傳播、資訊教育等相關領域繼續深造"] },
      { id: "fut-jobs", name: "就業職務", src: "career", stages: ["y4"],
        facts: ["資料庫管理人員", "人工智慧工程師", "MIS 程式設計師", "系統分析師", "資訊管理部門主管"] },
      { id: "fut-ieet", name: "國際認可學歷", src: "intro",
        facts: ["通過 IEET 資訊教育國際認證", "畢業生可申請公約國家公職或專業工程師執照的學歷資格"] },
    ],
  },
];

// 島與島之間的連線（學習動線）
export const LINKS = [
  ["core", "goals"], ["core", "fresh"], ["fresh", "p-soft"], ["fresh", "p-ai"], ["fresh", "p-erp"], ["fresh", "p-data"],
  ["p-erp", "cert"], ["p-soft", "labs"], ["p-ai", "labs"], ["p-data", "labs"], ["labs", "faculty"],
  ["labs", "capstone"], ["capstone", "industry"], ["industry", "future"], ["cert", "future"], ["core", "faculty"],
];
