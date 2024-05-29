"use client";

import React, { useEffect, useRef, useState } from "react";
import Canvas from "./canvas/_components/canvas";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ReactTextareaAutosize from "react-textarea-autosize";
import debounce from "debounce";

function page() {
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
    <div className="h-screen w-full px-16 py-10">
      <div>
        <PanelGroup className="w-[calc(100vw-8rem)]" direction="horizontal">
          <Panel defaultSize={30} collapsible={true} minSize={22}>
            <div className="flex h-[calc(100vh-5rem)] w-full flex-col overflow-hidden rounded-2xl bg-[#1F2428]">
              <div className="flex items-center justify-between bg-[#2C3439] px-4 py-2 text-lg font-medium text-[#989EA4]">
                Change Filters
                <SettingsSvg />
              </div>
              <div className="px-3 py-5">
                <ReactTextareaAutosize
                  spellCheck="false"
                  placeholder="search..."
                  onChange={(e) => {
                    setValueFn(e.target.value);
                  }}
                  value={value}
                  ref={textAreaRef}
                  rows={1}
                  className="w-full resize-none px-3 py-4 rounded-xl bg-[#171B1F] text-xl text-[#989EA4] outline-none focus:outline-none sm:max-h-52"
                />
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="relative flex items-center justify-center px-1">
            {/* <div className="absolute z-[1000000]  top-1/2 -translate-y-1/2"> */}
            <div className="rounded-lg bg-[#2F363B] px-2 py-2">
              <DragSvg />
            </div>
            {/* </div> */}
          </PanelResizeHandle>
          <Panel className="relative" defaultSize={70} minSize={60}>
            <div className="absolute inset-0 h-[calc(100vh-5rem)] w-full">
              <Canvas />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

function SettingsSvg() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.2321 0.875C6.46793 0.875 5.81627 1.4275 5.69043 2.18083L5.5421 3.07417C5.52543 3.17417 5.44627 3.29083 5.2946 3.36417C5.00906 3.50143 4.73438 3.66022 4.47293 3.83917C4.3346 3.935 4.1946 3.94417 4.09793 3.90833L3.25043 3.59C2.90397 3.4602 2.52268 3.45755 2.17445 3.58253C1.82621 3.70751 1.53362 3.95201 1.34877 4.2725L0.580434 5.60333C0.395508 5.92363 0.330196 6.29915 0.396115 6.66307C0.462034 7.027 0.65491 7.35575 0.940434 7.59083L1.64043 8.1675C1.7196 8.2325 1.7821 8.35833 1.76877 8.52583C1.74502 8.84178 1.74502 9.15906 1.76877 9.475C1.78127 9.64167 1.7196 9.76833 1.64127 9.83333L0.940434 10.41C0.65491 10.6451 0.462034 10.9738 0.396115 11.3378C0.330196 11.7017 0.395508 12.0772 0.580434 12.3975L1.34877 13.7283C1.53376 14.0487 1.8264 14.293 2.17462 14.4178C2.52285 14.5426 2.90406 14.5399 3.25043 14.41L4.0996 14.0917C4.19543 14.0558 4.33543 14.0658 4.4746 14.16C4.7346 14.3383 5.00877 14.4975 5.29543 14.635C5.4471 14.7083 5.52627 14.825 5.54293 14.9267L5.69127 15.8192C5.8171 16.5725 6.46877 17.125 7.23293 17.125H8.7696C9.53293 17.125 10.1854 16.5725 10.3113 15.8192L10.4596 14.9258C10.4763 14.8258 10.5546 14.7092 10.7071 14.635C10.9938 14.4975 11.2679 14.3383 11.5279 14.16C11.6671 14.065 11.8071 14.0558 11.9029 14.0917L12.7529 14.41C13.0992 14.5394 13.4801 14.5418 13.828 14.4168C14.1758 14.2919 14.4681 14.0476 14.6529 13.7275L15.4221 12.3967C15.607 12.0764 15.6723 11.7009 15.6064 11.3369C15.5405 10.973 15.3476 10.6443 15.0621 10.4092L14.3621 9.8325C14.2829 9.7675 14.2204 9.64167 14.2338 9.47417C14.2575 9.15822 14.2575 8.84095 14.2338 8.525C14.2204 8.35833 14.2829 8.23167 14.3613 8.16667L15.0613 7.59C15.6513 7.105 15.8038 6.265 15.4221 5.6025L14.6538 4.27167C14.4688 3.95132 14.1761 3.707 13.8279 3.58218C13.4797 3.45735 13.0985 3.46013 12.7521 3.59L11.9021 3.90833C11.8071 3.94417 11.6671 3.93417 11.5279 3.83917C11.2668 3.66025 10.9924 3.50145 10.7071 3.36417C10.5546 3.29167 10.4763 3.175 10.4596 3.07417L10.3104 2.18083C10.2497 1.81589 10.0614 1.48435 9.77905 1.24522C9.49674 1.0061 9.13874 0.874907 8.76877 0.875H7.23293H7.2321ZM8.00043 12.125C8.82923 12.125 9.62409 11.7958 10.2101 11.2097C10.7962 10.6237 11.1254 9.8288 11.1254 9C11.1254 8.1712 10.7962 7.37634 10.2101 6.79029C9.62409 6.20424 8.82923 5.875 8.00043 5.875C7.17163 5.875 6.37678 6.20424 5.79072 6.79029C5.20467 7.37634 4.87543 8.1712 4.87543 9C4.87543 9.8288 5.20467 10.6237 5.79072 11.2097C6.37678 11.7958 7.17163 12.125 8.00043 12.125Z"
        fill="#989EA4"
      />
    </svg>
  );
}

