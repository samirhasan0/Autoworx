import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "./Components/Layout";

createInertiaApp({
  title: (title) => `${title}`,
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
  },
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.tsx", { eager: true });
    let page: any = pages[`./Pages/${name}.tsx`];
    page.default.layout =
      page.default.layout || ((page: any) => <Layout children={page} />);
    return page;
  },
});
