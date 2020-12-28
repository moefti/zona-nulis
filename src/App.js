import "./App.css";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Blog from "./pages/blog/Blog";
import CreateBlog from "./pages/blog/CreateBlog";
import { createContext, useEffect, useReducer } from "react";
import Modal from "./components/Modal/Modal";

export const rootContext = createContext();
const Provider = rootContext.Provider;

const initialState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      isAuth: true,
      token: token,
      user: JSON.parse(localStorage.getItem("user")),
    };
  } else {
    return {
      isAuth: false,
      user: null,
      token: null,
    };
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuth: true,
        user: action.payload.data.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      <Modal />;
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const Page = (props) => {
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  return props.children;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState());

  return (
    <Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={(props) => (
              <Page title="Zona Nulis | Home">
                <Home {...props} />
              </Page>
            )}
          />
          <Route
            path="/daftar"
            render={(props) => (
              <Page title="Buat akun baru kamu">
                <Signup {...props} />
              </Page>
            )}
          />
          <Route
            path="/masuk"
            render={(props) => (
              <Page title="Masuk dengan akun kamu">
                <Login {...props} />
              </Page>
            )}
          />
          <Route
            path="/:username/:slug"
            render={(props) => (
              <Page
                title={document.location.pathname
                  .split("/")[2]
                  .split("-")
                  .join(" ")}
              >
                <Blog {...props} />
              </Page>
            )}
          />
          {/* <Route path="/daftar" component={Signup} />
          <Route path="/masuk" component={Login} />
          <Route path="/posts/:id" component={Blog} /> */}
          <Route
            path="/blog"
            render={(props) =>
              state.isAuth === true ? (
                <Page title="Buat Tulisan Mu disini">
                  <CreateBlog {...props} />
                </Page>
              ) : (
                <Redirect to="/masuk" />
              )
            }
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
