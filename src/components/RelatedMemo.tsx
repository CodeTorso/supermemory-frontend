"use client";

import { EmblaOptionsType } from "embla-carousel";
import { PrevButton, NextButton, usePrevNextButtons } from "./Arrow";
import useEmblaCarousel from "embla-carousel-react";
import { DownArrow, LinkArrow } from "./svgFolder";

type memories = { type: string; title: string; link?: string };
type PropType = {
  memories: memories[];
  options?: EmblaOptionsType;
};

const RelevantMemories: React.FC<PropType> = (props) => {
  const { memories, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-xl font-medium text-[#B3BCC5]">
        <h2 className="flex items-center">Related Memories</h2>
        <DownArrow />
      </div>
      <div className="relative m-auto flex justify-center">
        <div className="relative flex justify-center">
          <div className="overflow-hidden min-w-[57vw] max-w-[57vw]" ref={emblaRef}>
            <div
              className="flex gap-3"
              style={{
                backfaceVisibility: "hidden",
                touchAction: "pan-y pinch-zoom",
              }}
            >
              {memories.map((v, i) => (
                <div className="relative flex sm:min-w-[40%] min-w-[100%] max-w-[100%] sm:max-w-[40%]  select-none flex-col gap-2 rounded-xl bg-[#1F2428] px-4 py-4 group/memory hover:bg-[#35302B] transition">
                  <div>
                    <p className="text-base text-[#B3BCC5] group-hover/memory:text-[#FC9848] transition">{v.type}</p>
                  </div>
                  <div className="h-12">
                    <h2 className="text-lg group-hover/memory:text-[#FFD1AC] transition">{v.title}</h2>
                  </div>
                  <LinkArrow classname="hidden absolute top-3 right-3 group-hover/memory:block" />
                </div>
              ))}
            </div>
          </div>
          {!nextBtnDisabled && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-36 bg-gradient-to-l from-[#171B1F]"></div>
          )}
          {!prevBtnDisabled && (
            <div className="pointer-events-none absolute left-0 top-0 h-full w-36 bg-gradient-to-r from-[#171B1F]"></div>
          )}
        </div>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default RelevantMemories;
