import { Children } from "react";
import {
  Links,
  LiveReload,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";

import {}

export const links = () => {
  rel: 'stylesheet',
   href: globalStyleUrl
}

export function meta() {
  return { title: "Pat BLog App" };
}

export const loader = async({request}) => {
  const user = {}
  const data = {
    user
  }
  return data;
}


export default function App() {
  return (
    <Document>
      <Layout>
          <Outlet />
      </Layout>
    </Document>
   
  )
}


function Document({children, title}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
     </html>
  )
}

function Layout({children}){
  const {user} = useLoaderData

  return (
    <>
      <nav className="navbar">
        <Link to='/' className='logo'>
          Remix
        </Link>

        <ul className="nav">
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          { user? (
              <li>
                <form action="/auth/logout" method='POST'>
                  <button type='submit' className="btn">
                    Logout {user.username}
                  </button>
                </form>
              </li>

          ): ( 
           <li>
             <Link to='/auth/login'>Login</Link>
           </li>
          
          )}
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}

export function ErrorBoundary( {error}) {
  return (
    <Document>
      <Layout>
        <h1>Sorry and Error Ocurred</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  )
}