
// import {getDatabase,ref,set} from "firebase/database"
// import {app} from "../src/config/firebase.js"

// import Search from "./pages/Search.jsx";
// import AllSearch from "./components/AllSearch.jsx";
// import Images from "./components/Images.jsx";
import "./App.css";
import React, { useEffect, useState ,Suspense,lazy} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import { appStore } from "./Store/Store.jsx";
import VoiceSearch from "./components/VoiceSearch";
import Footer from "./components/Footer.jsx";
import FullPageShimmer from "./components/FullPageShimmer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Error from "./components/Error.jsx";

const Search = lazy(() => import('./pages/Search.jsx'));
const AllSearch = lazy(() => import('./components/AllSearch.jsx'));
const Images = lazy(() => import('./components/Images.jsx'));

// const db=getDatabase(app);

function App() {
 
  const [isListening, setislistening] = useState(false);
  // const putData=()=>
  // {
  //   set(ref(db,"user/deepak"),{
  //     id:1,
  //     name:"Deepak",
  //     age:27
  //   })
  // }
  

  // useEffect(()=>
  // {
  //      putData();
  // },[])


  
  return (
    <Provider store={appStore}>
       <AuthProvider>
      <div className="App relative min-h-screen w-full">
        {isListening && <VoiceSearch setislistening={setislistening} isListening={isListening} />}
        <Router>
          <Routes>
            {/* {Home with search bar} */}
            <Route path="/" element={
             
            <Home setislistening={setislistening} />
           
            } />

            {/* {SearcPage in which show results} */}
            <Route path="/search" element={<Suspense fallback={<FullPageShimmer/>}>
          <Search setislistening={setislistening} />
          </Suspense>
        }>
              <Route index element={<AllSearch  />} />
              <Route path="allsearch" element={<AllSearch />} />
              <Route path="images" element={<Images />} />
            </Route>
            <Route path="*" element={<Error/>}/>
          </Routes>
         
        </Router>
        <div className="border-t absolute bottom-0 w-[100%]  ">
        <Footer />
      </div>
      </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
