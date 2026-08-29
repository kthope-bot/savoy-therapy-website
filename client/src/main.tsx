import { hydrateRoot, createRoot } from "react-dom/client";
import "./index.css";
import { AppShell, createQueryClient, createTrpcClient } from "./appShell";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

const app = <AppShell queryClient={createQueryClient()} trpcClient={createTrpcClient()} />;

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
