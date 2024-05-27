"use client";

import { useCallback, useEffect, useState } from "react";
import debounce from "debounce";
import {
  Editor,
  TLUiComponents,
  Tldraw,
  setUserPreferences,
  useEditor,
  AssetRecordType,
  MediaHelpers,
  TLAsset,
  TLAssetId,
  getHashForString,
  uniqueId,
  createTLStore,
  defaultShapeUtils,
  TLStoreWithStatus,
} from "tldraw";
import { createAssetFromUrl } from "~/utils/createAsseturl";

/**
 * Uncomment them to make them appear in the UI
 */
const components: Partial<TLUiComponents> = {
  ContextMenu: null,
  // ActionsMenu: null,
  HelpMenu: null,
  // ZoomMenu: null,
  // MainMenu: null,
  // Minimap: null,
  // StylePanel: null,
  // PageMenu: null,
  // NavigationPanel: null,
  // Toolbar: null,
  KeyboardShortcutsDialog: null,
  // QuickActions: null,
  HelperButtons: null,
  DebugPanel: null,
  DebugMenu: null,
  // SharePanel: null,
  // MenuPanel: null,
  // TopPanel: null,
};

export default function Canvas() {
  const handleMount = useCallback((editor: Editor) => {
    (window as any).app = editor;
    (window as any).editor = editor;
    editor.registerExternalAssetHandler("url", createAssetFromUrl);
  }, []);
  setUserPreferences({ id: "supermemory", isDarkMode: true, color: "#1F2428" });

  const [storeWithStatus, setStoreWithStatus] = useState<TLStoreWithStatus>({
		status: 'loading',
	})
	useEffect(() => {
		async function loadRemoteSnapshot() {
			const res = await fetch("https://learning-cf.pruthvirajthinks.workers.dev/get/page1")
      const snapshot = JSON.parse(await res.json())
			const newStore = createTLStore({
				shapeUtils: defaultShapeUtils,
			})
			newStore.loadSnapshot(snapshot)
			setStoreWithStatus({
				store: newStore,
        status: "not-synced"
			})
		}
		loadRemoteSnapshot()
	}, [])

  return (
    <Tldraw
      className="rounded-2xl"
      onMount={handleMount}
      components={components}
      store={storeWithStatus}
      // persistenceKey="tim"
    >
      <div className="absolute left-1/2 top-0 z-[1000000] flex -translate-x-1/2 gap-2 bg-[#2C3439] text-[#B3BCC5]">
        <SaveStatus />
      </div>
    </Tldraw>
  );
}

function SaveStatus() {
  const [save, setSave] = useState("saved!");
  const editor = useEditor();

  const debouncedSave = useCallback(
    debounce(async () => {
      const snapshot = editor.store.getSnapshot();

      const res = await fetch("https://learning-cf.pruthvirajthinks.workers.dev/post/page1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: snapshot,
        }),
      });

      console.log(await res.json())
      setSave("saved!");
    }, 3000),
    [editor], // Dependency array ensures the function is not recreated on every render
  );

  useEffect(() => {
    const unsubscribe = editor.store.listen(
      () => {
        setSave("saving...");
        debouncedSave();
      },
      { scope: "document", source: "user" },
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [editor, debouncedSave]);

  return <button>{save}</button>;
}
