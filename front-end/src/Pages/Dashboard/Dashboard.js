import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  BarChart,
  LabelList,
  Label,
  Bar,
} from "recharts";

import "./assets/vendors/mdi/css/materialdesignicons.min.css";
// import "./assets/vendors/flag-icon-css/css/flag-icon.min.css" ;
// import "./assets/vendors/css/vendor.bundle.base.css" ;
// import "./assets/vendors/font-awesome/css/font-awesome.min.css" ;
// import "./assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css" ;
import "./assets/css/style.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  let margin = { top: 15, right: 30, left: 20, bottom: 5 };

  return (
    <div className="container-scroller">
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html">
            <img src="assets/images/logo.svg" alt="logo" />
          </a>
          <a
            className="sidebar-brand brand-logo-mini pl-4 pt-3"
            href="index.html"
          >
            <img src="assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="#" className="nav-link">
              <div className="nav-profile-image">
                <img src="assets/images/faces/face1.jpg" alt="profile" />
                <span className="login-status online" />
              </div>
              <div className="nav-profile-text d-flex flex-column pr-3">
                <span className="font-weight-medium mb-2">Henry Klein</span>
                <span className="font-weight-normal">$8,753.00</span>
              </div>
              <span className="badge badge-danger text-white ml-3 rounded">
                3
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <i className="mdi mdi-home menu-icon" />
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="mdi mdi-crosshairs-gps menu-icon" />
              <span className="menu-title">Basic UI Elements</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a className="nav-link" href="pages/ui-features/buttons.html">
                    Buttons
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="pages/ui-features/dropdowns.html"
                  >
                    Dropdowns
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="pages/ui-features/typography.html"
                  >
                    Typography
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/icons/mdi.html">
              <i className="mdi mdi-contacts menu-icon" />
              <span className="menu-title">Icons</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/forms/basic_elements.html">
              <i className="mdi mdi-format-list-bulleted menu-icon" />
              <span className="menu-title">Forms</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/charts/chartjs.html">
              <i className="mdi mdi-chart-bar menu-icon" />
              <span className="menu-title">Charts</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/tables/basic-table.html">
              <i className="mdi mdi-table-large menu-icon" />
              <span className="menu-title">Tables</span>
            </a>
          </li>
          <li className="nav-item">
            <span className="nav-link" href="#">
              <span className="menu-title">Docs</span>
            </span>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://www.bootstrapdash.com/demo/breeze-free/documentation/documentation.html"
            >
              <i className="mdi mdi-file-document-box menu-icon" />
              <span className="menu-title">Documentation</span>
            </a>
          </li>
          <li className="nav-item sidebar-actions">
            <div className="nav-link">
              <div className="mt-4">
                <div className="border-none">
                  <p className="text-black">Notification</p>
                </div>
                <ul className="mt-4 pl-0">
                  <li>Sign Out</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div className="container-fluid page-body-wrapper">
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close mdi mdi-close" />
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div
            className="sidebar-bg-options selected"
            id="sidebar-default-theme"
          >
            <div className="img-ss rounded-circle bg-light border mr-3" />
            Default
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3" /> Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles light" />
            <div className="tiles dark" />
          </div>
        </div>
        <nav
          className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row"
          style={{ background: "orange", color: "black" }}
        >
          <div
            className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between"
            style={{ background: "rgb(32 63 88 / 97%)", color: "black" }}
          >
            <a
              className="navbar-brand brand-logo-mini align-self-center d-lg-none"
              href="index.html"
            >
              <img src="assets/images/logo-mini.svg" alt="logo" />
            </a>
            <button
              className="navbar-toggler navbar-toggler align-self-center mr-2"
              type="button"
              data-toggle="minimize"
            >
              <i className="mdi mdi-menu" />
            </button>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link count-indicator dropdown-toggle"
                  id="notificationDropdown"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="mdi mdi-bell-outline" />
                  <span className="count count-varient1">7</span>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list"
                  aria-labelledby="notificationDropdown"
                >
                  <h6 className="p-3 mb-0">Notifications</h6>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img
                        src="../assets/images/faces/face4.jpg"
                        alt
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content">
                      <p className="mb-0">
                        
                        Dany Miles
                        <span className="text-small text-muted">
                          commented on your photo
                        </span>
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img
                        src="assets/images/faces/face3.jpg"
                        alt
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content">
                      <p className="mb-0">
                        
                        James
                        <span className="text-small text-muted">
                          posted a photo on your wall
                        </span>
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-thumbnail">
                      <img
                        src="assets/images/faces/face2.jpg"
                        alt
                        className="profile-pic"
                      />
                    </div>
                    <div className="preview-item-content">
                      <p className="mb-0">
                        
                        Alex
                        <span className="text-small text-muted">
                          just mentioned you in his post
                        </span>
                      </p>
                    </div>
                  </a>
                  <div className="dropdown-divider" />
                  <p className="p-3 mb-0">View all activities</p>
                </div>
              </li>
              <li className="nav-item dropdown d-none d-sm-flex">
                <a
                  className="nav-link count-indicator dropdown-toggle"
                  id="messageDropdown"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="mdi mdi-email-outline" />
                  <span className="count count-varient2">5</span>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list"
                  aria-labelledby="messageDropdown"
                >
                  <h6 className="p-3 mb-0">Messages</h6>
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow">
                      <span className="badge badge-pill badge-success">
                        Request
                      </span>
                      <p className="text-small text-muted ellipsis mb-0">
                        
                        Suport needed for user123
                      </p>
                    </div>
                    <p className="text-small text-muted align-self-start">
                      
                      4:10 PM
                    </p>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow">
                      <span className="badge badge-pill badge-warning">
                        Invoices
                      </span>
                      <p className="text-small text-muted ellipsis mb-0">
                        
                        Invoice for order is mailed
                      </p>
                    </div>
                    <p className="text-small text-muted align-self-start">
                      
                      4:10 PM
                    </p>
                  </a>
                  <a className="dropdown-item preview-item">
                    <div className="preview-item-content flex-grow">
                      <span className="badge badge-pill badge-danger">
                        Projects
                      </span>
                      <p className="text-small text-muted ellipsis mb-0">
                        
                        New project will start tomorrow
                      </p>
                    </div>
                    <p className="text-small text-muted align-self-start">
                      
                      4:10 PM
                    </p>
                  </a>
                  <h6 className="p-3 mb-0">See all activity</h6>
                </div>
              </li>
              <li className="nav-item nav-search border-0 ml-1 ml-md-3 ml-lg-5 d-none d-md-flex">
                <form className="nav-link form-inline mt-2 mt-md-0">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="mdi mdi-magnify" />
                      </span>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
            <ul
              className="navbar-nav navbar-nav-right ml-lg-auto"
              style={{ color: "yellow" }}
            >
              <li className="nav-item dropdown d-none d-xl-flex border-0">
                <Link to="home">
                  
                  <a
                    className="nav-link dropdown-toggle"
                    id="languageDropdown"
                    href="#"
                    data-toggle="dropdown"
                    style={{ color: "orange" }}
                  >
                    <i
                      className="mdi mdi-earth"
                      style={{ color: "#258fe6f7" }}
                    />
                    <b> LOGIN </b>
                  </a>
                </Link>
                <div
                  className="dropdown-menu navbar-dropdown"
                  aria-labelledby="languageDropdown"
                >
                  <a className="dropdown-item" href="#">
                    
                    French
                  </a>
                  <a className="dropdown-item" href="#">
                    
                    Spain
                  </a>
                  <a className="dropdown-item" href="#">
                    
                    Latin
                  </a>
                  <a className="dropdown-item" href="#">
                    
                    Japanese
                  </a>
                </div>
              </li>
              <li className="nav-item nav-profile dropdown border-0">
                <a
                  className="nav-link dropdown-toggle"
                  id="profileDropdown"
                  href="#"
                  data-toggle="dropdown"
                  style={{ color: "#258fe6f7" }}
                >
                  <img
                    className="nav-profile-img mr-2"
                    alt
                    src="assets/images/faces/face1.jpg"
                  />
                  <span className="profile-name" style={{ color: "#258fe6f7" }}>
                    
                    <b> FHDEV </b>
                  </span>
                </a>
                <div
                  className="dropdown-menu navbar-dropdown w-100"
                  aria-labelledby="profileDropdown"
                >
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-cached mr-2 text-success" /> Activity
                    Log
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="mdi mdi-logout mr-2 text-primary" /> Signout
                  </a>
                </div>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span className="mdi mdi-menu" />
            </button>
          </div>
        </nav>
        <div
          className="main-panel"
          style={{ height: "100vh", overflow: "auto" }}
        >
          <div className="content-wrapper pb-0">
            <div className="page-header flex-wrap">
              <h3 className="mb-0">
                
                Hi, welcome back!
                <span className="pl-0 h6 pl-sm-2 text-muted d-inline-block">
                  Your web analytics dashboard template.
                </span>
              </h3>
              <div className="d-flex">
                <button
                  type="button"
                  className="btn btn-sm bg-white btn-icon-text border"
                >
                  <i className="mdi mdi-email btn-icon-prepend" /> Email
                </button>
                <button
                  type="button"
                  className="btn btn-sm bg-white btn-icon-text border ml-3"
                >
                  <i className="mdi mdi-printer btn-icon-prepend" /> Print
                </button>
                <button type="button" className="btn btn-sm ml-3 btn-success">
                  
                  Add User
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-12 stretch-card grid-margin">
                <div className="row">
                  <div className="col-xl-12 col-md-6 stretch-card grid-margin grid-margin-sm-0 pb-sm-3">
                    <div className="card bg-warning">
                      <div className="card-body px-3 py-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="color-card">
                            <p className="mb-0 color-card-head">Sales</p>
                            <h2 className="text-white">
                              
                              $8,753.<span className="h5">00</span>
                            </h2>
                          </div>
                          <i className="card-icon-indicator mdi mdi-basket bg-inverse-icon-warning" />
                        </div>
                        <h6 className="text-white">18.33% Since last month</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-md-6 stretch-card grid-margin grid-margin-sm-0 pb-sm-3">
                    <div className="card bg-danger">
                      <div className="card-body px-3 py-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="color-card">
                            <p className="mb-0 color-card-head">Margin</p>
                            <h2 className="text-white">
                              
                              $5,300.<span className="h5">00</span>
                            </h2>
                          </div>
                          <i className="card-icon-indicator mdi mdi-cube-outline bg-inverse-icon-danger" />
                        </div>
                        <h6 className="text-white">13.21% Since last month</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-md-6 stretch-card grid-margin grid-margin-sm-0 pb-sm-3 pb-lg-0 pb-xl-3">
                    <div className="card bg-primary">
                      <div className="card-body px-3 py-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="color-card">
                            <p className="mb-0 color-card-head">Orders</p>
                            <h2 className="text-white">
                              
                              $1,753.<span className="h5">00</span>
                            </h2>
                          </div>
                          <i className="card-icon-indicator mdi mdi-briefcase-outline bg-inverse-icon-primary" />
                        </div>
                        <h6 className="text-white">67.98% Since last month</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-md-6 stretch-card pb-sm-3 pb-lg-0">
                    <div className="card bg-success">
                      <div className="card-body px-3 py-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="color-card">
                            <p className="mb-0 color-card-head">Affiliate</p>
                            <h2 className="text-white">2368</h2>
                          </div>
                          <i className="card-icon-indicator mdi mdi-account-circle bg-inverse-icon-success" />
                        </div>
                        <h6 className="text-white">20.32% Since last month</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 stretch-card grid-margin">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-7">
                        <h5>Business Survey</h5>
                        <p className="text-muted"> </p>
                        <br />
                        <br />
                      </div>
                      <div className="col-sm-5 text-md-right">
                        <button
                          type="button"
                          className="btn btn-icon-text mb-3 mb-sm-0 btn-inverse-primary font-weight-normal"
                        >
                          <i className="mdi mdi-email btn-icon-prepend" />
                          Download Report
                        </button>
                      </div>
                      <br />
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="card mb-3 mb-sm-0">
                          <div className="card-body py-3 px-4">
                            <p className="m-0 survey-head">Today Earnings</p>
                            <div className="d-flex justify-content-between align-items-end flot-bar-wrapper">
                              <div>
                                <h3 className="m-0 survey-value">$5,300</h3>
                                <p className="text-success m-0">
                                  -310 avg. sales
                                </p>
                              </div>
                              <div id="earningChart" className="flot-chart" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="card mb-3 mb-sm-0">
                          <div className="card-body py-3 px-4">
                            <p className="m-0 survey-head">Product Sold</p>
                            <div className="d-flex justify-content-between align-items-end flot-bar-wrapper">
                              <div>
                                <h3 className="m-0 survey-value">$9,100</h3>
                                <p className="text-danger m-0">
                                  -310 avg. sales
                                </p>
                              </div>
                              <div id="productChart" className="flot-chart" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="card">
                          <div className="card-body py-3 px-4">
                            <p className="m-0 survey-head">Today Orders</p>
                            <div className="d-flex justify-content-between align-items-end flot-bar-wrapper">
                              <div>
                                <h3 className="m-0 survey-value">$4,354</h3>
                                <p className="text-success m-0">
                                  -310 avg. sales
                                </p>
                              </div>
                              <div id="orderChart" className="flot-chart" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-sm-12">
                        <div className="flot-chart-wrapper">
                          <div id="flotChart" className="flot-chart">
                            <AreaChart
                              width={1200}
                              height={300}
                              data={data}
                              margin={margin}
                            >
                              <defs>
                                <linearGradient
                                  id="colorUv"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#8884d8"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#8884d8"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                                <linearGradient
                                  id="colorPv"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#82ca9d"
                                    stopOpacity={0.8}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#82ca9d"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="name" />
                              <YAxis />
                              <CartesianGrid
                                strokeDasharray="4"
                                horizontalPoints={[1]}
                                strokeDashArray="4 1"
                              />
                              <Tooltip />
                              <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                                label
                              />
                              <Area
                                type="monotone"
                                dataKey="pv"
                                stroke="#82ca9d"
                                fillOpacity={1}
                                fill="url(#colorPv)"
                              />
                              <LabelList dataKey="name" position="top" />
                            </AreaChart>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8">
                        <p className="text-muted mb-0">
                          
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore. <b>Learn More</b>
                        </p>
                      </div>
                      <div className="col-sm-4">
                        <p className="mb-0 text-muted">Sales Revenue</p>
                        <h5 className="d-inline-block survey-value mb-0">
                          
                          $2,45,500
                        </h5>
                        <p className="d-inline-block text-danger mb-0">
                          
                          last 8 months
                        </p>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body px-0 overflow-auto">
                    <h4 className="card-title pl-4">Purchase History</h4>
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="bg-light">
                          <tr>
                            <th>Customer</th>
                            <th>Project</th>
                            <th>Invoice</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/faces/face1.jpg"
                                  alt="image"
                                />
                                <div className="table-user-name ml-3">
                                  <p className="mb-0 font-weight-medium">
                                    
                                    Cecelia Cooper
                                  </p>
                                  <small> Payment on hold</small>
                                </div>
                              </div>
                            </td>
                            <td>Angular Admin</td>
                            <td>
                              <div className="badge badge-inverse-success">
                                
                                Completed
                              </div>
                            </td>
                            <td>$ 77.99</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/faces/face10.jpg"
                                  alt="image"
                                />
                                <div className="table-user-name ml-3">
                                  <p className="mb-0 font-weight-medium">
                                    
                                    Victor Watkins
                                  </p>
                                  <small>Email verified</small>
                                </div>
                              </div>
                            </td>
                            <td>Angular Admin</td>
                            <td>
                              <div className="badge badge-inverse-success">
                                
                                Completed
                              </div>
                            </td>
                            <td>$245.30</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/faces/face11.jpg"
                                  alt="image"
                                />
                                <div className="table-user-name ml-3">
                                  <p className="mb-0 font-weight-medium">
                                    
                                    Ada Burgess
                                  </p>
                                  <small>Email verified</small>
                                </div>
                              </div>
                            </td>
                            <td>One page html</td>
                            <td>
                              <div className="badge badge-inverse-danger">
                                
                                Completed
                              </div>
                            </td>
                            <td>$ 160.25</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/faces/face13.jpg"
                                  alt="image"
                                />
                                <div className="table-user-name ml-3">
                                  <p className="mb-0 font-weight-medium">
                                    
                                    Dollie Lynch
                                  </p>
                                  <small>Email verified</small>
                                </div>
                              </div>
                            </td>
                            <td>Wordpress</td>
                            <td>
                              <div className="badge badge-inverse-success">
                                
                                Declined
                              </div>
                            </td>
                            <td>$ 123.21</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex align-items-center">
                                <img
                                  src="assets/images/faces/face16.jpg"
                                  alt="image"
                                />
                                <div className="table-user-name ml-3">
                                  <p className="mb-0 font-weight-medium">
                                    
                                    Harry Holloway
                                  </p>
                                  <small>Payment on process</small>
                                </div>
                              </div>
                            </td>
                            <td>VueJs Application</td>
                            <td>
                              <div className="badge badge-inverse-danger">
                                
                                Declined
                              </div>
                            </td>
                            <td>$ 150.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <a className="text-black mt-3 d-block pl-4" href="#">
                      <span className="font-weight-medium h6">
                        View all order history
                      </span>
                      <i className="mdi mdi-chevron-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title font-weight-medium">
                      
                      Business Survey
                    </div>
                    <p className="text-muted">
                      
                      Lorem ipsum dolor sitadipiscing elit, sed amet do eiusmod
                      tempor we find a new solution
                    </p>
                    <BarChart
                      width={600}
                      height={300}
                      data={data}
                      margin={margin}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name">
                        <Label
                          value="Pages of my website"
                          offset={0}
                          position="insideBottom"
                        />
                      </XAxis>
                      <YAxis
                        label={{
                          value: "pv of page",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Bar
                        dataKey="pv"
                        fill="#8884d8"
                        onClick={() => alert("okeee")}
                      >
                        <LabelList dataKey="name" position="top" />
                      </Bar>
                    </BarChart>

                    <div className="d-flex flex-wrap border-bottom py-2 border-top justify-content-between">
                      <img
                        className="survey-img mb-lg-3"
                        src="assets/images/dashboard/img_3.jpg"
                        alt
                      />
                      <div className="pt-2">
                        <h5 className="mb-0">Villa called Archagel</h5>
                        <p className="mb-0 text-muted">St, San Diego, CA</p>
                        <h5 className="mb-0">$600/mo</h5>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap border-bottom py-2 justify-content-between">
                      <img
                        className="survey-img mb-lg-3"
                        src="assets/images/dashboard/img_1.jpg"
                        alt
                      />
                      <div className="pt-2">
                        <h5 className="mb-0">Luxury villa in Hermo</h5>
                        <p className="mb-0 text-muted">Glendale, CA</p>
                        <h5 className="mb-0">$900/mo</h5>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap border-bottom py-2 justify-content-between">
                      <img
                        className="survey-img mb-lg-3"
                        src="assets/images/dashboard/img_2.jpg"
                        alt
                      />
                      <div className="pt-2">
                        <h5 className="mb-0">House on the Clarita</h5>
                        <p className="mb-0 text-muted">Business Survey</p>
                        <h5 className="mb-0">$459/mo</h5>
                      </div>
                    </div>
                    <a
                      className="text-black mt-3 d-block font-weight-medium h6"
                      href="#"
                    >
                      View all <i className="mdi mdi-chevron-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-black">To do Task List</h4>
                    <p className="text-muted">Created by anonymous</p>
                    <div className="list-wrapper">
                      <ul className="d-flex flex-column-reverse todo-list todo-list-custom">
                        <li>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input className="checkbox" type="checkbox" />
                              Meeting with Alisa
                            </label>
                            <span className="list-time">4 Hours Ago</span>
                          </div>
                        </li>
                        <li>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input className="checkbox" type="checkbox" />
                              Create invoice
                            </label>
                            <span className="list-time">6 Hours Ago</span>
                          </div>
                        </li>
                        <li className="completed">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                className="checkbox"
                                type="checkbox"
                                defaultChecked
                              />
                              Prepare for presentation
                            </label>
                            <span className="list-time">2 Hours Ago</span>
                          </div>
                        </li>
                        <li>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input className="checkbox" type="checkbox" />
                              Pick up kids from school
                            </label>
                            <span className="list-time">8 Hours Ago</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="add-items d-flex flex-wrap flex-sm-nowrap">
                      <input
                        type="text"
                        className="form-control todo-list-input flex-grow"
                        placeholder="Add task name"
                      />
                      <button
                        className="add btn btn-primary font-weight-regular text-nowrap"
                        id="add-task"
                      >
                        
                        Add Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-black">Recent Customers</h4>
                    <p className="text-muted">All contacts</p>
                    <div className="row pt-2 pb-1">
                      <div className="col-12 col-sm-7">
                        <div className="row">
                          <div className="col-4 col-md-4">
                            <img
                              className="customer-img"
                              src="assets/images/faces/face22.jpg"
                              alt
                            />
                          </div>
                          <div className="col-8 col-md-8 p-sm-0">
                            <h6 className="mb-0">Cecelia Cooper</h6>
                            <p className="text-muted font-12">05:58AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5 pl-0">
                        <canvas id="areaChart1" />
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-4 col-sm-4">
                            <img
                              className="customer-img"
                              src="assets/images/faces/face25.jpg"
                              alt
                            />
                          </div>
                          <div className="col-8 col-sm-8 p-sm-0">
                            <h6 className="mb-0">Victor Watkins</h6>
                            <p className="text-muted font-12">05:28AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5 pl-0">
                        <canvas id="areaChart2" />
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-4 col-sm-4">
                            <img
                              className="customer-img"
                              src="assets/images/faces/face15.jpg"
                              alt
                            />
                          </div>
                          <div className="col-8 col-sm-8 p-sm-0">
                            <h6 className="mb-0">Ada Burgess</h6>
                            <p className="text-muted font-12">05:57AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5 pl-0">
                        <canvas id="areaChart3" />
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-4 col-sm-4">
                            <img
                              className="customer-img"
                              src="assets/images/faces/face5.jpg"
                              alt
                            />
                          </div>
                          <div className="col-8 col-sm-8 p-sm-0">
                            <h6 className="mb-0">Dollie Lynch</h6>
                            <p className="text-muted font-12">05:59AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5 pl-0">
                        <canvas id="areaChart4" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-7">
                        <div className="row">
                          <div className="col-4 col-sm-4">
                            <img
                              className="customer-img"
                              src="assets/images/faces/face2.jpg"
                              alt
                            />
                          </div>
                          <div className="col-8 col-sm-8 p-sm-0">
                            <h6 className="mb-0">Harry Holloway</h6>
                            <p className="text-muted font-12 mb-0">05:13AM</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-5 pl-0">
                        <canvas id="areaChart5" height={100} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title text-black">Business Survey</h4>
                    <p className="text-muted pb-2">Jan 01 2019 - Dec 31 2019</p>
                    <canvas id="surveyBar" />
                    <div className="row border-bottom pb-3 pt-4 align-items-center mx-0">
                      <div className="col-sm-9 pl-0">
                        <div className="d-flex">
                          <img src="assets/images/dashboard/img_4.jpg" alt />
                          <div className="pl-2">
                            <h6 className="m-0">Red Chair</h6>
                            <p className="m-0">Home Decoration</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 pl-0 pl-sm-3">
                        <div className="badge badge-inverse-success mt-3 mt-sm-0">
                          
                          +7.7%
                        </div>
                      </div>
                    </div>
                    <div className="row py-3 align-items-center mx-0">
                      <div className="col-sm-9 pl-0">
                        <div className="d-flex">
                          <img src="assets/images/dashboard/img_5.jpg" alt />
                          <div className="pl-2">
                            <h6 className="m-0">Gray Sofa</h6>
                            <p className="m-0">Home Decoration</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3 pl-0 pl-sm-3">
                        <div className="badge badge-inverse-success mt-3 mt-sm-0">
                          
                          +7.7%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 grid-margin stretch-card">
                <div className="card card-calender">
                  <div className="card-body">
                    <div className="row pt-4">
                      <div className="col-sm-6">
                        <h1 className="text-white">10:16PM</h1>
                        <h5 className="text-white">Monday 25 October, 2016</h5>
                        <h5 className="text-white pt-2 m-0">
                          Precipitation:50%
                        </h5>
                        <h5 className="text-white m-0">Humidity:23%</h5>
                        <h5 className="text-white m-0">Wind:13 km/h</h5>
                      </div>
                      <div className="col-sm-6 text-sm-right pt-3 pt-sm-0">
                        <h3 className="text-white">Clear Sky</h3>
                        <p className="text-white m-0">London, UK</p>
                        <h3 className="text-white m-0">21°C</h3>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-sm-12">
                        <ul className="d-flex pl-0 overflow-auto">
                          <li className="weakly-weather-item text-white font-weight-medium text-center active">
                            <p className="mb-0">TODAY</p>
                            <i className="mdi mdi-weather-cloudy" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">MON</p>
                            <i className="mdi mdi-weather-hail" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">TUE</p>
                            <i className="mdi mdi-weather-cloudy" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">WED</p>
                            <i className="mdi mdi-weather-fog" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">THU</p>
                            <i className="mdi mdi-weather-hail" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">FRI</p>
                            <i className="mdi mdi-weather-cloudy" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">SAT</p>
                            <i className="mdi mdi-weather-hail" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                          <li className="weakly-weather-item text-white font-weight-medium text-center">
                            <p className="mb-0">SUN</p>
                            <i className="mdi mdi-weather-cloudy" />
                            <p className="mb-0">
                              21<span className="symbol">°c</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">
                      <span className="d-flex justify-content-between">
                        <span>Activity</span>
                        <span className="dropdown dropleft d-block">
                          <span
                            id="dropdownMenuButton1"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <span>
                              <i className="mdi mdi-dots-horizontal" />
                            </span>
                          </span>
                          <span
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <a className="dropdown-item" href="#">
                              Contact
                            </a>
                            <a className="dropdown-item" href="#">
                              Helpdesk
                            </a>
                            <a className="dropdown-item" href="#">
                              Chat with us
                            </a>
                          </span>
                        </span>
                      </span>
                    </h4>
                    <ul className="gradient-bullet-list border-bottom">
                      <li>
                        <h6 className="mb-0">
                          
                          It's awesome when we find a new solution
                        </h6>
                        <p className="text-muted">2h ago</p>
                      </li>
                      <li>
                        <h6 className="mb-0">Report has been updated</h6>
                        <p className="text-muted">
                          <span>2h ago</span>
                          <span className="d-inline-block">
                            <span className="d-flex d-inline-block">
                              <img
                                className="ml-1"
                                src="assets/images/faces/face1.jpg"
                                alt
                              />
                              <img
                                className="ml-1"
                                src="assets/images/faces/face10.jpg"
                                alt
                              />
                              <img
                                className="ml-1"
                                src="assets/images/faces/face14.jpg"
                                alt
                              />
                            </span>
                          </span>
                        </p>
                      </li>
                      <li>
                        <h6 className="mb-0">
                          
                          Analytics dashboard has been created#Slack
                        </h6>
                        <p className="text-muted">2h ago</p>
                      </li>
                      <li>
                        <h6 className="mb-0">
                          
                          It's awesome when we find a new solution
                        </h6>
                        <p className="text-muted">2h ago</p>
                      </li>
                    </ul>
                    <a className="text-black mt-3 mb-0 d-block h6" href="#">
                      View all <i className="mdi mdi-chevron-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-md-6 grid-margin stretch-card">
                <div className="card card-invoice">
                  <div className="card-body">
                    <h4 className="card-title pb-3">Pending invoices</h4>
                    <div className="list-card">
                      <div className="row align-items-center">
                        <div className="col-7 col-sm-8">
                          <div className="row align-items-center">
                            <div className="col-sm-4">
                              <img src="assets/images/faces/face2.jpg" alt />
                            </div>
                            <div className="col-sm-8 pr-0 pl-sm-0">
                              <span>06 Jan 2019</span>
                              <h6 className="mb-1 mb-sm-0">Isabel Cross</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-5 col-sm-4">
                          <div className="d-flex pt-1 align-items-center">
                            <div className="reload-outer bg-info">
                              <i className="mdi mdi-reload" />
                            </div>
                            <div className="dropdown dropleft pl-1 pt-3">
                              <div
                                id="dropdownMenuButton2"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <p>
                                  <i className="mdi mdi-dots-vertical" />
                                </p>
                              </div>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton2"
                              >
                                <a className="dropdown-item" href="#">
                                  Sales
                                </a>
                                <a className="dropdown-item" href="#">
                                  Track Invoice
                                </a>
                                <a className="dropdown-item" href="#">
                                  Payment History
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-card">
                      <div className="row align-items-center">
                        <div className="col-7 col-sm-8">
                          <div className="row align-items-center">
                            <div className="col-sm-4">
                              <img src="assets/images/faces/face3.jpg" alt />
                            </div>
                            <div className="col-sm-8 pr-0 pl-sm-0">
                              <span>18 Mar 2019</span>
                              <h6 className="mb-1 mb-sm-0">Carrie Parker</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-5 col-sm-4">
                          <div className="d-flex pt-1 align-items-center">
                            <div className="reload-outer bg-primary">
                              <i className="mdi mdi-reload" />
                            </div>
                            <div className="dropdown dropleft pl-1 pt-3">
                              <div
                                id="dropdownMenuButton3"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <p>
                                  <i className="mdi mdi-dots-vertical" />
                                </p>
                              </div>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton3"
                              >
                                <a className="dropdown-item" href="#">
                                  Sales
                                </a>
                                <a className="dropdown-item" href="#">
                                  Track Invoice
                                </a>
                                <a className="dropdown-item" href="#">
                                  Payment History
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-card">
                      <div className="row align-items-center">
                        <div className="col-7 col-sm-8">
                          <div className="row align-items-center">
                            <div className="col-sm-4">
                              <img src="assets/images/faces/face11.jpg" alt />
                            </div>
                            <div className="col-sm-8 pr-0 pl-sm-0">
                              <span>10 Apr 2019</span>
                              <h6 className="mb-1 mb-sm-0">Don Bennett</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-5 col-sm-4">
                          <div className="d-flex pt-1 align-items-center">
                            <div className="reload-outer bg-warning">
                              <i className="mdi mdi-reload" />
                            </div>
                            <div className="dropdown dropleft pl-1 pt-3">
                              <div
                                id="dropdownMenuButton4"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <p>
                                  <i className="mdi mdi-dots-vertical" />
                                </p>
                              </div>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton4"
                              >
                                <a className="dropdown-item" href="#">
                                  Sales
                                </a>
                                <a className="dropdown-item" href="#">
                                  Track Invoice
                                </a>
                                <a className="dropdown-item" href="#">
                                  Payment History
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-card">
                      <div className="row align-items-center">
                        <div className="col-7 col-sm-8">
                          <div className="row align-items-center">
                            <div className="col-sm-4">
                              <img src="assets/images/faces/face3.jpg" alt />
                            </div>
                            <div className="col-sm-8 pr-0 pl-sm-0">
                              <span>18 Mar 2019</span>
                              <h6 className="mb-1 mb-sm-0">Carrie Parker</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-5 col-sm-4">
                          <div className="d-flex pt-1 align-items-center">
                            <div className="reload-outer bg-info">
                              <i className="mdi mdi-reload" />
                            </div>
                            <div className="dropdown dropleft pl-1 pt-3">
                              <div
                                id="dropdownMenuButton5"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <p>
                                  <i className="mdi mdi-dots-vertical" />
                                </p>
                              </div>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton5"
                              >
                                <a className="dropdown-item" href="#">
                                  Sales
                                </a>
                                <a className="dropdown-item" href="#">
                                  Track Invoice
                                </a>
                                <a className="dropdown-item" href="#">
                                  Payment History
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div
                      id="inline-datepicker"
                      className="datepicker table-responsive"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 stretch-card grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Browser stats</h4>
                    <div className="row py-2">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between pb-3 border-bottom">
                          <div>
                            <img
                              className="mr-2"
                              src="assets/images/browser-logo/opera-logo.png"
                              alt
                            />
                            <span className="p">opera mini</span>
                          </div>
                          <p className="mb-0">23%</p>
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between pb-3 border-bottom">
                          <div>
                            <img
                              className="mr-2"
                              src="assets/images/browser-logo/safari-logo.png"
                              alt
                            />
                            <span className="p">Safari</span>
                          </div>
                          <p className="mb-0">07%</p>
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between pb-3 border-bottom">
                          <div>
                            <img
                              className="mr-2"
                              src="assets/images/browser-logo/chrome-logo.png"
                              alt
                            />
                            <span className="p">Chrome</span>
                          </div>
                          <p className="mb-0">33%</p>
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between pb-3 border-bottom">
                          <div>
                            <img
                              className="mr-2"
                              src="assets/images/browser-logo/firefox-logo.png"
                              alt
                            />
                            <span className="p">Firefox</span>
                          </div>
                          <p className="mb-0">17%</p>
                        </div>
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className="col-sm-12">
                        <div className="d-flex justify-content-between">
                          <div>
                            <img
                              className="mr-2"
                              src="assets/images/browser-logo/explorer-logo.png"
                              alt
                            />
                            <span className="p">Explorer</span>
                          </div>
                          <p className="mb-0">05%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
                Copyright © bootstrapdash.com 2020
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                
                Free
                <a href="https://www.bootstrapdash.com/" target="_blank">
                  Bootstrap dashboard template
                </a>
                from Bootstrapdash.com
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
