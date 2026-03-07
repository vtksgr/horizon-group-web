import serviceFlowIcon01 from "@assets/images/common/serviceflowicon01.svg";
import serviceFlowIcon02 from "@assets/images/common/serviceflowicon02.svg";
import serviceFlowIcon03 from "@assets/images/common/serviceflowicon03.svg";
import serviceFlowIcon04 from "@assets/images/common/serviceflowicon04.svg";
import serviceFlowIcon05 from "@assets/images/common/serviceflowicon05.svg";
import serviceFlowIcon06 from "@assets/images/common/serviceflowicon06.svg";
import serviceFlowIcon07 from "@assets/images/common/serviceflowicon07.svg";

const steps = [
  {
    number: 1,
    title: "ご契約",
    description: "サービスや人材についてお気軽にご相談ください。",
    icon: serviceFlowIcon01,
  },
  {
    number: 2,
    title: "ヒアリング",
    description: "ご希望条件や必要な人材像を丁寧にお伺いします。",
    icon: serviceFlowIcon02,
  },
  {
    number: 3,
    title: "人材の推薦",
    description: "条件に合った最適な候補者をご紹介します。",
    icon: serviceFlowIcon03,
  },
  {
    number: 4,
    title: "面接",
    description: "候補者との面接を実施いただきます。",
    icon: serviceFlowIcon04,
  },
  {
    number: 5,
    title: "内定・成約",
    description: "採用決定後、正式に契約を結びます。",
    icon: serviceFlowIcon05,
  },
  {
    number: 6,
    title: "在留資格申請",
    description: "外国人採用の場合、在留資格手続きをサポートします。",
    icon: serviceFlowIcon06,
  },
  {
    number: 7,
    title: "入社",
    description: "必要な手続きを終え、就業がスタートします。",
    icon: serviceFlowIcon07,
  },
];

export default function ServiceFlow() {
  return (
    <section className="py-32 bg-gray-100">
      <div className="xl:w-[75%] mx-auto px-4 xl:px-0">
        <div className="text-center mb-10">
          <h2 className="text-center font-semibold tracking-tight">SERVICE FLOW</h2>
          <h6 className="text-center mb-3 font-semibold">入社までの流れ</h6>
          <p className="text-center mb-3">採用までの流れ専任スタッフが貴社に最適な採用プランを提案します</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#00AEEF] rounded-md p-6 text-center text-white shadow hover:shadow-lg transition-shadow"
            >
              <p className="text-sm mb-1">Step {step.number}</p>
              <h5 className="text-slate-900 font-bold mb-4">{step.title}</h5>
              <div className="w-20 h-20 max-[400px]:w-16 max-[400px]:h-16 mx-auto flex items-center justify-center bg-white rounded-full mb-4">
                <img src={step.icon} alt={step.title} className="text-[#00AEEF] w-16 h-16" />
              </div>
              <p className="text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
