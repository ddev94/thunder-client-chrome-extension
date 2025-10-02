import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { RequestPanel } from "./panels/request-panel/RequestPanel";
import { ResponsePanel } from "./panels/response-panel/ResponsePanel";
import { RequestProvider } from "./request.provider";

function App() {
  return (
    <RequestProvider>
      <div className="h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border w-full"
        >
          <ResizablePanel defaultSize={20} minSize={10} maxSize={50}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">One</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20} maxSize={80}>
            <RequestPanel />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={40} minSize={20} maxSize={80}>
            <ResponsePanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </RequestProvider>
  );
}

export default App;
