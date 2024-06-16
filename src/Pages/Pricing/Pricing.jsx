import React, { useState, useEffect } from 'react';
import './Pricing.css';

export default function Pricing() {
  const [filerType, setFilerType] = useState('Quarterly');
  const [userType, setUserType] = useState('Business');

  useEffect(() => {
    document.body.classList.add('pricing-page');
    return () => {
      document.body.classList.remove('pricing-page');
    };
  }, []);

  const toggleFilerType = () => {
    setFilerType(filerType === 'Quarterly' ? 'Monthly' : 'Quarterly');
  };

  return (
    <div className="pricing">
      <div className="header">
        <h1>Pricing</h1>
        <p>Select the perfect plan for your business</p>
      </div>
      <div className="toggle-buttons">
        <button
          className={userType === 'Business' ? 'active' : ''}
          onClick={() => setUserType('Business')}
        >
          Business
        </button>
        <button
          className={userType === 'Accountant' ? 'active' : ''}
          onClick={() => setUserType('Accountant')}
        >
          Accountant
        </button>
      </div>
      {userType === 'Business' && (
        <div className="filter-container">
          <button className="arrow" onClick={toggleFilerType}>{'<'}</button>
          <h2>{filerType} Filer</h2>
          <button className="arrow" onClick={toggleFilerType}>{'>'}</button>
        </div>
      )}
      <div className="cards-container">
        {userType === 'Business' ? (
          filerType === 'Quarterly' ? (
            <>
              <div className="card">
                <h3>Basic</h3>
                <div className="price">
                  $29<span>/month</span>
                </div>
                <p className="alt-price">Or $109 for a La carte filing</p>
                <hr />
                <ul>
                  <li>E-filing directly with NYS.</li>
                </ul>
                <button className="get-started">Get started</button>
              </div>
              <div className="card">
                <h3>Pro</h3>
                <div className="price">
                  $39<span>/month</span>
                </div>
                <p className="alt-price">Or $129 for a La carte filing</p>
                <hr />
                <ul>
                  <li>E-filing directly with NYS.</li>
                  <li>Automate non-taxable transactions.</li>
                </ul>
                <button className="get-started">Get started</button>
              </div>
              <div className="card">
                <h3>Expert</h3>
                <div className="price">
                  $49<span>/month</span>
                </div>
                <p className="alt-price">Or $149 for a La carte filing</p>
                <hr />
                <ul>
                  <li>E-filing directly with NYS.</li>
                  <li>Automate non-taxable transactions.</li>
                  <li>Use Taxsy funds feature to separate sales tax collected.</li>
                </ul>
                <button className="get-started">Get started</button>
              </div>
            </>
          ) : (
            <>
              <div className="card">
                <h3>Basic</h3>
                <div className="price">
                  $49<span>/month</span>
                </div>
                <p className="alt-price">Or $99 for a La carte filing</p>
                <hr />
                <ul>
                  <li>E-filing directly with NYS.</li>
                </ul>
                <button className="get-started">Get started</button>
              </div>
              <div className="card">
                <h3>Pro</h3>
                <div className="price">
                  $59<span>/month</span>
                </div>
                <p className="alt-price">Or $109 for a La carte filing</p>
                <hr />
                <ul>
                  <li>E-filing directly with NYS.</li>
                  <li>Automate non-taxable transactions.</li>
                </ul>
                <button className="get-started">Get started</button>
              </div>
              <div className="card">
                <h3>Expert</h3>
                <div className="price">
                  $69<span>/month</span>
                </div>
                <p className="alt-price">Or $119 for a La carte filing</p>
                <hr />
                <ul>
                  <li>E-filing directly with NYS.</li>
                  <li>Automate non-taxable transactions.</li>
                  <li>Use Taxsy funds feature to separate sales tax collected.</li>
                </ul>
                <button className="get-started">Get started</button>
              </div>
            </>
          )
        ) : (
          <>
            <div className="card">
              <h3>Basic</h3>
              <div className="price">
                $89<span>/month</span>
              </div>
              <hr />
              <ul>
                <li>E-filing directly with NYS.</li>
                <li>Automate non-taxable transactions.</li>
                <li>Use Taxsy funds feature to separate sales tax collected.</li>
                <li>1-25 Clients.</li>
              </ul>
              <button className="get-started">Get started</button>
            </div>
            <div className="card">
              <h3>Pro</h3>
              <div className="price">
                $129<span>/month</span>
              </div>
              <hr />
              <ul>
                <li>E-filing directly with NYS.</li>
                <li>Automate non-taxable transactions.</li>
                <li>Use Taxsy funds feature to separate sales tax collected.</li>
                <li>26-125 Clients.</li>
              </ul>
              <button className="get-started">Get started</button>
            </div>
            <div className="card">
              <h3>Expert</h3>
              <div className="price">
                $179<span>/month</span>
              </div>
              <hr />
              <ul>
                <li>E-filing directly with NYS.</li>
                <li>Automate non-taxable transactions.</li>
                <li>Use Taxsy funds feature to separate sales tax collected.</li>
                <li>126+ Clients.</li>
              </ul>
              <button className="get-started">Get started</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