function DragSvg() {
  return (
    <svg
      width="6"
      height="9"
      viewBox="0 0 6 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.78829 0.916134C4.78348 0.920945 4.77696 0.923648 4.77015 0.923648C4.76335 0.923648 4.75682 0.920945 4.75201 0.916134C4.7472 0.911322 4.74449 0.904797 4.74449 0.897991C4.74449 0.891186 4.7472 0.884661 4.75201 0.879849C4.75682 0.875038 4.76335 0.872335 4.77015 0.872335C4.77696 0.872335 4.78348 0.875038 4.78829 0.879849C4.79311 0.884661 4.79581 0.891186 4.79581 0.897991C4.79581 0.904797 4.79311 0.911322 4.78829 0.916134ZM4.77015 0C4.53199 0 4.30358 0.0946096 4.13518 0.263016C3.96677 0.431421 3.87216 0.659829 3.87216 0.897991C3.87216 1.13615 3.96677 1.36456 4.13518 1.53297C4.30358 1.70137 4.53199 1.79598 4.77015 1.79598C5.00831 1.79598 5.23672 1.70137 5.40513 1.53297C5.57353 1.36456 5.66814 1.13615 5.66814 0.897991C5.66814 0.659829 5.57353 0.431421 5.40513 0.263016C5.23672 0.0946096 5.00831 0 4.77015 0ZM4.78829 4.40547C4.78348 4.41028 4.77696 4.41299 4.77015 4.41299C4.76335 4.41299 4.75682 4.41028 4.75201 4.40547C4.7472 4.40066 4.74449 4.39414 4.74449 4.38733C4.74449 4.38052 4.7472 4.374 4.75201 4.36919C4.75682 4.36438 4.76335 4.36167 4.77015 4.36167C4.77696 4.36167 4.78348 4.36438 4.78829 4.36919C4.79311 4.374 4.79581 4.38052 4.79581 4.38733C4.79581 4.39414 4.79311 4.40066 4.78829 4.40547ZM4.77015 3.48934C4.53199 3.48934 4.30358 3.58395 4.13518 3.75235C3.96677 3.92076 3.87216 4.14917 3.87216 4.38733C3.87216 4.62549 3.96677 4.8539 4.13518 5.02231C4.30358 5.19071 4.53199 5.28532 4.77015 5.28532C5.00831 5.28532 5.23672 5.19071 5.40513 5.02231C5.57353 4.8539 5.66814 4.62549 5.66814 4.38733C5.66814 4.14917 5.57353 3.92076 5.40513 3.75235C5.23672 3.58395 5.00831 3.48934 4.77015 3.48934ZM4.78829 7.89481C4.78348 7.89962 4.77696 7.90232 4.77015 7.90232C4.76335 7.90232 4.75682 7.89962 4.75201 7.89481C4.7472 7.89 4.74449 7.88347 4.74449 7.87667C4.74449 7.86986 4.7472 7.86334 4.75201 7.85853C4.75682 7.85371 4.76335 7.85101 4.77015 7.85101C4.77696 7.85101 4.78348 7.85371 4.78829 7.85853C4.79311 7.86334 4.79581 7.86986 4.79581 7.87667C4.79581 7.88347 4.79311 7.89 4.78829 7.89481ZM4.77015 6.97868C4.53199 6.97868 4.30358 7.07329 4.13518 7.24169C3.96677 7.4101 3.87216 7.63851 3.87216 7.87667C3.87216 8.11483 3.96677 8.34324 4.13518 8.51164C4.30358 8.68005 4.53199 8.77466 4.77015 8.77466C5.00831 8.77466 5.23672 8.68005 5.40513 8.51164C5.57353 8.34324 5.66814 8.11483 5.66814 7.87667C5.66814 7.63851 5.57353 7.4101 5.40513 7.24169C5.23672 7.07329 5.00831 6.97868 4.77015 6.97868ZM0.916134 0.91702C0.911322 0.921832 0.904796 0.924535 0.897991 0.924535C0.891187 0.924535 0.884661 0.921832 0.879849 0.91702C0.875038 0.912209 0.872335 0.905683 0.872335 0.898878C0.872335 0.892073 0.875038 0.885547 0.879849 0.880736C0.884661 0.875924 0.891187 0.873221 0.897991 0.873221C0.904796 0.873221 0.911322 0.875924 0.916134 0.880736C0.920945 0.885547 0.923648 0.892073 0.923648 0.898878C0.923648 0.905683 0.920945 0.912209 0.916134 0.91702ZM0.897991 0.000886679C0.659829 0.000886679 0.431422 0.0954962 0.263016 0.263902C0.0946102 0.432308 0 0.660715 0 0.898878C0 1.13704 0.0946102 1.36545 0.263016 1.53385C0.431422 1.70226 0.659829 1.79687 0.897991 1.79687C1.13615 1.79687 1.36456 1.70226 1.53297 1.53385C1.70137 1.36545 1.79598 1.13704 1.79598 0.898878C1.79598 0.660715 1.70137 0.432308 1.53297 0.263902C1.36456 0.0954962 1.13615 0.000886679 0.897991 0.000886679ZM0.916134 4.40636C0.911323 4.41117 0.904797 4.41387 0.897991 4.41387C0.891186 4.41387 0.88466 4.41117 0.879849 4.40636C0.875038 4.40155 0.872335 4.39502 0.872335 4.38822C0.872335 4.38141 0.875038 4.37489 0.879849 4.37007C0.88466 4.36526 0.891186 4.36256 0.897991 4.36256C0.904797 4.36256 0.911323 4.36526 0.916134 4.37007C0.920945 4.37489 0.923648 4.38141 0.923648 4.38822C0.923648 4.39502 0.920945 4.40155 0.916134 4.40636ZM0.897991 3.49022C0.659828 3.49022 0.431421 3.58484 0.263016 3.75324C0.0946104 3.92165 0 4.15005 0 4.38822C0 4.62638 0.0946104 4.85479 0.263016 5.02319C0.431421 5.1916 0.659828 5.28621 0.897991 5.28621C1.13615 5.28621 1.36456 5.1916 1.53297 5.02319C1.70137 4.85479 1.79598 4.62638 1.79598 4.38822C1.79598 4.15005 1.70137 3.92165 1.53297 3.75324C1.36456 3.58484 1.13615 3.49022 0.897991 3.49022ZM0.916134 7.8957C0.911322 7.90051 0.904795 7.90321 0.897991 7.90321C0.891187 7.90321 0.884661 7.90051 0.879849 7.8957C0.875038 7.89089 0.872335 7.88436 0.872335 7.87755C0.872335 7.87075 0.875038 7.86422 0.879849 7.85941C0.884661 7.8546 0.891187 7.8519 0.897991 7.8519C0.904795 7.8519 0.911322 7.8546 0.916134 7.85941C0.920945 7.86422 0.923648 7.87075 0.923648 7.87755C0.923648 7.88436 0.920945 7.89089 0.916134 7.8957ZM0.897991 6.97956C0.65983 6.97956 0.431422 7.07417 0.263016 7.24258C0.0946099 7.41098 0 7.63939 0 7.87755C0 8.11572 0.0946099 8.34412 0.263016 8.51253C0.431422 8.68094 0.65983 8.77555 0.897991 8.77555C1.13615 8.77555 1.36456 8.68094 1.53297 8.51253C1.70137 8.34412 1.79598 8.11572 1.79598 7.87755C1.79598 7.63939 1.70137 7.41098 1.53297 7.24258C1.36456 7.07417 1.13615 6.97956 0.897991 6.97956Z"
        fill="#989EA4"
      />
    </svg>
  );
}

export default page;
