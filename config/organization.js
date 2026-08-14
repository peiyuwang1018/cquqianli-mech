window.QIANLI_ORGANIZATION = {
  defaultView: "technology",
  views: {
    technology: {
      label: "技术组别",
      eyebrow: "TECHNICAL GROUPS",
      title: "专业能力组织",
      description: "五个技术组独立建设专业能力，并通过兵种项目与赛季任务形成协作。",
      lanes: [
        {
          number: "01",
          title: "技术研发",
          note: "围绕机器人系统形成相互衔接的专业能力。",
          layout: "four",
          cards: [
            { title: "机械", meta: "机器人本体", description: "负责结构、机构、加工装配、测试维护与机械系统迭代。" },
            { title: "电控", meta: "控制与软件", description: "负责机器人控制系统、运动控制、通信与整车软件集成。" },
            { title: "硬件", meta: "电气系统", description: "负责电路、电气连接、供电与全兵种硬件支持，不归属单一兵种。", variant: "global" },
            { title: "视觉", meta: "感知与算法", description: "负责环境感知、目标识别、定位与赛场算法能力。" },
          ],
        },
        {
          number: "02",
          title: "传播与运营",
          note: "面向全队提供长期、跨项目的传播和运营支持。",
          layout: "single",
          cards: [
            { title: "宣运", meta: "全队覆盖", description: "负责视觉传播、内容建设、赛事运营与团队公共形象，不归属单一兵种。", variant: "global" },
          ],
        },
      ],
    },
    responsibility: {
      label: "职责组别",
      eyebrow: "RESPONSIBILITY GROUPS",
      title: "跨组职责网络",
      description: "职责组由技术组、兵种组成员兼任；管理层是跨越各组的特殊协调层。",
      lanes: [
        {
          number: "01",
          title: "管理协调层",
          note: "连接组织治理、赛季目标、技术决策与兵种执行。",
          layout: "single",
          cards: [
            {
              title: "管理层",
              meta: "特殊职责组",
              description: "由常设管理职责与研发协调接口共同组成，承担跨组决策和资源协调。",
              variant: "management",
              sections: [
                { label: "常设管理职责", tags: ["指导老师", "队长", "项目管理", "质量管理"] },
                { label: "研发协调接口", tags: ["技术组负责人", "兵种负责人"] },
              ],
            },
          ],
        },
        {
          number: "02",
          title: "赛季专项职责",
          note: "按赛季需求组织，由相关技术组和兵种组队员兼任。",
          layout: "two",
          cards: [
            { title: "基建组", meta: "设施与效率", description: "研发服务机器人的场地设施、训练设施和效率工具。" },
            { title: "战术组", meta: "分析与训练", description: "负责战术分析、赛场信息整理与操作手训练。" },
          ],
        },
        {
          number: "03",
          title: "培训组",
          note: "每个技术组独立建设培训体系，并在赛季交接阶段承担新人培养。",
          layout: "five",
          cards: [
            { title: "机械培训", meta: "机械组", description: "负责机械设计、加工装配与工程实践能力培养。" },
            { title: "电控培训", meta: "电控组", description: "负责控制系统、软件工程与整车调试能力培养。" },
            { title: "硬件培训", meta: "硬件组", description: "负责电路、电气与硬件工程能力培养。" },
            { title: "视觉培训", meta: "视觉组", description: "负责机器视觉、算法与感知能力培养。" },
            { title: "宣运培训", meta: "宣运组", description: "负责传播、内容生产与赛事运营能力培养。" },
          ],
        },
      ],
    },
    unit: {
      label: "兵种组别",
      eyebrow: "ROBOT UNITS",
      title: "兵种项目组织",
      description: "三个兵种组承接赛季项目；机械、电控、视觉进入兵种协作，硬件与宣运跨域覆盖。",
      lanes: [
        {
          number: "01",
          title: "兵种项目组",
          note: "空中与飞镖是两个独立兵种，共用一个兵种组进行组织协作。",
          layout: "three",
          cards: [
            {
              title: "重装组",
              meta: "原英雄与工程合并",
              description: "统筹重装方向的机器人项目与赛季任务。",
              tags: ["机械", "电控", "视觉"],
            },
            {
              title: "步哨组",
              meta: "合组管理，兵种独立",
              description: "步兵与哨兵保留独立兵种目标，在同一组内共享组织与协作接口。",
              childUnits: ["步兵兵种", "哨兵兵种"],
              tags: ["机械", "电控", "视觉"],
            },
            {
              title: "空中飞镖组",
              meta: "合组管理，兵种独立",
              description: "空中与飞镖保留独立兵种目标，在同一组内共享组织与协作接口。",
              childUnits: ["空中兵种", "飞镖兵种"],
              tags: ["机械", "电控", "视觉"],
            },
          ],
        },
        {
          number: "02",
          title: "跨兵种支持",
          note: "不进入单一兵种编制，但覆盖所有兵种和相关技术工作。",
          layout: "two",
          cards: [
            { title: "硬件", meta: "覆盖全部兵种", description: "为全部兵种提供电气系统、供电、连接与硬件支持。", variant: "global" },
            { title: "宣运", meta: "覆盖全队", description: "为兵种与技术工作提供传播、记录、运营和公共内容支持。", variant: "global" },
          ],
        },
      ],
    },
    position: {
      label: "定位组别",
      eyebrow: "TEAM POSITIONS",
      title: "赛季成员定位",
      description: "定位描述成员在当季的承担方式，不等同于行政等级，也不绑定具体姓名。",
      lanes: [
        {
          number: "01",
          title: "顾问层",
          note: "已经退役但保持紧密联系，为团队提供经验、资源与关键判断支持。",
          layout: "single",
          cards: [
            { title: "顾问", meta: "经验支持", description: "在技术路线、项目管理、行业经验和长期发展方面提供指导。", variant: "advisor" },
          ],
        },
        {
          number: "02",
          title: "正式队员层",
          note: "本赛季研发主体，由核心队员和正式队员共同构成。",
          layout: "two",
          cards: [
            { title: "核心队员", meta: "关键承担", description: "承担关键研发、兵种统筹、技术决策或团队公共责任。", variant: "core" },
            { title: "正式队员", meta: "赛季研发主体", description: "承担明确赛季职责，完成设计、研发、维护与复盘工作。", variant: "formal" },
          ],
        },
        {
          number: "03",
          title: "梯队层",
          note: "通过培训和实习逐步进入真实项目，为未来赛季积累能力与经验。",
          layout: "single",
          cards: [
            { title: "梯队队员", meta: "培养与实习", description: "参与培训、基础训练项目和兵种实习，逐步形成独立承担能力。", variant: "trainee" },
          ],
        },
      ],
    },
  },
};
