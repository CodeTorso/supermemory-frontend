"use client";

import debounce from "debounce";
import React, { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { EnterSvg } from "./svgFolder";

function BottomSection() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  function setValueFn(e: string) {
    setValue(e);
    if (textAreaRef.current) {
      textAreaRef.current.spellcheck = true;
    }
    debouncedSpellCheckFalse();
  }

  const debouncedSpellCheckFalse = debounce(() => {
    if (textAreaRef.current) {
      textAreaRef.current.spellcheck = false;
    }
  }, 3000);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <div className="fixed z-20 flex justify-center bottom-0 min-w-full bg-[#171B1F]">
      <div className=" pb-2 min-w-[57%] max-w-[57%] text-[#ffffff]">
        <div className="flex items-center rounded-3xl bg-[#1F2428] px-2">
          <ReactTextareaAutosize
            spellCheck="false"
            placeholder="Ask your second brain..."
            onChange={(e) => {
              setValueFn(e.target.value);
            }}
            value={value}
            ref={textAreaRef}
            rows={1}
            className="max-h-[25dvh] flex-grow resize-none rounded-3xl bg-transparent px-8 py-6 text-xl outline-none focus:outline-none sm:max-h-52"
          />
          <div className="rounded-xl bg-[#369DFD1A] px-[1rem] py-[1rem]">
            <EnterSvg />
          </div>
        </div>
      </div>
      <p className="absolute top-1/2 -translate-y-1/2 right-4 text-[#989EA4]">Quick action: ⌘ + K</p>
    </div>
  );
}

export default BottomSection;
