import React from "react";
import { DownArrow } from "./svgFolder";
import RelevantMemories from "./RelatedMemo";
import { EmblaOptionsType } from "embla-carousel";

const contentText = `Loss of Life and Injuries: The most devastating impact of road accidents
is the loss of human life or permanent disability. These tragedies leave
families shattered and communities in mourning. Economic Burden: Road
accidents impose a substantial economic burden on individuals, families,
and society. Medical expenses, property damage, and lost productivity
can cripple finances and strain resources. Social and Psychological
Trauma: Victims of road accidents often face long-term physical,
emotional, and cognitive consequences. The trauma can lead to mental
health challenges, diminished quality of life, and social isolation.`;

const fakeMemories = [
  {
    type: "Note",
    title: "Road Accidents Causes, Impacts & Solutions",
  },
  {
    type: "Webpage",
    title: "Analysis of Road Accident Causes and Impacts",
  },
  {
    type: "Spaces",
    title: "Report: rise in Drink and Drive Accidents",
  },
  {
    type: "Spaces",
    title: "Analysis of Road Accident Causes and Impacts",
  },
  {
    type: "Spaces",
    title: "Report: rise in Drink and Drive Accidents",
  },
  {
    type: "Spaces",
    title: "Analysis of Road Accident Causes and Impacts",
  },
  {
    type: "Spaces",
    title: "Report: rise in Drink and Drive Accidents",
  },
  {
    type: "Spaces",
    title: "Analysis of Road Accident Causes and Impacts",
  },
];

function Content() {
  const OPTIONS: EmblaOptionsType = { align: "center", slidesToScroll: "auto" };
  return (
    <div className="flex min-w-[55%] max-w-[55%] flex-col gap-8 pt-28 text-[#FFFFFF]">
      <h1 className="text-2xl font-medium">
        Write an essay on 'Effect of road accident & their solution'
      </h1>
      {/* <RelatedMemories memories={fakeMemories} /> */}
      <RelevantMemories memories={fakeMemories} options={OPTIONS} />
      {/* Causes of Road Accidents */}
      {/* this will take the prop of summary */}
      <SummarisedResponse content={contentText} />
    </div>
  );
}
// this needs some client side stuff

function SummarisedResponse({ content }: { content: string }) {
  return (
    <div className="flex h-[50vh] flex-col gap-6">
      <div className="flex items-center gap-2 text-xl font-medium text-[#B3BCC5]">
        <h2 className="flex items-center">Summary</h2>
        <div>
          <DownArrow />
        </div>
      </div>
      <p className="text-xl font-normal">{content}</p>
      <div className="flex gap-6">
        <CopySvg />
        <ReadSvg />
      </div>
    </div>
  );
}

function CopySvg() {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.3355 3.22643C14.9623 3.85322 15.4595 4.59734 15.7987 5.41629C16.138 6.23525 16.3126 7.113 16.3126 7.99943C16.3126 8.88586 16.138 9.76361 15.7987 10.5826C15.4595 11.4015 14.9623 12.1456 14.3355 12.7724M12.3473 5.21543C13.0855 5.95383 13.5003 6.95525 13.5003 7.99943C13.5003 9.0436 13.0855 10.045 12.3473 10.7834M5.0625 5.18693L8.6025 1.64693C8.68117 1.56836 8.78135 1.51487 8.8904 1.4932C8.99945 1.47154 9.11247 1.48268 9.2152 1.52521C9.31792 1.56775 9.40573 1.63977 9.46755 1.73218C9.52936 1.82459 9.56241 1.93325 9.5625 2.04443V13.9544C9.56241 14.0656 9.52936 14.1743 9.46755 14.2667C9.40573 14.3591 9.31792 14.4311 9.2152 14.4736C9.11247 14.5162 8.99945 14.5273 8.8904 14.5057C8.78135 14.484 8.68117 14.4305 8.6025 14.3519L5.0625 10.8119H3.3825C2.7225 10.8119 2.1045 10.4317 1.929 9.79643C1.76813 9.211 1.6869 8.60656 1.6875 7.99943C1.6875 7.37693 1.7715 6.77468 1.929 6.20243C2.1045 5.56643 2.7225 5.18693 3.3825 5.18693H5.0625Z"
        stroke="#687077"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function ReadSvg() {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.7495 2.916C9.6495 2.56223 9.43671 2.25079 9.14348 2.02904C8.85026 1.80729 8.49263 1.68736 8.125 1.6875H5.875C5.1025 1.6875 4.45 2.20725 4.2505 2.916M9.7495 2.916C9.79075 3.0615 9.8125 3.216 9.8125 3.375C9.8125 3.52418 9.75324 3.66726 9.64775 3.77275C9.54226 3.87824 9.39918 3.9375 9.25 3.9375H4.75C4.60082 3.9375 4.45774 3.87824 4.35225 3.77275C4.24676 3.66726 4.1875 3.52418 4.1875 3.375C4.1875 3.216 4.21 3.0615 4.2505 2.916M9.7495 2.916C10.234 2.95275 10.7155 2.9985 11.1948 3.054C12.0198 3.15 12.625 3.86175 12.625 4.69275V14.625C12.625 15.0726 12.4472 15.5018 12.1307 15.8182C11.8143 16.1347 11.3851 16.3125 10.9375 16.3125H3.0625C2.61495 16.3125 2.18573 16.1347 1.86926 15.8182C1.55279 15.5018 1.375 15.0726 1.375 14.625V4.69275C1.375 3.86175 1.9795 3.15 2.80525 3.054C3.28603 2.99833 3.76787 2.95232 4.2505 2.916"
        stroke="#687077"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default Content;
