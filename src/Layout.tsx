import { useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { useAppDispatch } from "./hooks/use-store";
import { RequestPanel } from "./panels/request-panel/RequestPanel";
import { ResponsePanel } from "./panels/response-panel/ResponsePanel";
import { SidebarPanel } from "./panels/sidebar-panel/SidebarPanel";
import { setCollections } from "./store/slices/app.slice";
export function Layout() {
  const dispatch = useAppDispatch();
  // useCollectionData();
  useEffect(() => {
    const collectionJson = localStorage.getItem("collections");
    if (collectionJson) {
      dispatch(setCollections(JSON.parse(collectionJson)));
    }
  }, [dispatch]);

  return (
    <div className="h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-full"
      >
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <SidebarPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={40} minSize={20} maxSize={80}>
          <RequestPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={35} minSize={20} maxSize={60}>
          <ResponsePanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
