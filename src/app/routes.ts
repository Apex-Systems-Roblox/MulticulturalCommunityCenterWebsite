import { createBrowserRouter } from "react-router";
import { Root }      from "./Root";
import { Home }      from "./pages/Home";
import { Community } from "./pages/Community";
import { Funding }   from "./pages/Funding";
import { Roadmap }   from "./pages/Roadmap";
import { Hiring }    from "./pages/Hiring";
import { NotFound }  from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,          Component: Home      },
      { path: "community",    Component: Community },
      { path: "funding",      Component: Funding   },
      { path: "roadmap",      Component: Roadmap   },
      { path: "hiring",       Component: Hiring    },
      { path: "*",            Component: NotFound  },
    ],
  },
]);
