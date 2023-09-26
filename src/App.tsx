import {NextUIProvider} from "@nextui-org/react";
import {Toaster} from "react-hot-toast";
import {Provider} from "jotai";

import './App.css'
import Router from "@/router";
import SWRProvider from "@components/SWRProvider";
import {globalStore} from "@/store/global.ts";

function App() {
  return (
    <NextUIProvider>
      <div
        id="App"
        data-dark={true}
        className="min-h-screen font-sans antialiased bg-background text-foreground"
      >
        <Provider store={globalStore}>
          <SWRProvider>
            <Router />
            <Toaster containerClassName={'toaster-wrapper'} />
          </SWRProvider>
        </Provider>
      </div>
    </NextUIProvider>
  )
}

export default App
