import { Outlet, Link } from "react-router-dom";
// import Chart from './components/Chart';


const Layout = () => {
  return (
    <>
        <div id="wrapper">
      <nav>
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">DWindow Dashboard</div>
                    </a>
                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/settings" className="nav-link">
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />
                </ul>
      </nav>

        {/* End of Sidebar */}

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content" style={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'start'}}>
                        {/* End of Topbar */}

                        {/* Begin Page Content */}
                        <div  className="container-fluid">

                            {/* Page Heading */}

                            {/* Content Row */}
                            <div className="row mt-4">

                                {/* Area Chart */}
                                <Outlet />
                            </div>
                        </div>
                        {/* /.container-fluid */}

                    </div>
                    {/* End of Main Content */}

                    {/* Footer */}
                    {/* <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Dwindow 2021</span>
                            </div>
                        </div>
                    </footer> */}
                    {/* End of Footer */}

                </div>
                {/* End of Content Wrapper */}
                </div>

    </>
  )
};

export default Layout;