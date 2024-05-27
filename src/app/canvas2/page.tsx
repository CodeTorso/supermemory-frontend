"use client"

import { Excalidraw } from "@excalidraw/excalidraw";

function page() {
  return (
    <div
    className="height-full w-full parent-excalidraw"
    style={{ position: "absolute", inset: 0 }}
  >
    <Excalidraw
      theme="dark"
    
      // className="bg-[red]"
      // onMount={handleMount}
      // shapeUtils={[DangerousHtmlExample]}
      // components={components}
      // persistenceKey="my-persistence-key"
    >
      {/* <SaveButton />
      <LoadButton /> */}
    </Excalidraw>
  </div>
  )
}

export default page